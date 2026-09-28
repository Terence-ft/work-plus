import { Link } from "react-router-dom";
import { categoryLabel } from "../data/sessions";
import type { Session } from "../types";

export default function SessionCard({ item }: { item: Session }) {
  return (
    <Link className="card" to={`/item/${item.id}`}>
      <p className="card-kicker">
        <span>{categoryLabel(item.category)}</span>
        <span>{item.duration}</span>
      </p>
      <h3>{item.title}</h3>
      <p className="card-summary">{item.summary}</p>
      <p className="card-meta">
        <span>{item.difficulty}</span>
        <span>{item.equipment}</span>
      </p>
    </Link>
  );
}
