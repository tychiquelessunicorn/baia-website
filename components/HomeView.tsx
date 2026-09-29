"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  brand,
  events,
  heroSlides,
  instagram,
  photos,
  quotes,
  services,
  storyTabs,
} from "@/content/site";
import { DishMarquee, Reveal, SponsorStrip, VideoBlock } from "./blocks";
import { Chefs } from "./Chefs";
import { MenuExplore } from "./MenuExplore";
import { Diamond, Floral } from "./icons";

const TYPE_LETTER = 150;
const TYPE_GAP = 440;
const TYPE_START = 200;

function HeroTitle({ title, outline }: { title: string; outline: string }) {
  const [titleCount, setTitleCount] = useState(0);
  const [outlineCount, setOutlineCount] = useState(0);
  const [caret, setCaret] = useState<"title" | "outline" | null>("title");

  useEffect(() => {
    const copy = document.querySelector(".hero-copy");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setTitleCount(title.length);
      setOutlineCount(outline.length);
      setCaret(null);
      copy?.classList.add("is-spoken");
      return () => copy?.classList.remove("is-spoken");
    }
    setTitleCount(0);
    setOutlineCount(0);
    setCaret("title");
    let alive = true;
    const ids: number[] = [];
    const later = (ms: number, fn: () => void) => {
      ids.push(window.setTimeout(() => { if (alive) fn(); }, ms));
    };
    const typeLine = (text: string, set: (count: number) => void, done: () => void) => {
      let i = 0;
      const step = () => {
        i += 1;
        set(i);
        if (i >= text.length) done();
        else later(TYPE_LETTER, step);
      };
      later(TYPE_LETTER, step);
    };
    const begin = () => {
      typeLine(title, setTitleCount, () => {
        later(TYPE_GAP, () => {
          setCaret("outline");
          copy?.classList.add("is-spoken");
          typeLine(outline, setOutlineCount, () => undefined);
        });
      });
    };
    const loader = document.querySelector(".loader");
    let observer: MutationObserver | null = null;
    if (loader?.classList.contains("is-on")) {
      observer = new MutationObserver(() => {
        if (!loader.classList.contains("is-on")) {
          observer?.disconnect();
          later(160, begin);
        }
      });
      observer.observe(loader, { attributes: true, attributeFilter: ["class"] });
    } else {
      later(TYPE_START, begin);
    }
    return () => {
      alive = false;
      observer?.disconnect();
      ids.forEach((id) => window.clearTimeout(id));
      copy?.classList.remove("is-spoken");
    };
  }, [title, outline]);

  return (
    <h1 aria-label={`${title} ${outline}`}>
      <span className="hero-line">
        <span className="hero-ghost" aria-hidden="true">{title}</span>
        <span className="hero-live" aria-hidden="true">
          {title.slice(0, titleCount)}
          {caret === "title" && <i className="hero-caret" />}
        </span>
      </span>
      <span className="hero-line hero-outline">
        <span className="hero-ghost" aria-hidden="true">{outline}</span>
        <span className="hero-live" aria-hidden="true">
          {outline.slice(0, outlineCount)}
          {caret === "outline" && <i className="hero-caret is-copper" />}
        </span>
      </span>
    </h1>
  );
}

