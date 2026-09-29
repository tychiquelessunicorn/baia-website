"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { PlayMark } from "./icons";

export function Reveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const [on, setOn] = useState(false);
  const [node, setNode] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!node) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setOn(true);
      },
      { threshold: 0.16 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [node]);

  return (
    <div ref={setNode} className={`reveal ${on ? "is-in" : ""} ${className}`}>
      {children}
    </div>
  );
}

export function PageBanner({ title, crumb }: { title: string; crumb: string }) {
  return (
    <header className="page-banner">
      <p className="crumb">
        <Link href="/">Home</Link>
        <span> / </span>
        {crumb}
      </p>
      <h1>{title}</h1>
    </header>
  );
}

const MARQUEE_LINE =
  "BAIA: Where every visit is an invitation to relax, indulge and savour the best of Cape Town's coastal dining.";

export function DishMarquee() {
  const copies = [0, 1, 2, 3];
  const row = (reverse: boolean) => (
    <div className={`marquee-row${reverse ? " marquee-row-rev" : ""}`}>
      <div className="marquee-track" aria-hidden="true">
        {copies.map((i) => (
          <span className="marquee-item" key={i}>
            <em>{MARQUEE_LINE}</em>
            <i className="diamond" />
          </span>
        ))}
      </div>
    </div>
  );
  return (
    <section className="marquee" aria-label={MARQUEE_LINE}>
      {row(false)}
      {row(true)}
    </section>
  );
}

export function VideoBlock({ word = "Restaurant" }: { word?: string }) {
  const film = useRef<HTMLVideoElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [seen, setSeen] = useState(false);
  const [playing, setPlaying] = useState(false);

  const play = () => {
    const node = film.current;
    if (!node) return;
    void node.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
  };

  const pause = () => {
    film.current?.pause();
    setPlaying(false);
  };

  const openFilm = () => {
    setSeen(true);
    setOpen(true);
    play();
  };

  const closeFilm = () => {
    pause();
    setOpen(false);
  };

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeFilm();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const onStageClick = () => {
    if (!open) {
      openFilm();
      return;
    }
    if (film.current?.paused) play();
    else pause();
  };

  return (
    <section className={`video-block${open ? " is-cinema" : ""}${seen ? " was-cinema" : ""}`}>
      <h2 className="video-word">{word}</h2>
      <div className="video-stage">
        <div
          className="video-cinema"
          onClick={onStageClick}
          role={open ? "dialog" : undefined}
          aria-modal={open || undefined}
          aria-label={open ? word : undefined}
        >
          <div className="video-drift">
            <video
              ref={film}
              src="/video/sushi-reel.mp4"
              poster="/video/sushi-poster.jpg"
              playsInline
              loop
              preload="none"
              onEnded={() => setPlaying(false)}
              aria-label="Sushi at the Baía bar"
            />
          </div>
          <button
            type="button"
            className={`play-btn ${playing ? "is-hidden" : ""}`}
            onClick={(event) => {
              event.stopPropagation();
              onStageClick();
            }}
            aria-label={playing ? "Pause the film" : "Play the film"}
          >
            <PlayMark />
          </button>
          {open ? (
            <button
              ref={closeRef}
              type="button"
              className="video-cinema-close"
              aria-label="Close the film"
              onClick={(event) => {
                event.stopPropagation();
                closeFilm();
              }}
            >
              Close
            </button>
          ) : null}
        </div>
      </div>
    </section>
  );
}

export function SponsorStrip({ line = "A cellar of rare Cape vintages" }: { line?: string }) {
  const marks = ["Cape Cellar", "Walker Bay", "Hemel", "Swartland", "The Coast"];
  const loop = [...marks, ...marks];
  return (
    <section className="sponsors">
      <ul>
        {loop.map((mark, index) => (
          <li key={`${mark}-${index}`}>{mark}</li>
        ))}
      </ul>
      <p>{line}</p>
    </section>
  );
}
