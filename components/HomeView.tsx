"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  brand,
  categories,
  dishes,
  events,
  heroSlides,
  instagram,
  menuTabs,
  photos,
  quotes,
  services,
  storyTabs,
  timeline,
} from "@/content/site";
import { DishMarquee, Reveal, SponsorStrip, VideoBlock } from "./blocks";
import { Diamond, Floral } from "./icons";

export function HomeView() {
  const [slide, setSlide] = useState(0);
  const [tab, setTab] = useState(storyTabs[0].id);
  const [quote, setQuote] = useState(0);
  const [menu, setMenu] = useState<(typeof menuTabs)[number]["id"]>("cocktails");
  const [cat, setCat] = useState(0);
  const [eventIndex, setEventIndex] = useState(0);
  const [booked, setBooked] = useState(false);
  const [people, setPeople] = useState("01 Person");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    const timer = window.setInterval(() => {
      setSlide((n) => (n + 1) % heroSlides.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, []);

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

  const story = storyTabs.find((item) => item.id === tab) ?? storyTabs[0];
  const current = heroSlides[slide];
  const shown = dishes.filter((dish) => dish.category === menu).slice(0, 3);
  const visibleEvents = [0, 1, 2].map((offset) => events[(eventIndex + offset) % events.length]);

  return (
    <>
      <section className="hero">
        <div className="hero-photo" key={current.outline} style={{ backgroundImage: `url(${current.image})` }} />
        <div className="hero-copy">
          <h1 key={current.outline}>
            {current.title}
            <span>{current.outline}</span>
          </h1>
          <p key={current.text}>{current.text}</p>
          <Link href="#menu" className="hero-circle">Our<br />Menus</Link>
        </div>
        <div className="hero-dots" role="tablist" aria-label="Hero slides">
          {heroSlides.map((item, index) => (
            <button
              key={item.outline}
              type="button"
              className={index === slide ? "is-on" : ""}
              aria-label={`Slide ${index + 1}`}
              onClick={() => setSlide(index)}
            />
          ))}
        </div>
      </section>

      <section className="booking" id="book">
        <div className="booking-row">
          <div>
            <h2>Book a table</h2>
            <p>Lunch and dinner, every day, above Table Bay. Parties of eight or more require a R150 per person deposit.</p>
          </div>
          <form
            className="book-form"
            onSubmit={(event) => {
              event.preventDefault();
              setBooked(true);
            }}
          >
            <select value={people} onChange={(event) => setPeople(event.target.value)} aria-label="People">
              {["01 Person", "02 Person", "03 Person", "04 Person", "05 Person", "06 Person", "08+ Person"].map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
            <input type="date" value={date} onChange={(event) => setDate(event.target.value)} aria-label="Date" required />
            <input type="time" value={time} onChange={(event) => setTime(event.target.value)} aria-label="Time" required />
            <button type="submit" className="btn-fill">Book A Seat</button>
            {booked && <p className="form-ok">The request is noted. The house confirms by phone or email.</p>}
          </form>
        </div>
      </section>

      <section className="story" id="story">
        <div className="story-mark">
          <Floral />
        </div>
        <Reveal className="story-grid">
          <img src={photos.interior} alt="The dining room" />
          <div className="story-copy">
            <h2>Around the harbour, one plate at a time</h2>
            <div className="tabs">
              {storyTabs.map((item, index) => (
                <span key={item.id}>
                  {index > 0 && <Diamond />}
                  <button type="button" className={tab === item.id ? "is-on" : ""} onClick={() => setTab(item.id)}>
                    {item.label}
                  </button>
                </span>
              ))}
            </div>
            <p>{story.body}</p>
            <Link href="#book" className="btn-line">◇ Find A Table ◇</Link>
          </div>
          <img src={photos.prawns} alt="Seared scallops" />
        </Reveal>
      </section>

      <section className="timeline" aria-label="The house">
        {timeline.map((item) => (
          <article key={item.year}>
            <strong>{item.year}</strong>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </section>

      <section className="categories">
        <div>
          <p className="kicker">From Our Menu</p>
          {categories.map((item, index) => (
            <button type="button" key={item.title} className={index === cat ? "cat is-on" : "cat"} onMouseEnter={() => setCat(index)} onClick={() => setCat(index)}>
              <small>{item.kicker}</small>
              <strong>{item.title}</strong>
            </button>
          ))}
        </div>
        <img src={categories[cat].image} alt="" />
      </section>

      <section className="quotes">
        <div className="frame frame-l" />
        <div className="frame frame-r" />
        <div className="story-mark">
          <Floral />
        </div>
        <h2 className="quotes-title">Users feedback</h2>
        <p className="stars" aria-label="5 stars">★★★★★</p>
        <blockquote>“ {quotes[quote].text} ”</blockquote>
        <figure>
          <img src={quotes[quote].image} alt="" />
          <figcaption>
            <strong>{quotes[quote].name}</strong>
            <span>{quotes[quote].role}</span>
          </figcaption>
        </figure>
        <div className="pager">
          {quotes.map((item, index) => (
            <button key={item.role} type="button" className={index === quote ? "is-on" : ""} onClick={() => setQuote(index)}>
              {index + 1}
            </button>
          ))}
        </div>
      </section>

      <DishMarquee />

      <section className="featured" id="menu">
        <img src={photos.warmRoom} alt="The dining room at night" />
        <div>
          <div className="tabs tabs-lg">
            {menuTabs.map((item, index) => (
              <span key={item.id}>
                {index > 0 && <Diamond />}
                <button type="button" className={menu === item.id ? "is-on" : ""} onClick={() => setMenu(item.id)}>
                  {item.label}
                </button>
              </span>
            ))}
          </div>
          {shown.map((dish) => (
            <article className="dish" key={dish.name}>
              <img src={dish.image} alt="" />
              <div>
                <div className="dish-line">
                  <h3>{dish.name}</h3>
                  <i />
                  <p className="price">
                    {dish.was && <s>{dish.was}</s>} {dish.price}
                  </p>
                </div>
                <p>{dish.description}</p>
              </div>
            </article>
          ))}
          <Link href="#menu" className="more">Explore More Dish</Link>
        </div>
      </section>

      <VideoBlock />

      <section className="events">
        <Reveal>
          <Floral />
          <h2>Explore our private evenings<br />along the harbour</h2>
        </Reveal>
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
        <div className="event-nav">
          <button type="button" onClick={() => setEventIndex((n) => (n + events.length - 1) % events.length)} aria-label="Previous events">‹</button>
          <button type="button" onClick={() => setEventIndex((n) => (n + 1) % events.length)} aria-label="Next events">›</button>
        </div>
      </section>

      <section className="services" aria-label="The house">
        {services.map((item) => (
          <article key={item.title}>
            <Diamond />
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </section>

      <section className="motto" aria-hidden="true">
        <p>Truly fine seafood for the long light of the harbour · Fully licensed · Halaal friendly · </p>
        <p>Truly fine seafood for the long light of the harbour · Fully licensed · Halaal friendly · </p>
      </section>

      <section className="location" id="visit">
        <div className="loc-top">
          <div className="map-wrap">
            <iframe title="Map of Baía at the V&A Waterfront" src={brand.mapEmbed} loading="lazy" />
            <a className="open-maps" href={brand.maps} target="_blank" rel="noreferrer">Open in Maps</a>
          </div>
          <div className="loc-copy">
            <Floral />
            <h2>Find us upstairs,<br />above Table Bay</h2>
            <img src={photos.interior} alt="Interior dining" />
          </div>
        </div>
        <div className="hours-row">
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
        <div className="ig-grid">
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
