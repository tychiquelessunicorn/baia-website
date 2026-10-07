"use client";

import { useEffect, useRef } from "react";
import { aboutNotes, brand } from "@/content/site";

export function AboutStory() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const marks = [...node.querySelectorAll<HTMLElement>(".about-mark")];
    const pieces = [...node.querySelectorAll<HTMLElement>(".about-prose, .about-spread article, .about-close")];
    let frame = 0;

    const revealPieces = () => {
      if (media.matches) {
        pieces.forEach((piece) => piece.classList.add("is-shown"));
        return;
      }
      const limit = window.innerHeight * 0.9;
      pieces.forEach((piece) => {
        if (piece.classList.contains("is-shown")) return;
        const box = piece.getBoundingClientRect();
        if (box.top < limit) piece.classList.add("is-shown");
      });
    };

    const update = () => {
      frame = 0;
      revealPieces();
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
    const onMotion = () => onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    media.addEventListener("change", onMotion);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      media.removeEventListener("change", onMotion);
    };
  }, []);

  return (
    <section className="about" id="about" aria-label="About us" ref={sectionRef}>
      <div className="about-lead">
        <p className="kicker">About us</p>
        <h2>
          <span className="about-line"><span>BAIA — A CULINARY JOURNEY BY THE SEA</span></span>
        </h2>
      </div>
      <div className="about-prose">
        <p>Since its inception in 2001, Baia Seafood Restaurant has evolved into a world-class fine dining destination, celebrated for exceptional seafood, innovative flavours, and a distinctive fusion of culinary influences.</p>
        <p>At the heart of Baia’s enduring story are two remarkable chefs. Chef Patrick Cumaio, Baia’s original chef, hailing from Mozambique, continues to bring his passion, flair, and deep connection to seafood to every plate. His culinary artistry has helped establish the reputation for which Baia is renowned both locally and internationally.</p>
        <p>Alongside him, Chef Brian van Zijl — creator, perfectionist, and artist — transforms each dish into an experience. His attention to detail, visual artistry, and pursuit of flavour create dishes that are as captivating to look at as they are memorable to taste.</p>
        <p>Together, Patrick and Brian form a team dedicated to culinary excellence, creativity, and perfection.</p>
      </div>
      <div className="about-spread">
        {aboutNotes.map((note) => (
          <article key={note.index}>
            <span className="about-mark" aria-hidden="true">{note.index}</span>
            <div className="about-copy">
              <h3>{note.title}</h3>
              {note.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </article>
        ))}
      </div>
      <div className="about-close">
        <h3>COME DINE WITH US</h3>
        <p>Whether joining us for lunch or dinner, Baia is more than a meal — it is an experience, an adventure, and a celebration of exceptional food, remarkable views, and the art of hospitality.</p>
        <p>Come and experience Baia.</p>
        <a className="btn-fill booking-cta" href={brand.booking} target="_blank" rel="noreferrer">Book A Seat</a>
      </div>
    </section>
  );
}
