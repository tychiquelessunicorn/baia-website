"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { marquee } from "@/content/site";
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

export function DishMarquee() {
  const loop = [...marquee, ...marquee];
  return (
    <section className="marquee" aria-label="Dishes">
      <div className="marquee-row">
        <div className="marquee-track">
          {loop.map((item, i) => (
            <span className="marquee-item" key={`a-${item.name}-${i}`}>
              <em>{item.name}</em>
              <img src={item.image} alt="" />
            </span>
          ))}
        </div>
      </div>
      <div className="marquee-row marquee-row-rev">
        <div className="marquee-track">
          {loop.map((item, i) => (
            <span className="marquee-item" key={`b-${item.name}-${i}`}>
              <em>{item.name}</em>
              <img src={item.image} alt="" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export function VideoBlock({ word = "Restaurant" }: { word?: string }) {
  const film = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const toggle = () => {
    const node = film.current;
    if (!node) return;
    if (node.paused) {
      void node.play();
      setPlaying(true);
    } else {
      node.pause();
      setPlaying(false);
    }
  };

  return (
    <section className="video-block">
      <h2 className="video-word">{word}</h2>
      <div className="video-frame">
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
        <button
          type="button"
          className={`play-btn ${playing ? "is-hidden" : ""}`}
          onClick={toggle}
          aria-label={playing ? "Pause the film" : "Play the film"}
        >
          <PlayMark />
        </button>
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
