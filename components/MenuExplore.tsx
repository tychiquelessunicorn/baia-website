"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal, flushSync } from "react-dom";
import { menuChapters, type ExploreItem } from "@/content/menuExplore";

const SLOT_LIMIT = 4;
const REST = 1500;
const MOVE_MS = 880;

type Row =
  | { kind: "group"; label: string }
  | { kind: "item"; item: ExploreItem };

type Stamped = { key: number; item: ExploreItem };

function shuffle<T>(list: T[]): T[] {
  const next = [...list];
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }
  return next;
}

function keyOf(item: ExploreItem) {
  return `${item.group}::${item.name}`;
}

function rowsFor(items: ExploreItem[]): Row[] {
  const rows: Row[] = [];
  let last = "";
  for (const item of items) {
    if (item.group !== last) {
      rows.push({ kind: "group", label: item.group });
      last = item.group;
    }
    rows.push({ kind: "item", item });
  }
  return rows;
}

function plan(count: number, wide: boolean) {
  if (count <= 1) return { cols: 1, rows: 1 };
  if (!wide) return { cols: 1, rows: Math.min(SLOT_LIMIT, count) };
  if (count < SLOT_LIMIT) return { cols: 2, rows: 1 };
  return { cols: 2, rows: 2 };
}

function Plate({ item }: { item: ExploreItem }) {
  return (
    <>
      <p className="menu-kicker">{item.group}</p>
      <h3>{item.name}</h3>
      {item.description ? <p>{item.description}</p> : null}
    </>
  );
}

