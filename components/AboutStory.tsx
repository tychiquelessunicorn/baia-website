"use client";

import { useEffect, useRef } from "react";
import { aboutNotes } from "@/content/site";

export function AboutStory() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const marks = [...node.querySelectorAll<HTMLElement>(".about-mark")];
    let frame = 0;

    const update = () => {
      frame = 0;
      if (media.matches) {
        marks.forEach((mark) => { mark.style.transform = ""; });
        return;
      }
      const view = window.innerHeight;
      const depth = window.innerWidth <= 980 ? 22 : 40;
      const centers = marks.map((mark) => {
        mark.style.transform = "none";
        const box = mark.getBoundingClientRect();
        return box.top + box.height / 2;
      });
      marks.forEach((mark, i) => {
        const local = Math.max(-1, Math.min(1, (centers[i] - view / 2) / (view * 0.72)));
        mark.style.transform = `translate3d(0, ${(local * depth).toFixed(2)}px, 0)`;
      });
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    media.addEventListener("change", onScroll);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      media.removeEventListener("change", onScroll);
    };
  }, []);

  return (
    <section className="about" id="about" aria-label="About us" ref={sectionRef}>
      <div className="about-lead">
        <div>
          <p className="kicker">About us</p>
          <h2>
            <span className="about-line"><span>A name,</span></span>
            <span className="about-line"><span>then a reputation,</span></span>
            <span className="about-line"><span>then a house.</span></span>
          </h2>
        </div>
        <p className="about-deck">Luis Viana and Daryl Mendelsohn opened the house in 2001. Patrick set its cooking. Brian has come to give it a new touch.</p>
      </div>
      <div className="about-spread">
        {aboutNotes.map((note) => (
          <article key={note.index}>
            <span className="about-mark" aria-hidden="true">{note.index}</span>
            <div className="about-copy">
              <h3>{note.title}</h3>
              <p>{note.text}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
