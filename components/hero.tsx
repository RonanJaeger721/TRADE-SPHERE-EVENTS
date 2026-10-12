"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, ArrowLeft, ArrowRight } from "lucide-react";
import { events, dateLabel } from "@/lib/events";
export function Hero() {
  const [index, setIndex] = useState(0);
  const event = events[index];
  return (
    <section className="hero">
      <div className="hero-copy">
        <p className="eyebrow">
          <span className="dot" /> A WORLD OF EXPERIENCES · ZIMBABWE
        </p>
        <h1>
          Where every event
          <br />
          becomes an
          <br />
          <em>experience.</em>
        </h1>
        <p className="hero-description">
          Discover the moments worth attending.
          <br />
          Find your people. Be part of something.
        </p>
        <div className="hero-actions">
          <Link className="button cyan" href="/events">
            Explore events <ArrowUpRight size={18} />
          </Link>
          <Link className="text-link" href="/organisers">
            Host an event <ArrowUpRight size={17} />
          </Link>
        </div>
        <div className="hero-foot">
          <span>01 — DISCOVER YOUR SPHERE</span>
          <span>SCROLL TO EXPLORE ↓</span>
        </div>
      </div>
      <div className="hero-stage">
        <div className="orbit orbit-one" />
        <div className="orbit orbit-two" />
        <div className="stage-caption">LIVE IN THE MOMENT.</div>
        <div className="stage-photo" key={event.slug}>
          <img
            src={event.image}
            alt={event.tag + " — illustrative event photography"}
          />
          <div className="photo-shade" />
          <span className="vertical-caption">
            CONNECT / EXPERIENCE / CREATE MEMORIES
          </span>
          <div className="stage-info">
            <span className="eyebrow">FEATURED EXPERIENCE · DEMO</span>
            <h2>{event.name}</h2>
            <p>
              {event.city} <span> / </span> {dateLabel(event.date)}
            </p>
            <Link href={"/events/" + event.slug}>
              Explore this experience <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
        <div className="stage-ticket">
          <span>
            YOUR NEXT
            <br />
            “I WAS THERE.”
          </span>
          <div className="ticket-lines" />
          <small>TRADE SPHERE EVENTS</small>
        </div>
        <div className="stage-controls">
          <span aria-live="polite">
            0{index + 1}
            <small> / 04</small>
          </span>
          <div>
            <button
              aria-label="Previous featured experience"
              onClick={() => setIndex((index + 3) % 4)}
            >
              <ArrowLeft size={20} />
            </button>
            <button
              aria-label="Next featured experience"
              onClick={() => setIndex((index + 1) % 4)}
            >
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
