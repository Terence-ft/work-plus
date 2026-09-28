import { useEffect } from "react";
import { Link } from "react-router-dom";
import SessionCard from "../components/SessionCard";
import { categories, items } from "../data/sessions";

const WEEK = [
  { day: "Mon", title: "Squat and push", href: "/item/squat", note: "Strength" },
  { day: "Tue", title: "Easy run or walk", href: "/item/easy-run", note: "Cardio" },
  { day: "Wed", title: "Morning flow", href: "/item/morning-flow", note: "Mobility" },
  { day: "Thu", title: "Yoga flow", href: "/item/sun-salutation", note: "Yoga" },
  { day: "Fri", title: "Starter circuit", href: "/item/hiit-starter", note: "HIIT" },
  { day: "Sat", title: "Longer walk", href: "/item/daily-walk", note: "Move" },
  { day: "Sun", title: "Leave it easy", href: "/item/rest-days", note: "Rest" },
];

const PILLARS = [
  {
    kicker: "01",
    title: "Strength",
    text: "A few patterns, done well: squat, push, pull, and brace.",
    href: "/library/strength",
  },
  {
    kicker: "02",
    title: "Cardio",
    text: "Raise your heart rate without turning every session into a race.",
    href: "/library/cardio",
  },
  {
    kicker: "03",
    title: "Yoga and mobility",
    text: "Stretch what you tighten and keep the ranges you actually use.",
    href: "/library/yoga",
  },
  {
    kicker: "04",
    title: "Recovery",
    text: "Sleep, walks, water, and days that are supposed to stay easy.",
    href: "/lifestyle",
  },
];

export default function Home() {
  useEffect(() => {
    document.title = "Work Plus+";
  }, []);

  const featured = items.filter((item) => item.featured);
  const lifestylePreview = items.filter((item) => item.category === "lifestyle").slice(0, 2);

  return (
    <>
      <section className="wrap hero">
        <div>
          <p className="eyebrow">The guide to an ultimate fit life</p>
          <h1 className="display">
            Work
            <br />
            <span className="plus">Plus+</span>
          </h1>
          <p className="lede">
            Train with intent, move most days, stretch what you tighten, and recover on purpose. Every session below is
            a tutorial: setup, steps, mistakes, and an easier version.
          </p>
          <div className="hero-actions">
            <Link className="btn btn-lime" to="/library">
              Browse the library
            </Link>
            <Link className="btn btn-ghost" to="/lifestyle">
              See the lifestyle
            </Link>
          </div>
        </div>
        <aside className="week">
          <h2>A simple week</h2>
          <p>Repeat this shape. Swap days. Do not add heroics.</p>
          {WEEK.map((entry) => (
            <Link key={entry.day} to={entry.href}>
              <span>{entry.day}</span>
              <strong>{entry.title}</strong>
              <em>{entry.note}</em>
            </Link>
          ))}
        </aside>
      </section>
      <section className="wrap block">
        <ol className="how">
          <li>
            <strong>Choose</strong>
            <span>Start with strength, a walk, yoga, or a short flow.</span>
          </li>
          <li>
            <strong>Read</strong>
            <span>Follow the steps in order. Form before speed.</span>
          </li>
          <li>
            <strong>Repeat</strong>
            <span>A plain week you finish beats a perfect plan you skip.</span>
          </li>
        </ol>
      </section>
      <section className="wrap block rule">
        <div className="section-head">
          <h2>Four pillars</h2>
        </div>
        <div className="pillars">
          {PILLARS.map((pillar) => (
            <Link className="pillar" key={pillar.kicker} to={pillar.href}>
              <small>{pillar.kicker}</small>
              <div>
                <strong>{pillar.title}</strong>
                <p>{pillar.text}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <section className="wrap block rule">
        <div className="section-head">
          <h2>Start here</h2>
          <Link to="/library">All sessions</Link>
        </div>
        <div className="card-grid">
          {featured.map((item) => (
            <SessionCard key={item.id} item={item} />
          ))}
        </div>
      </section>
      <section className="wrap block rule">
        <div className="section-head">
          <h2>Find a type</h2>
        </div>
        <div className="cat-row">
          {categories.map((category) => (
            <Link className="cat-link" key={category.id} to={`/library/${category.id}`}>
              <span>{category.label}</span>
              <small>{category.blurb}</small>
            </Link>
          ))}
        </div>
      </section>
      <section className="wrap block rule lifestyle-band">
        <div>
          <p className="eyebrow">The other half</p>
          <h2 className="page-title">Live it</h2>
          <p className="lede">
            Fuel means regular meals you can repeat. The lessons here cover sleep, walking, water, and rest.
          </p>
        </div>
        <div className="card-grid">
          {lifestylePreview.map((item) => (
            <SessionCard key={item.id} item={item} />
          ))}
        </div>
      </section>
    </>
  );
}