export function MenuExplore() {
  const [chapterId, setChapterId] = useState(menuChapters[0].id);
  const [open, setOpen] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [wide, setWide] = useState(true);
  const [columns, setColumns] = useState<Stamped[][]>([]);
  const [rows, setRows] = useState(2);
  const [canScroll, setCanScroll] = useState(false);
  const [shift, setShift] = useState(false);
  const [instant, setInstant] = useState(false);

  const deckRef = useRef<ExploreItem[]>([]);
  const seenRef = useRef<Set<string>>(new Set());
  const columnsRef = useRef<Stamped[][]>([]);
  const movingRef = useRef(false);
  const serialRef = useRef(0);
  const itemsRef = useRef<ExploreItem[]>([]);
  const restRef = useRef<(() => void) | null>(null);
  const commitRef = useRef<() => void>(() => {});
  const openButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const chapter = menuChapters.find((item) => item.id === chapterId) ?? menuChapters[0];
  const items = chapter.items;
  itemsRef.current = items;

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const viewport = window.matchMedia("(min-width: 981px)");
    const applyMotion = () => setReduced(motion.matches);
    const applyViewport = () => setWide(viewport.matches);
    applyMotion();
    applyViewport();
    motion.addEventListener("change", applyMotion);
    viewport.addEventListener("change", applyViewport);
    return () => {
      motion.removeEventListener("change", applyMotion);
      viewport.removeEventListener("change", applyViewport);
    };
  }, []);

  useEffect(() => {
    const { cols, rows: nextRows } = plan(items.length, wide);
    const order = reduced ? [...items] : shuffle(items);
    const seen = new Set<string>();
    let cursor = 0;
    const stamp = (item: ExploreItem): Stamped => {
      serialRef.current += 1;
      seen.add(keyOf(item));
      return { key: serialRef.current, item };
    };
    const pull = () => {
      while (cursor < order.length && seen.has(keyOf(order[cursor]))) cursor += 1;
      if (cursor < order.length) {
        const item = order[cursor];
        cursor += 1;
        return stamp(item);
      }
      const fresh = items.filter((entry) => !seen.has(keyOf(entry)));
      return stamp((fresh.length ? shuffle(fresh) : items)[0]);
    };
    const depth = nextRows + (items.length > cols * nextRows && !reduced ? 1 : 0);
    const nextColumns: Stamped[][] = Array.from({ length: cols }, () => []);
    for (let row = 0; row < depth; row += 1) {
      for (let col = 0; col < cols; col += 1) nextColumns[col].push(pull());
    }
    deckRef.current = order.slice(cursor);
    seenRef.current = seen;
    columnsRef.current = nextColumns;
    movingRef.current = false;
    setColumns(nextColumns);
    setRows(nextRows);
    setCanScroll(depth > nextRows);
    setShift(false);
    setInstant(false);
  }, [chapter.id, items, reduced, wide]);

  useEffect(() => {
    movingRef.current = false;
    if (!canScroll || reduced) return;

    let timer = 0;
    const lift = () => {
      if (movingRef.current) return;
      movingRef.current = true;
      setShift(true);
    };
    const wait = () => {
      timer = window.setTimeout(lift, REST);
    };
    restRef.current = wait;
    wait();
    return () => {
      window.clearTimeout(timer);
      restRef.current = null;
    };
  }, [canScroll, chapter.id, reduced, wide]);

  const commit = () => {
    if (!movingRef.current) return;
    movingRef.current = false;
    const source = itemsRef.current;
    const nextColumns = columnsRef.current.map((col) => col.slice());
    if (!nextColumns.length || nextColumns.some((col) => !col.length)) {
      restRef.current?.();
      return;
    }
    nextColumns.forEach((col) => col.shift());
    const visible = new Set(nextColumns.flat().map((entry) => keyOf(entry.item)));
    const take = () => {
      while (deckRef.current.length && visible.has(keyOf(deckRef.current[0]))) deckRef.current.shift();
      if (!deckRef.current.length) {
        const unseen = source.filter((entry) => !seenRef.current.has(keyOf(entry)) && !visible.has(keyOf(entry)));
        const resting = source.filter((entry) => !visible.has(keyOf(entry)));
        const pool = unseen.length ? unseen : resting.length ? resting : source;
        deckRef.current = shuffle(pool);
        if (!unseen.length) seenRef.current = new Set(visible);
      }
      const next = deckRef.current.shift() ?? source[0];
      seenRef.current.add(keyOf(next));
      visible.add(keyOf(next));
      serialRef.current += 1;
      return { key: serialRef.current, item: next };
    };
    nextColumns.forEach((col) => col.push(take()));
    columnsRef.current = nextColumns;
    flushSync(() => {
      setInstant(true);
      setShift(false);
      setColumns(nextColumns);
    });
    window.requestAnimationFrame(() => setInstant(false));
    restRef.current?.();
  };
  commitRef.current = commit;

  useEffect(() => {
    if (!shift) return;
    const timer = window.setTimeout(() => commitRef.current(), MOVE_MS + 60);
    return () => window.clearTimeout(timer);
  }, [shift]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
      openButtonRef.current?.focus();
    };
  }, [open]);

  const listRows = rowsFor(items);
  const single = columns.length < 2;

  return (
    <section className="menu-explore" id="explore" aria-label="The menu">
      <div className="menu-head">
      <p className="kicker">The menu</p>
      <div className="menu-chapters" role="tablist" aria-label="Menu chapters">
        {menuChapters.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            id={`chapter-${item.id}`}
            aria-selected={item.id === chapter.id}
            aria-controls="explore-panel"
            tabIndex={item.id === chapter.id ? 0 : -1}
            className={item.id === chapter.id ? "is-on" : ""}
            onClick={() => {
              setChapterId(item.id);
              setOpen(false);
            }}
            onKeyDown={(event) => {
              const buttons = [...event.currentTarget.parentElement!.querySelectorAll<HTMLButtonElement>('[role="tab"]')];
              const current = buttons.indexOf(event.currentTarget);
              let next = current;
              if (event.key === "ArrowRight") next = (current + 1) % buttons.length;
              else if (event.key === "ArrowLeft") next = (current - 1 + buttons.length) % buttons.length;
              else if (event.key === "Home") next = 0;
              else if (event.key === "End") next = buttons.length - 1;
              else return;
              event.preventDefault();
              setChapterId(menuChapters[next].id);
              setOpen(false);
              buttons[next]?.focus();
            }}
          >
            <span>{item.label}</span>
          </button>
        ))}
      </div>
      <p className="menu-intro">{chapter.intro}</p>
      </div>
      <div
        className={`menu-reel${single ? " is-single" : ""}${canScroll ? "" : " is-still"}`}
        id="explore-panel"
        role="tabpanel"
        aria-labelledby={`chapter-${chapter.id}`}
        style={{ ["--rows" as string]: rows }}
      >
        {columns.map((column, colIndex) => (
          <div className="menu-col" key={colIndex}>
            <div
              className={`menu-track${shift ? " is-shift" : ""}${instant ? " is-instant" : ""}`}
              onTransitionEnd={(event) => {
                if (event.target !== event.currentTarget || event.propertyName !== "transform") return;
                commit();
              }}
            >
              {column.map((entry, index) => (
                <article key={entry.key} aria-hidden={canScroll && index === column.length - 1 ? true : undefined}>
                  <Plate item={entry.item} />
                </article>
              ))}
            </div>
          </div>
        ))}
      </div>
      <button
        ref={openButtonRef}
        type="button"
        className="btn-line"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen(true)}
      >
        Explore the menu
      </button>
      {open &&
        createPortal(
          <div className="menu-modal" onClick={() => setOpen(false)}>
            <div
              className="menu-modal-card"
              role="dialog"
              aria-modal="true"
              aria-labelledby="menu-modal-title"
              onClick={(event) => event.stopPropagation()}
            >
              <header className="menu-modal-head">
                <div>
                  <p className="kicker">The menu</p>
                  <h2 id="menu-modal-title">{chapter.label}</h2>
                  <p>{chapter.intro}</p>
                </div>
                <button ref={closeButtonRef} type="button" className="menu-modal-close" aria-label="Close" onClick={() => setOpen(false)}>
                  ×
                </button>
              </header>
              <div className="menu-modal-body">
                <div className="menu-list">
                  {listRows.map((row, index) =>
                    row.kind === "group" ? (
                      <p key={`group-${index}`} className="menu-group">
                        {row.label}
                      </p>
                    ) : (
                      <article key={`item-${index}`}>
                        <h3>{row.item.name}</h3>
                        {row.item.description ? <p>{row.item.description}</p> : null}
                      </article>
                    ),
                  )}
                </div>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </section>
  );
}
