"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { brand, instagram } from "@/content/site";
import { Diamond, Logo } from "./icons";

const pages = [
  { href: "/#story", label: "About Us" },
  { href: "/#book", label: "Reservation" },
];

export function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [stuck, setStuck] = useState(false);
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setStuck(window.scrollY > 20);
      setShowTop(window.scrollY > 300);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setLoading(true);
    setOpen(false);
    setMobile(false);
    const timer = window.setTimeout(() => setLoading(false), 900);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open || mobile ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open, mobile]);

  useEffect(() => {
    const root = document.querySelector("main");
    if (!root) return;
    const nodes = root.querySelectorAll("section, .page-banner, .dish, .cat, .team article, .services article, .foot-grid section, .timeline article");
    nodes.forEach((el, index) => {
      el.classList.add("rise");
      (el as HTMLElement).style.transitionDelay = `${(index % 5) * 80}ms`;
    });
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-in");
        });
      },
      { threshold: 0.14 },
    );
    nodes.forEach((node) => io.observe(node));
    return () => io.disconnect();
  }, [pathname]);

  useEffect(() => {
    const root = document.documentElement;
    const move = (event: MouseEvent) => {
      root.style.setProperty("--cx", `${event.clientX}px`);
      root.style.setProperty("--cy", `${event.clientY}px`);
    };
    const over = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      root.classList.toggle("is-pointer", Boolean(target?.closest("a, button")));
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, []);

  return (
    <>
      <div className={`loader ${loading ? "is-on" : ""}`} aria-hidden={!loading}>
        <div className="loader-mark">
          <svg viewBox="0 0 180 180" className="loader-ring">
            <circle cx="90" cy="90" r="78" />
            <circle cx="90" cy="90" r="78" className="loader-arc" />
          </svg>
          <Logo />
        </div>
        <p>Loading...</p>
      </div>

      <header className={`site-header ${stuck ? "is-stuck" : ""}`}>
        <div className="utility">
          <div className="utility-side utility-left">
            <div className="lang">
              <button type="button" onClick={() => setLangOpen((v) => !v)} aria-expanded={langOpen}>
                English <span>▾</span>
              </button>
              {langOpen && (
                <ul>
                  <li><button type="button" onClick={() => setLangOpen(false)}>English</button></li>
                  <li><button type="button" onClick={() => setLangOpen(false)}>Português</button></li>
                </ul>
              )}
            </div>
            <Diamond />
            <span>12:00–15:30 · 18:00–22:00</span>
            <Diamond />
            <span className="follow">
              Follow Us:
              <a href={brand.instagram} aria-label="Instagram" target="_blank" rel="noreferrer">f</a>
              <a href={brand.instagram} aria-label="X" target="_blank" rel="noreferrer">𝕏</a>
              <a href={brand.instagram} aria-label="Behance" target="_blank" rel="noreferrer">Be</a>
            </span>
          </div>
          <div className="utility-center">
            <span className="rule" />
            <Link href="/" className="utility-logo" aria-label="Baía home">
              <Logo />
            </Link>
            <span className="rule" />
          </div>
          <div className="utility-side utility-right">
            <a href={brand.phoneHref}>P. {brand.phone}</a>
            <Diamond />
            <a href={brand.maps} target="_blank" rel="noreferrer">L. {brand.addressShort}</a>
          </div>
        </div>

        <div className="nav-bar">
          <Link href="/" className="nav-logo" aria-label="Baía home">
            <Logo />
          </Link>
          <button type="button" className="burger" aria-label="Open navigation" onClick={() => setMobile(true)}>
            <span />
            <span />
            <span />
          </button>
          <nav className="main-nav" aria-label="Primary">
            <Link href="/" className={pathname === "/" ? "is-active" : ""}>Home</Link>
            <Diamond />
            <Link href="/#menu">Menus</Link>
            <Diamond />
            <div className="has-drop">
              <button type="button">Pages <span>▾</span></button>
              <div className="drop">
                {pages.map((item) => (
                  <Link key={item.href} href={item.href}>{item.label}</Link>
                ))}
              </div>
            </div>
            <Diamond />
            <Link href="/#instagram">News</Link>
            <Diamond />
            <Link href="/#visit">Contact</Link>
          </nav>
          <button type="button" className="dot-grid" aria-label="Open panel" onClick={() => setOpen(true)}>
            {Array.from({ length: 9 }).map((_, i) => <i key={i} />)}
          </button>
        </div>
      </header>

      {mobile && (
        <div className="mobile-nav">
          <button type="button" className="sheet-close" onClick={() => setMobile(false)}>Close</button>
          <Link href="/">Home</Link>
          <Link href="/#menu">Menus</Link>
          {pages.map((item) => (
            <Link key={item.href} href={item.href}>{item.label}</Link>
          ))}
          <Link href="/#visit">Contact</Link>
        </div>
      )}

      <div className={`offcanvas ${open ? "is-open" : ""}`}>
        <button type="button" className="sheet-close" onClick={() => setOpen(false)}>Close</button>
        <Logo />
        <p>Baía, pronounced Ba-hia, means the bay. Upstairs at Entrance 5 since 2001.</p>
        <a href={brand.phoneHref}>{brand.phone}</a>
        <a href={brand.emailHref}>{brand.email}</a>
        <p>{brand.address}</p>
        <div className="off-grid">
          {instagram.slice(0, 6).map((src) => (
            <img key={src} src={src} alt="" />
          ))}
        </div>
      </div>
      {open && <button type="button" className="scrim" aria-label="Close panel" onClick={() => setOpen(false)} />}

      <div className="cursor-outer" aria-hidden="true" />
      <div className="cursor-inner" aria-hidden="true" />
      <main>{children}</main>

      <footer className="site-footer">
        <div className="foot-grid">
          <section>
            <Diamond />
            <h2>Get In Touch</h2>
            <p>T. <a href={brand.phoneHref}>{brand.phone}</a></p>
            <p>M. <a href={brand.emailHref}>{brand.email}</a></p>
          </section>
          <section>
            <Diamond />
            <h2>Address</h2>
            <p>Entrance 5, Shop 259<br />Victoria Wharf<br />V&A Waterfront, Cape Town</p>
          </section>
          <section>
            <Diamond />
            <h2>The Rooms</h2>
            <p>Cocktail bar and four terraces, upstairs at Victoria Wharf.</p>
          </section>
          <section>
            <Diamond />
            <h2>Opening Hours</h2>
            <p className="copper">{brand.lunch}</p>
            <p className="copper">{brand.dinner}</p>
          </section>
        </div>
        <div className="foot-logo">
          <Logo />
        </div>
        <div className="foot-bottom">
          <p>Copyright © {new Date().getFullYear()} {brand.legal}</p>
          <nav>
            <Link href="/#visit">Faq</Link>
            <Link href="/#visit">Careers</Link>
            <Link href="/#visit">T & C</Link>
            <Link href="/#visit">Contact</Link>
          </nav>
        </div>
      </footer>

      <button
        type="button"
        className={`to-top ${showTop ? "is-on" : ""}`}
        aria-label="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        ↑
      </button>
    </>
  );
}
