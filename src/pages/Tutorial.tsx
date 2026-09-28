import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import SessionCard from "../components/SessionCard";
import StepImage from "../components/StepImage";
import { categoryLabel, findItem, items } from "../data/sessions";

export default function Tutorial() {
  const { id = "" } = useParams();
  const item = findItem(id);

  useEffect(() => {
    document.title = item ? `${item.title} · Work Plus+` : "Work Plus+";
  }, [item]);

  if (!item) {
    return (
      <section className="wrap page">
        <h1 className="page-title">Missing</h1>
        <p className="page-intro">That session is not in the library.</p>
        <Link className="btn btn-lime" to="/library">
          Back to the library
        </Link>
      </section>
    );
  }

  const backHref = item.category === "lifestyle" ? "/lifestyle" : `/library/${item.category}`;
  const backLabel =
    item.category === "lifestyle" ? "All lifestyle guides" : `All ${categoryLabel(item.category).toLowerCase()}`;
  const related = items.filter((other) => other.category === item.category && other.id !== item.id).slice(0, 3);

  return (
    <article className="wrap page">
      <Link className="back" to={backHref}>
        {backLabel}
      </Link>
      <p className="eyebrow">{categoryLabel(item.category)}</p>
      <h1 className="page-title">{item.title}</h1>
      <p className="page-intro">{item.summary}</p>
      <div className="detail-grid">
        <div className="stack">
          <h2>Why it is here</h2>
          <p>{item.purpose}</p>
          <h2>Set up</h2>
          <p>{item.setup}</p>
          <h2>How to do it</h2>
          <ol className="steps">
            {item.steps.map((step, index) => (
              <li className="step" key={step.title}>
                <span className="step-num">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.cue}</p>
                  <StepImage
                    exerciseId={item.id}
                    title={item.title}
                    stepTitle={step.title}
                    stepIndex={index}
                  />
                </div>
              </li>
            ))}
          </ol>
          <h2>Watch for these</h2>
          <ul className="mistakes">
            {item.mistakes.map((mistake) => (
              <li key={mistake}>{mistake}</li>
            ))}
          </ul>
          <p className="note">
            Work Plus+ is general education, not personal training or medical advice. Stop if something hurts, and talk
            with a qualified professional before you train through pain, pregnancy, or a health condition.
          </p>
        </div>
        <aside className="detail-side">
          <div className="stat">
            <p>
              <span>Level</span>
              {item.difficulty}
            </p>
            <p>
              <span>Time</span>
              {item.duration}
            </p>
            <p>
              <span>Gear</span>
              {item.equipment}
            </p>
            <p>
              <span>Practice</span>
              {item.prescription}
            </p>
          </div>
          <div className="easier">
            <h2>Easier option</h2>
            <p>{item.easier}</p>
          </div>
        </aside>
      </div>
      {related.length ? (
        <section className="related">
          <h2>Keep going</h2>
          <div className="card-grid">
            {related.map((other) => (
              <SessionCard key={other.id} item={other} />
            ))}
          </div>
        </section>
      ) : null}
    </article>
  );
}
