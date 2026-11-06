"use client";

import { useRef, type TouchEvent } from "react";

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Previous / next control for the slideshows on small screens: two round copper
 * buttons with a "01 / 05" counter between them. Hidden on desktop, where the
 * existing dots and tabs remain.
 */
export function SlideNav({
  index,
  total,
  label,
  onPrev,
  onNext,
  className = "",
}: {
  index: number;
  total: number;
  label: string;
  onPrev: () => void;
  onNext: () => void;
  className?: string;
}) {
  return (
    <div className={`slide-nav ${className}`} role="group" aria-label={`${label} controls`}>
      <button type="button" className="slide-nav-btn" aria-label={`Previous ${label.toLowerCase()}`} onClick={onPrev}>
        <Chevron dir="left" />
      </button>
      <span className="slide-nav-count" aria-live="polite">
        <b>{pad(index + 1)}</b>
        <i aria-hidden="true" />
        <span>{pad(total)}</span>
      </span>
      <button type="button" className="slide-nav-btn" aria-label={`Next ${label.toLowerCase()}`} onClick={onNext}>
        <Chevron dir="right" />
      </button>
    </div>
  );
}

function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d={dir === "left" ? "M14.5 6 8.5 12l6 6" : "M9.5 6l6 6-6 6"} />
    </svg>
  );
}

/** Horizontal swipe handlers: swipe left for next, right for previous. */
export function useSwipe(onPrev: () => void, onNext: () => void) {
  const start = useRef<{ x: number; y: number } | null>(null);
  return {
    onTouchStart: (event: TouchEvent) => {
      const t = event.touches[0];
      start.current = { x: t.clientX, y: t.clientY };
    },
    onTouchEnd: (event: TouchEvent) => {
      const from = start.current;
      start.current = null;
      if (!from) return;
      const t = event.changedTouches[0];
      const dx = t.clientX - from.x;
      const dy = t.clientY - from.y;
      if (Math.abs(dx) < 40 || Math.abs(dx) < Math.abs(dy) * 1.3) return;
      if (dx < 0) onNext();
      else onPrev();
    },
  };
}