export function HomeView() {
  const [slide, setSlide] = useState(0);
  const [leaving, setLeaving] = useState<number | null>(null);
  const [fading, setFading] = useState(false);
  const slideRef = useRef(0);
  const [tab, setTab] = useState(storyTabs[0].id);
  const [copyIndex, setCopyIndex] = useState(0);
  const [phase, setPhase] = useState<"in" | "out">("in");
  const [storyEpoch, setStoryEpoch] = useState(0);
  const [swap, setSwap] = useState(0);
  const tabRef = useRef(0);
  const pendingRef = useRef(0);
  const storyReady = useRef(false);
  const [quote, setQuote] = useState(0);
  const [eventIndex, setEventIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      const current = slideRef.current;
      const next = (current + 1) % heroSlides.length;
      setLeaving(current);
      slideRef.current = next;
      setFading(true);
      setSlide(next);
    }, 6800);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (leaving === null) return;
    const timer = window.setTimeout(() => setLeaving(null), 1900);
    return () => window.clearTimeout(timer);
  }, [leaving]);

  const queueStory = (index: number, restart: boolean) => {
    if (index === tabRef.current) return;
    tabRef.current = index;
    pendingRef.current = index;
    setTab(storyTabs[index].id);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCopyIndex(index);
      setPhase("in");
    } else {
      setPhase("out");
      setSwap((n) => n + 1);
    }
    if (restart) setStoryEpoch((n) => n + 1);
  };

  useEffect(() => {
    if (!storyReady.current) {
      storyReady.current = true;
      return;
    }
    const timer = window.setTimeout(() => {
      setCopyIndex(pendingRef.current);
      setPhase("in");
    }, 460);
    return () => window.clearTimeout(timer);
  }, [swap]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => {
      const next = (tabRef.current + 1) % storyTabs.length;
      tabRef.current = next;
      pendingRef.current = next;
      setTab(storyTabs[next].id);
      setPhase("out");
      setSwap((n) => n + 1);
    }, 5600);
    return () => window.clearInterval(timer);
  }, [storyEpoch]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setQuote((n) => (n + 1) % quotes.length);
    }, 4500);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setEventIndex((n) => (n + 1) % events.length);
    }, 4000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    const apply = () => {
      frame = 0;
      if (reduce.matches) {
        document.querySelectorAll<HTMLElement>(".hero-depth, .hero-copy, [data-parallax]").forEach((el) => {
          el.style.transform = "";
          delete el.dataset.shift;
        });
        return;
      }
      const view = window.innerHeight;
      const narrow = window.innerWidth < 981;
      const calm = narrow ? 0.55 : 1;
      const scroll = window.scrollY;

      const depth = document.querySelector<HTMLElement>(".hero-depth");
      if (depth) depth.style.transform = `translate3d(0, ${Math.min(scroll * 0.46, 210) * calm}px, 0)`;

      const copy = document.querySelector<HTMLElement>(".hero-copy");
      if (copy) copy.style.transform = `translate3d(0, ${-Math.min(scroll * 0.16, 90) * calm}px, 0)`;

      document.querySelectorAll<HTMLElement>("[data-parallax]").forEach((el) => {
        const speed = Number(el.dataset.parallax) * calm;
        const shift = Number(el.dataset.shift || 0);
        const center = el.getBoundingClientRect().top - shift + el.offsetHeight / 2;
        const progress = (center - view / 2) / view;
        const next = progress * speed;
        el.dataset.shift = String(next);
        el.style.transform = `translate3d(0, ${next}px, 0)`;
      });
    };

    const request = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(apply);
    };

    apply();
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
    reduce.addEventListener("change", request);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
      reduce.removeEventListener("change", request);
    };
  }, []);

  const current = heroSlides[slide];
  const visibleEvents = [0, 1, 2].map((offset) => events[(eventIndex + offset) % events.length]);

  return (
    <>
      <section className="hero">
        <div className="hero-photo">
          <div className="hero-depth">
          {heroSlides.map((item, index) => (
            <div
              key={item.image}
              className={`hero-frame ${index === slide ? "is-on" : ""} ${fading && index === slide ? "is-fade" : ""}`}
              style={{
                backgroundImage: `url(${item.image})`,
                opacity: index === slide || index === leaving ? 1 : 0,
                zIndex: index === slide ? 3 : 2,
              }}
              aria-hidden={index !== slide}
            />
          ))}
          </div>
        </div>
        <div className="hero-copy">
          <HeroTitle key={current.outline} title={current.title} outline={current.outline} />
          <p key={current.text}>{current.text}</p>
          <Link
            href="#explore"
            className="hero-circle"
            onClick={(event) => {
              const target = document.getElementById("explore");
              if (!target) return;
              event.preventDefault();
              const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
              const header = document.querySelector(".site-header")?.getBoundingClientRect().height ?? 96;
              const destination = () => target.getBoundingClientRect().top + window.scrollY - header - 18;
              const top = destination();
              if (reduce) {
                window.scrollTo({ top, behavior: "instant" });
                return;
              }
              const start = window.scrollY;
              const distance = top - start;
              const duration = 1150;
              const began = performance.now();
              const step = (now: number) => {
                const t = Math.min(1, (now - began) / duration);
                const eased = 1 - Math.pow(1 - t, 3);
                window.scrollTo({ top: start + distance * eased, behavior: "instant" });
                if (t < 1) {
                  window.requestAnimationFrame(step);
                  return;
                }
                const fix = target.getBoundingClientRect().top - header - 18;
                if (Math.abs(fix) > 2) window.scrollTo({ top: window.scrollY + fix, behavior: "instant" });
              };
              window.requestAnimationFrame(step);
            }}
          >
            Our<br />Menus
          </Link>
        </div>
        <div className="hero-dots" role="tablist" aria-label="Hero slides">
          {heroSlides.map((item, index) => (
            <button
              key={item.outline}
              type="button"
              className={index === slide ? "is-on" : ""}
              aria-label={`Slide ${index + 1}`}
              onClick={() => {
                if (index === slideRef.current) return;
                setLeaving(slideRef.current);
                slideRef.current = index;
                setFading(true);
                setSlide(index);
              }}
            />
          ))}
        </div>
      </section>

      <section className="booking" id="book">
        <div className="booking-row" data-parallax="70">
          <div className="booking-copy">
            <p className="kicker">Reservations</p>
            <h2>Book a table</h2>
            <p>Lunch or dinner, every day, with Table Mountain before you and the harbour below. Choose the hour. The table is held in your name.</p>
            <ul className="booking-facts">
              <li>Lunch 12:00–15:30</li>
              <li>Dinner 18:00–22:00</li>
              <li>Eight or more · R150 deposit per person</li>
            </ul>
          </div>
          <a className="btn-fill booking-cta" href={brand.booking}>Book A Seat</a>
        </div>
      </section>

      <section className="story" id="story">
        <div className="story-mark" data-parallax="42">
          <Floral />
        </div>
        <Reveal className="story-grid">
          <div className="story-photo" data-parallax="-130">
            <img src={photos.interior} alt="The dining room" />
          </div>
          <div className="story-copy" data-parallax="-72">
            <h2>For the appetite, and the occasion</h2>
            <div className="tabs">
              {storyTabs.map((item, index) => (
                <span key={item.id}>
                  {index > 0 && <Diamond />}
                  <button
                    type="button"
                    className={tab === item.id ? "is-on" : ""}
                    onClick={() => queueStory(index, true)}
                  >
                    {item.label}
                  </button>
                </span>
              ))}
            </div>
            <div className="story-body">
              <p className={phase === "out" ? "is-out" : "is-in"} key={copyIndex}>
                {storyTabs[copyIndex].body}
              </p>
            </div>
            <a className="btn-line" href={brand.booking}>◇ Find A Table ◇</a>
          </div>
          <div className="story-photo" data-parallax="160">
            <img src={photos.prawns} alt="Seared scallops" />
          </div>
        </Reveal>
      </section>

      <MenuExplore />

      <Chefs />

      <section className="quotes">
        <div className="frame frame-l" />
        <div className="frame frame-r" />
        <div data-parallax="90">
          <div className="story-mark">
            <Floral />
          </div>
          <h2 className="quotes-title">Users feedback</h2>
          <a
            className="quotes-link"
            href={quotes[quote].href}
            target="_blank"
            rel="noreferrer"
            aria-label={`Read ${quotes[quote].name}'s review on ${quotes[quote].source}`}
          >
            <p className="stars" aria-hidden="true">{"★".repeat(quotes[quote].rating)}</p>
            <blockquote>“ {quotes[quote].text} ”</blockquote>
            <figure>
              <img src={quotes[quote].image} alt={quotes[quote].name} />
              <figcaption>
                <strong>{quotes[quote].name}</strong>
                <span>{quotes[quote].source} · {quotes[quote].when}</span>
              </figcaption>
            </figure>
          </a>
          <div className="pager">
            {quotes.map((item, index) => (
              <button key={`${item.name}-${item.when}`} type="button" className={index === quote ? "is-on" : ""} onClick={() => setQuote(index)}>
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </section>

      <DishMarquee />

      <VideoBlock word="The new home" />

      <section className="events">
        <div data-parallax="-70">
          <Reveal>
            <Floral />
            <h2>Explore our private evenings<br />along the harbour</h2>
          </Reveal>
        </div>
        <div data-parallax="110">
        <div className="event-row">
          {visibleEvents.map((item, index) => (
            <article key={`${item.title}-${index}`} className={index === 1 ? "is-offset" : ""}>
              <img src={item.image} alt="" />
              <h3>{item.title}</h3>
              <p>{item.date}</p>
              <p>Time: {item.time}</p>
            </article>
          ))}
        </div>
        </div>
        <div className="event-nav" data-parallax="-48">
          <button type="button" onClick={() => setEventIndex((n) => (n + events.length - 1) % events.length)} aria-label="Previous events">‹</button>
          <button type="button" onClick={() => setEventIndex((n) => (n + 1) % events.length)} aria-label="Next events">›</button>
        </div>
      </section>

      <section className="services" aria-label="The house">
        <div className="services-row" data-parallax="82">
          {services.map((item) => (
            <article key={item.title}>
              <Diamond />
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="motto" aria-hidden="true">
        <div className="motto-drift" data-parallax="-46">
          <p>Truly fine seafood for the long light of the harbour · Fully licensed · Halaal friendly · </p>
          <p>Truly fine seafood for the long light of the harbour · Fully licensed · Halaal friendly · </p>
        </div>
      </section>

      <section className="location" id="visit">
        <div className="loc-top">
          <div className="map-wrap" data-parallax="120">
            <iframe title="Map of Baía at the V&A Waterfront" src={brand.mapEmbed} loading="lazy" />
            <a className="open-maps" href={brand.maps} target="_blank" rel="noreferrer">Open in Maps</a>
          </div>
          <div className="loc-copy" data-parallax="-84">
            <Floral />
            <h2>Find us upstairs,<br />above Table Bay</h2>
            <img src={photos.interior} alt="Interior dining" />
          </div>
        </div>
        <div className="hours-row" data-parallax="64">
          <div>
            <p>{brand.address}, {brand.phone}, {brand.email}</p>
            <h3>Opening Hours:</h3>
            <p className="copper">{brand.lunch}</p>
            <p className="copper">{brand.dinner}</p>
          </div>
          <a className="btn-line" href={brand.maps} target="_blank" rel="noreferrer">Get Direction ◇</a>
        </div>
      </section>

      <SponsorStrip />

      <section className="instagram" id="instagram">
        <a className="ig-badge" href={brand.instagram} target="_blank" rel="noreferrer">Instagram</a>
        <div className="ig-grid" data-parallax="100">
          {instagram.map((src, index) => (
            <a key={`${src}-${index}`} href={brand.instagram} target="_blank" rel="noreferrer">
              <img src={src} alt="" />
            </a>
          ))}
        </div>
      </section>
    </>
  );
}
