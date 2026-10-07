"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
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
  return (
    <section className="video-block">
      <h2 className="video-word">{word}</h2>
      <div className="video-stage">
        <div className="video-cinema is-still" aria-hidden="true">
          <img className="video-logo" src="/brand/baia-logo.png?v=4" alt="" />
          <div className="play-btn">
            <PlayMark />
          </div>
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
