"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { brand } from "@/content/site";
import { Diamond, FacebookIcon, InstagramIcon, Logo, MailIcon, PhoneIcon } from "./icons";

const pages = [
  { href: "/#story", label: "About Us" },
  { href: "/#book", label: "Reservation" },
];

export function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [stuck, setStuck] = useState(false);
  const [open, setOpen] = useState(false);
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
    const timer = window.setTimeout(() => setLoading(false), 1500);
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
        <Logo />
      </div>

      <header className={`site-header ${stuck ? "is-stuck" : ""}`}>
        <div className="utility">
          <div className="utility-side utility-left">
            <dl className="utility-hours">
              {brand.headerHours.map((row) => (
                <div key={row.label}>
                  <dt>{row.label}</dt>
                  <dd>{row.time}</dd>
                </div>
              ))}
            </dl>
            <span className="utility-split" aria-hidden="true" />
            <span className="follow">
              <a href={brand.facebook} aria-label="Facebook" target="_blank" rel="noreferrer">
                <FacebookIcon />
              </a>
              <a href={brand.instagram} aria-label="Instagram" target="_blank" rel="noreferrer">
                <InstagramIcon />
              </a>
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
            <a className="utility-phone" href={brand.phoneHref}>{brand.phone}</a>
            <span className="utility-split" aria-hidden="true" />
            <a className="utility-address" href={brand.maps} target="_blank" rel="noreferrer">
              {brand.headerAddress.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </a>
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
            <Link href="/#explore">Menus</Link>
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
          <Link href="/#explore">Menus</Link>
          {pages.map((item) => (
            <Link key={item.href} href={item.href}>{item.label}</Link>
          ))}
          <Link href="/#visit">Contact</Link>
        </div>
      )}

      <div className={`offcanvas ${open ? "is-open" : ""}`}>
        <button type="button" className="sheet-close" onClick={() => setOpen(false)}>Close</button>
        <Logo />
        <p>BAIA: Where every visit is an invitation to relax, indulge and savour the best of Cape Town&apos;s coastal dining.</p>
        <a className="off-line" href={brand.phoneHref}>
          <PhoneIcon />
          {brand.phone}
        </a>
        <a className="off-line" href={brand.emailHref}>
          <MailIcon />
          {brand.email}
        </a>
        <a className="off-address" href={brand.maps} target="_blank" rel="noreferrer">
          Shop 259, Entrance 5, V&A Waterfront, Cape Town 8001
        </a>
        <div className="off-map">
          <iframe title="Map of Baía at the V&A Waterfront" src={brand.mapEmbed} loading="lazy" />
          <a
            className="map-open"
            href={brand.maps}
            target="_blank"
            rel="noreferrer"
            aria-label="Open Shop 259, Entrance 5, V&A Waterfront, Cape Town 8001 in Google Maps"
          />
        </div>
      </div>
      {open && <button type="button" className="scrim" aria-label="Close panel" onClick={() => setOpen(false)} />}

      <div className="cursor-outer" aria-hidden="true" />
      <div className="cursor-inner" aria-hidden="true" />
      <main>{children}</main>

      <footer className="site-footer">
        <div className="foot-grid" data-parallax="90">
          <section>
            <Diamond />
            <h2>Get In Touch</h2>
            <p className="foot-contact">
              <PhoneIcon />
              <a href={brand.phoneHref}>{brand.phone}</a>
            </p>
            <p className="foot-contact">
              <MailIcon />
              <a href={brand.emailHref}>{brand.email}</a>
            </p>
          </section>
          <section>
            <Diamond />
            <h2>Address</h2>
            <p>Shop 259, Entrance 5, V&A Waterfront, Cape Town 8001</p>
          </section>
          <section>
            <Diamond />
            <h2>Opening Hours</h2>
            <p className="copper">{brand.lunch}</p>
            <p className="copper">{brand.dinner}</p>
          </section>
        </div>
        <div className="foot-logo" data-parallax="-56">
          <Logo />
        </div>
        <div className="foot-bottom" data-parallax="40">
          <p>Copyright © {new Date().getFullYear()} {brand.legal}</p>
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
