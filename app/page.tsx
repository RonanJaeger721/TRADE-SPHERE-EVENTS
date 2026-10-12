import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Hero } from "@/components/hero";
import { EventCard } from "@/components/event-card";
import { events } from "@/lib/events";
export default function Home() {
  return (
    <>
      <Hero />
      <div className="ticker">
        <span>LIVE MUSIC</span>
        <i>✦</i>
        <span>NEW CONNECTIONS</span>
        <i>✦</i>
        <span>BIG IDEAS</span>
        <i>✦</i>
        <span>UNFORGETTABLE MOMENTS</span>
      </div>
      <section className="section light">
        <div className="section-heading">
          <div>
            <p className="eyebrow">THE DISCOVERY EDIT</p>
            <h2>
              Make room for
              <br />
              <em>something memorable.</em>
            </h2>
          </div>
          <div>
            <p>
              From the first beat to the next big idea.
              <br />
              Explore what your world could look like.
            </p>
            <Link className="text-link" href="/events">
              Discover all events <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
        <div className="event-grid">
          {events.slice(0, 3).map((event) => (
            <EventCard key={event.slug} event={event} />
          ))}
        </div>
        <p className="demo-note">
          A taste of the platform. These illustrative events, venues and prices
          are test content.
        </p>
      </section>
      <section className="manifesto">
        <span className="eyebrow">MORE THAN A PLACE ON YOUR CALENDAR</span>
        <h2>
          The room.
          <br />
          The energy.
          <br />
          <em>The people.</em>
        </h2>
        <div>
          <p>
            Some moments are better when you’re there. Trade Sphere brings
            discovery and connection into one space — for the people who show
            up, and the people who make it happen.
          </p>
          <Link className="button outline" href="/about">
            Meet Trade Sphere <ArrowUpRight size={18} />
          </Link>
        </div>
        <span className="manifesto-number">TS / 02</span>
      </section>
      <section className="host-section">
        <div>
          <p className="eyebrow">FOR THE MOMENT MAKERS</p>
          <h2>
            You create the experience.
            <br />
            <em>Let’s bring people to it.</em>
          </h2>
          <p>
            Concert, conference or a community gathering — tell us what you’re
            planning and explore hosting with Trade Sphere.
          </p>
          <Link className="button dark" href="/organisers">
            Enter the organiser sphere <ArrowUpRight size={18} />
          </Link>
        </div>
        <img
          src="/network.jpg"
          alt="Illustrative gathering in an event space"
          loading="lazy"
        />
      </section>
    </>
  );
}
