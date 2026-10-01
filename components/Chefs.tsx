"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";
import { chefs } from "@/content/site";

const HOLD = 12400;
const PASS = 1500;
const TYPE_START = 520;
const TYPE_LETTER = 88;
const TYPE_SPACE = 160;

export function Chefs() {
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState<number | null>(null);
  const [epoch, setEpoch] = useState(0);
  const [motion, setMotion] = useState(true);
  const [seen, setSeen] = useState(false);
  const indexRef = useRef(0);
  const sectionRef = useRef<HTMLElement>(null);
  const remainingRef = useRef(HOLD);
  const startedRef = useRef(0);
  const timerRef = useRef(0);
  const pausedRef = useRef(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setMotion(!media.matches);
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setSeen(true);
      },
      { threshold: 0.28 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const show = (next: number) => {
    if (next === indexRef.current) return;
    setLeaving(indexRef.current);
    indexRef.current = next;
    setIndex(next);
    setEpoch((n) => n + 1);
  };

  const startChefTimer = (ms: number) => {
    window.clearTimeout(timerRef.current);
    remainingRef.current = ms;
    startedRef.current = performance.now();
    timerRef.current = window.setTimeout(() => {
      show((indexRef.current + 1) % chefs.length);
    }, ms);
  };

  useEffect(() => {
    if (!motion || !seen) return;
    const passTimer = window.setTimeout(() => setLeaving(null), PASS);
    if (pausedRef.current) remainingRef.current = HOLD;
    else startChefTimer(HOLD);
    return () => {
      window.clearTimeout(passTimer);
      window.clearTimeout(timerRef.current);
    };
  }, [epoch, motion, seen]);

  const pauseChefs = (event: PointerEvent<HTMLDivElement>) => {
    if (pausedRef.current) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    pausedRef.current = true;
    event.currentTarget.closest(".chefs")?.classList.add("is-paused");
    if (!timerRef.current) return;
    const elapsed = performance.now() - startedRef.current;
    remainingRef.current = Math.max(0, remainingRef.current - elapsed);
    window.clearTimeout(timerRef.current);
    timerRef.current = 0;
  };

  const resumeChefs = (event: PointerEvent<HTMLDivElement>) => {
    if (!pausedRef.current) return;
    pausedRef.current = false;
    event.currentTarget.closest(".chefs")?.classList.remove("is-paused");
    if (!motion || !seen) return;
    startChefTimer(remainingRef.current);
  };

  return (
    <section className="chefs" id="chefs" aria-label="The chefs" ref={sectionRef}>
      <div className="chefs-head">
        <div>
          <p className="kicker">The kitchen</p>
          <h2>
            The chefs.
            <br />
            One pursuit.
          </h2>
        </div>
        <p>Together, Patrick and Brian keep one standard: excellence, creativity, and a plate finished to the last detail. Three sushi chefs have joined them.</p>
      </div>
      <div className={`chef-show${seen || !motion ? " is-live" : ""}`}>
        <div className="chef-stage">
          {leaving !== null && <ChefPane chef={chefs[leaving]} mode="out" typing={false} />}
          <ChefPane key={epoch} chef={chefs[index]} mode="in" typing={seen && motion} />
        </div>
        <div
          className="chef-dots"
          role="tablist"
          aria-label="Chefs"
          onPointerEnter={pauseChefs}
          onPointerLeave={resumeChefs}
        >
          {chefs.map((chef, chefIndex) => (
            <button
              key={chef.name}
              type="button"
              className={chefIndex === index ? "is-on" : ""}
              aria-label={chef.name}
              onClick={() => show(chefIndex)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ChefPane({
  chef,
  mode,
  typing,
}: {
  chef: (typeof chefs)[number];
  mode: "in" | "out";
  typing: boolean;
}) {
  return (
    <div className={`chef-layer is-${mode}`} aria-hidden={mode === "out" ? true : undefined}>
      <div className="chef-frame">
        <img src={chef.image} alt="" />
      </div>
      <div className="chef-copy">
        <p className="kicker">{chef.role}</p>
        <TypedName name={chef.name} typing={typing} />
        <div className="chef-line" aria-hidden="true">
          <span />
        </div>
        <p>{chef.text}</p>
      </div>
    </div>
  );
}

function TypedName({ name, typing }: { name: string; typing: boolean }) {
  const [count, setCount] = useState(typing ? 0 : name.length);
  const [caret, setCaret] = useState(typing);

  useEffect(() => {
    if (!typing) {
      setCount(name.length);
      setCaret(false);
      return;
    }
    setCount(0);
    setCaret(true);
    let i = 0;
    let timer = 0;
    const typeNext = () => {
      i += 1;
      setCount(i);
      if (i >= name.length) return;
      timer = window.setTimeout(typeNext, name[i - 1] === " " ? TYPE_SPACE : TYPE_LETTER);
    };
    const start = window.setTimeout(typeNext, TYPE_START);
    return () => {
      window.clearTimeout(start);
      window.clearTimeout(timer);
    };
  }, [name, typing]);

  return (
    <h3 aria-label={name}>
      <span className="chef-name-ghost" aria-hidden="true">
        {name}
      </span>
      <span className="chef-name-live" aria-hidden="true">
        {name.slice(0, count)}
        {caret && <i className="chef-caret" />}
      </span>
    </h3>
  );
}
