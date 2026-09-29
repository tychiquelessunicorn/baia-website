"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FormEvent, useMemo, useState } from "react";
import {
  brand,
  dishes,
  insights,
  instagram,
  kitchen,
  menuTabs,
  services,
  storyTabs,
  timeline,
} from "@/content/site";
import { DishMarquee, PageBanner, SponsorStrip, VideoBlock } from "./blocks";
import { Diamond } from "./icons";

function useFormState() {
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  return { done, setDone, error, setError };
}

export function MenusView() {
  const [menu, setMenu] = useState<(typeof menuTabs)[number]["id"]>("seafood");
  const shown = dishes.filter((dish) => dish.category === menu);
  const [tab, setTab] = useState(storyTabs[0].id);
  const story = storyTabs.find((item) => item.id === tab) ?? storyTabs[0];

  return (
    <>
      <PageBanner title="Menus of Baía" crumb="Menus" />
      <DishMarquee />
      <section className="menu-board">
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
        <p className="sample">A sample of the evening list. Dishes and prices may change.</p>
        <div className="menu-cols">
          {shown.map((dish) => (
            <article className="dish" key={dish.name}>
              <img src={dish.image} alt="" />
              <div>
                <div className="dish-line">
                  <h3>{dish.name}</h3>
                  <i />
                  <p className="price">{dish.was && <s>{dish.was}</s>} {dish.price}</p>
                </div>
                <p>{dish.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="story story-tight">
        <div className="story-copy center">
          <h2>For the appetite, and the occasion</h2>
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
          <Link href="/reservation" className="btn-line">◇ Find A Table ◇</Link>
        </div>
      </section>
    </>
  );
}

export function AboutView() {
  const [joined, setJoined] = useState(false);
  return (
    <>
      <PageBanner title="About our restaurant" crumb="About Us" />
      <section className="about-intro">
        <img src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1400&q=75" alt="Harbour dining" />
        <div>
          <h2>Since 2001, upstairs at the bay</h2>
          <p>
            Baía, pronounced Ba-hia and meaning the bay, opened in 2001 at Victoria Wharf. The room looks over the harbour and the ocean. Patrick Cumaio, chef de cuisine, cooks in a continental register with Portuguese colonial tradition. The house is known for the seafood platter of the Cape, and for the cataplana.
          </p>
          <h3>Opening Hours:</h3>
          <p className="copper">{brand.lunch}</p>
          <p className="copper">{brand.dinner}</p>
        </div>
      </section>
      <section className="timeline">
        {timeline.map((item) => (
          <article key={item.year}>
            <strong>{item.year}</strong>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </section>
      <section className="motto">
        <p>Truly fine seafood for the long light of the harbour · Fully licensed · Halaal friendly · </p>
        <p>Truly fine seafood for the long light of the harbour · Fully licensed · Halaal friendly · </p>
      </section>
      <section className="services">
        {services.map((item) => (
          <article key={item.title}>
            <Diamond />
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </section>
      <section className="newsletter">
        <div>
          <h2>Weekly note</h2>
          <p>A short letter on the cellar, the menu, and evenings at the Waterfront.</p>
        </div>
        {joined ? (
          <p className="form-ok">You are on the list.</p>
        ) : (
          <form
            onSubmit={(event) => {
              event.preventDefault();
              setJoined(true);
            }}
          >
            <input name="name" placeholder="Your name" aria-label="Your name" required />
            <input name="email" type="email" placeholder="Business email" aria-label="Email" required />
            <button type="submit" className="btn-fill">Join</button>
          </form>
        )}
      </section>
    </>
  );
}

export function ChefsView() {
  return (
    <>
      <PageBanner title="The kitchen at Baía" crumb="Chef’s" />
      <section className="team">
        {kitchen.map((person) => (
          <article key={person.name}>
            <div className="mono">{person.name.slice(0, 1)}</div>
            <p>{person.role}</p>
            <h3>{person.name}</h3>
            <p>{person.text}</p>
          </article>
        ))}
      </section>
      <VideoBlock word="Kitchen" />
      <SponsorStrip line="Patrick Cumaio, chef de cuisine" />
      <section className="insights">
        {insights.map((item) => (
          <article key={item.kicker}>
            <img src={item.image} alt="" />
            <p>{item.kicker}</p>
            <h3>{item.title}</h3>
          </article>
        ))}
      </section>
    </>
  );
}

export function ReservationView() {
  const params = useSearchParams();
  const initialPeople = params.get("people") ?? "02 Person";
  const { done, setDone, error, setError } = useFormState();
  const [people, setPeople] = useState(initialPeople);
  const large = useMemo(() => people.startsWith("08"), [people]);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = String(data.get("email") ?? "");
    const phone = String(data.get("phone") ?? "");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Enter a valid email address.");
      return;
    }
    if (phone.replace(/\D/g, "").length < 9) {
      setError("Enter a phone number.");
      return;
    }
    setError("");
    setDone(true);
  }

  return (
    <>
      <PageBanner title="Reserve your table" crumb="Reservation" />
      <VideoBlock />
      <section className="reserve">
        <h2>Reservation form</h2>
        {done ? (
          <p className="form-ok">The request is noted in this preview. The house will confirm a live booking by phone or email.</p>
        ) : (
          <form onSubmit={submit}>
            <input name="event" placeholder="Event name" aria-label="Event name" defaultValue="Dinner" required />
            <select name="people" aria-label="Number of people" value={people} onChange={(event) => setPeople(event.target.value)}>
              {["01 Person", "02 Person", "03 Person", "04 Person", "05 Person", "06 Person", "08+ Person"].map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
            <input name="date" type="date" aria-label="Date" defaultValue={params.get("date") ?? ""} required />
            <input name="time" type="time" aria-label="Time" defaultValue={params.get("time") ?? ""} required />
            <input name="name" placeholder="Name" aria-label="Name" required />
            <input name="email" type="email" placeholder="Business email" aria-label="Email" required />
            <input name="phone" placeholder="Phone number" aria-label="Phone number" required />
            <textarea name="message" placeholder="Tell us more about the table (optional)" aria-label="Message" />
            <p className={large ? "deposit is-hot" : "deposit"}>
              Parties of 8 or more require a R150 per person deposit to secure the reservation.
            </p>
            {error && <p className="form-error">{error}</p>}
            <button type="submit" className="btn-fill">Request the table</button>
          </form>
        )}
      </section>
      <DishMarquee />
    </>
  );
}

export function ContactView() {
  const { done, setDone, error, setError } = useFormState();

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = String(data.get("email") ?? "");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Enter a valid email address.");
      return;
    }
    setError("");
    setDone(true);
  }

  return (
    <>
      <PageBanner title="Baía at the Waterfront" crumb="Contact" />
      <section className="contact-grid">
        <div className="map-wrap tall">
          <iframe title="Map of Baía" src={brand.mapEmbed} loading="lazy" />
        </div>
        <div>
          <h2>Around the harbour, one plate at a time</h2>
          <h3>Opening Hours:</h3>
          <p className="copper">{brand.lunch}</p>
          <p className="copper">{brand.dinner}</p>
          <h3>Contact info:</h3>
          <p><a href={brand.maps}>{brand.address}</a></p>
          <p><a href={brand.phoneHref}>{brand.phone}</a></p>
          <p><a href={brand.emailHref}>{brand.email}</a></p>
          <p>Fully licensed. Halaal friendly. Parties of 8 or more require a R150 per person deposit.</p>
        </div>
      </section>
      <section className="reserve">
        <h2>Write to the house</h2>
        {done ? (
          <p className="form-ok">The note is recorded in this preview. For a table, call {brand.phone}.</p>
        ) : (
          <form onSubmit={submit}>
            <input name="name" placeholder="Name" aria-label="Name" required />
            <input name="phone" placeholder="Phone number" aria-label="Phone" required />
            <input name="email" type="email" placeholder="Business email" aria-label="Email" required />
            <select name="subject" aria-label="Subject" defaultValue="Reservations">
              {["Reservations", "Seafood", "Wine", "Functions"].map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
            <textarea name="message" placeholder="Tell us more" aria-label="Message" required />
            {error && <p className="form-error">{error}</p>}
            <button type="submit" className="btn-fill">Send</button>
          </form>
        )}
      </section>
      <section className="instagram" id="instagram">
        <a className="ig-badge" href={brand.instagram} target="_blank" rel="noreferrer">Instagram</a>
        <div className="ig-grid">
          {instagram.map((src) => (
            <a key={src} href={brand.instagram} target="_blank" rel="noreferrer">
              <img src={src} alt="" />
            </a>
          ))}
        </div>
      </section>
    </>
  );
}
