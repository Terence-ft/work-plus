import { useEffect } from "react";
import SessionCard from "../components/SessionCard";
import { items } from "../data/sessions";

export default function Lifestyle() {
  useEffect(() => {
    document.title = "Lifestyle · Work Plus+";
  }, []);

  const guides = items.filter((item) => item.category === "lifestyle");

  return (
    <section className="wrap page">
      <p className="eyebrow">Sleep, walk, water, rest</p>
      <h1 className="page-title">Lifestyle</h1>
      <p className="page-intro">
        Workouts are half of a fit life. Fuel means regular meals with protein and plants, enough to train. These
        guides are the habits that let the library stick. They are practical routines, not medical advice.
      </p>
      <div className="card-grid">
        {guides.map((item) => (
          <SessionCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
