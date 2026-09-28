import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SessionCard from "../components/SessionCard";
import { categories, categoryLabel, items, libraryCategoryIds } from "../data/sessions";

export default function Library() {
  const { category: categoryParam } = useParams();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const category =
    categoryParam && libraryCategoryIds.includes(categoryParam as (typeof libraryCategoryIds)[number])
      ? categoryParam
      : "all";

  useEffect(() => {
    document.title = "Library · Work Plus+";
  }, []);

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return items.filter((item) => {
      if (item.category === "lifestyle") return false;
      if (category !== "all" && item.category !== category) return false;
      if (!needle) return true;
      const haystack = [item.title, item.summary, item.purpose, item.equipment, categoryLabel(item.category)]
        .join(" ")
        .toLowerCase();
      return haystack.includes(needle);
    });
  }, [category, query]);

  const noun = results.length === 1 ? "session" : "sessions";
  const prefix = category === "all" ? "" : `${categoryLabel(category).toLowerCase()} `;

  return (
    <section className="wrap page">
      <p className="eyebrow">Workouts, stretches, cardio, yoga</p>
      <h1 className="page-title">Library</h1>
      <p className="page-intro">Search by name or muscle-pattern. Open any card for the full tutorial.</p>
      <div className="library-tools">
        <label className="sr-only" htmlFor="search">
          Search sessions
        </label>
        <input
          className="search"
          id="search"
          type="search"
          placeholder="Search squats, hips, yoga, rope..."
          autoComplete="off"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <div className="chips">
          {[{ id: "all", label: "All" }, ...categories].map((chip) => {
            const on = chip.id === category;
            return (
              <button
                key={chip.id}
                className={on ? "chip is-on" : "chip"}
                type="button"
                aria-pressed={on}
                onClick={() => navigate(chip.id === "all" ? "/library" : `/library/${chip.id}`)}
              >
                {chip.label}
              </button>
            );
          })}
        </div>
        <p className="count" aria-live="polite">
          {results.length} {prefix}
          {noun}
        </p>
      </div>
      <div className="card-grid">
        {results.length ? (
          results.map((item) => <SessionCard key={item.id} item={item} />)
        ) : (
          <p className="empty">Nothing matches that. Try another word, or clear the search.</p>
        )}
      </div>
    </section>
  );
}
