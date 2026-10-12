import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import { EventRecord, dateLabel } from "@/lib/events";
export function EventCard({ event }: { event: EventRecord }) {
  return (
    <Link className="event-card" href={"/events/" + event.slug}>
      <div className="card-image">
        <img
          src={event.image}
          alt={event.tag + " — illustrative event photography"}
          loading="lazy"
        />
        <span className="badge">DEMO EVENT</span>
        <span className="card-arrow">
          <ArrowUpRight size={23} />
        </span>
      </div>
      <div className="card-meta">
        <span>{event.category}</span>
        <span>{dateLabel(event.date)}</span>
      </div>
      <h3>{event.name}</h3>
      <div className="card-bottom">
        <span>
          <MapPin size={14} />
          {event.city}
        </span>
        <strong>
          {event.price ? "From $" + event.price : "Free"} <small>demo</small>
        </strong>
      </div>
    </Link>
  );
}
