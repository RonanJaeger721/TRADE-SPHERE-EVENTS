import Link from "next/link";
import { notFound } from "next/navigation";
import { events, dateLabel, timeLabel } from "@/lib/events";
import { Countdown, Share } from "@/components/event-tools";
import { EventCard } from "@/components/event-card";
export function generateStaticParams() {
  return events.map((e) => ({ slug: e.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return {
    title: events.find((e) => e.slug === slug)?.name || "Event not found",
  };
}
export default async function Detail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = events.find((e) => e.slug === slug);
  if (!event) notFound();
  return (
    <>
      <section className="event-detail">
        <Link href="/events" className="text-link">
          ← All experiences
        </Link>
        <div className="detail-grid">
          <div>
            <p className="eyebrow">{event.category} · DEMO EVENT</p>
            <h1>{event.name}</h1>
            <p className="detail-date">
              {dateLabel(event.date)} · {timeLabel(event.date)} CAT
            </p>
            <img
              className="detail-photo"
              src={event.image}
              alt={event.tag + " — illustrative event photography"}
            />
          </div>
          <aside>
            <p className="eyebrow">THE EXPERIENCE AT A GLANCE</p>
            <h2>{event.city}</h2>
            <p>{event.venue}</p>
            <div className="rule" />
            <p className="eyebrow">THE COUNTDOWN</p>
            <Countdown date={event.date} />
            <div className="rule" />
            <p className="eyebrow">DEMONSTRATION ADMISSION</p>
            <h2>{event.price ? "From $" + event.price : "Free entry"}</h2>
            {event.price > 0 && (
              <p>
                General Admission · $10
                <br />
                VIP · $25
              </p>
            )}
            <p className="notice">
              This is a test listing. No places can be reserved and no payments
              are collected in this design preview.
            </p>
            <Link className="button cyan" href="/contact">
              Ask about upcoming events ↗
            </Link>
            <Share />
          </aside>
        </div>
      </section>
      <section className="section light detail-body">
        <p className="eyebrow">ABOUT THIS EXPERIENCE</p>
        <h2>
          A moment to
          <br />
          <em>come together.</em>
        </h2>
        <p>{event.description}</p>
        <p>
          Organiser: Trade Sphere Events demonstration account. Dates use
          Africa/Harare (CAT, UTC+2).
        </p>
        <a
          className="text-link"
          href={
            "https://wa.me/263789229508?text=" +
            encodeURIComponent(
              "Hi Trade Sphere, I would like information about upcoming events. I saw the " +
                event.name +
                " demo.",
            )
          }
        >
          Contact Trade Sphere on WhatsApp ↗
        </a>
      </section>
      <section className="section light">
        <div className="section-heading">
          <h2>Keep exploring.</h2>
          <Link href="/events">All experiences ↗</Link>
        </div>
        <div className="event-grid">
          {events
            .filter((e) => e.slug !== slug)
            .slice(0, 3)
            .map((e) => (
              <EventCard key={e.slug} event={e} />
            ))}
        </div>
      </section>
    </>
  );
}
