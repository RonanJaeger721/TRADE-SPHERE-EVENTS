"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, ArrowLeft, ArrowRight } from "lucide-react";
import { events, dateLabel } from "@/lib/events";
export function Hero() {
  const [index, setIndex] = useState(0);
  const root = useRef<HTMLElement>(null);
  const event = events[index];
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    const render = () => {
      frame = 0;
      const box = el.getBoundingClientRect();
      const travel = Math.max(1, el.offsetHeight - innerHeight);
      const progress = reduced.matches
        ? 0
        : Math.max(0, Math.min(1, -box.top / travel));
      el.style.setProperty("--cover-progress", String(progress));
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(render);
    };
    render();
    addEventListener("scroll", schedule, { passive: true });
    addEventListener("resize", schedule);
    reduced.addEventListener("change", schedule);
    return () => {
      removeEventListener("scroll", schedule);
      removeEventListener("resize", schedule);
      reduced.removeEventListener("change", schedule);
      cancelAnimationFrame(frame);
    };
  }, []);
  return (
    <>
      <div className="journal-masthead">
        <div className="issue-line">
          <span>ZIMBABWE / THE EXPERIENCE JOURNAL</span>
          <span>ISSUE 001 — DESIGN EDITION</span>
        </div>
        <div className="masthead-title">
          <span>TRADE</span>
          <span>
            SPHERE
            <span className="masthead-star" aria-hidden="true">
              ✳
            </span>
          </span>
        </div>
        <div className="masthead-bottom">
          <span>Connect. Experience. Create memories.</span>
          <span>GOOD PEOPLE. GREAT PLACES. STORIES WORTH LIVING.</span>
        </div>
      </div>
      <section
        className="cover-story"
        ref={root}
        aria-label="Featured experience cover"
      >
        <div className="cover-sticky">
          <div className="cover-canvas">
            <div className="cover-media" key={event.slug}>
              <img
                src={event.image}
                alt={event.tag + " — illustrative event photography"}
              />
            </div>
            <div className="cover-scrim" />
            <div className="cover-cutout">
              <p className="eyebrow">THE ART OF SHOWING UP</p>
              <h1>
                Life happens
                <br />
                outside&nbsp;
                <br />
                <span>your feed.</span>
              </h1>
              <p>
                A journal of experiences, connections
                <br />
                and reasons to get out there.
              </p>
              <Link href="/events" className="journal-button">
                Find your next moment <ArrowUpRight size={19} />
              </Link>
              <span className="cutout-corner" aria-hidden="true" />
            </div>
            <div className="cover-rail">
              <span className="eyebrow">ALSO IN THE SPHERE</span>
              {events
                .filter((e) => e.slug !== event.slug)
                .slice(0, 2)
                .map((e) => (
                  <Link href={"/events/" + e.slug} key={e.slug}>
                    <img src={e.image} alt="" />
                    <div>
                      <small>DEMO EXPERIENCE</small>
                      <span>{e.name}</span>
                    </div>
                    <ArrowUpRight size={18} />
                  </Link>
                ))}
            </div>
            <div className="cover-feature" key={"text-" + event.slug}>
              <p className="eyebrow">ON THE COVER / {event.tag} / DEMO</p>
              <h2>{event.name}</h2>
              <p className="cover-date">
                {dateLabel(event.date)} <span>—</span> {event.city}
              </p>
              <Link href={"/events/" + event.slug}>
                Read the event brief <ArrowUpRight size={19} />
              </Link>
            </div>
            <div className="cover-controls">
              <span aria-live="polite">
                0{index + 1}
                <small>/ 04</small>
              </span>
              <div>
                <button
                  aria-label="Previous featured experience"
                  onClick={() =>
                    setIndex((index + events.length - 1) % events.length)
                  }
                >
                  <ArrowLeft size={20} />
                </button>
                <button
                  aria-label="Next featured experience"
                  onClick={() => setIndex((index + 1) % events.length)}
                >
                  <ArrowRight size={20} />
                </button>
              </div>
            </div>
            <div className="cover-seal" aria-hidden="true">
              <span>LESS SCROLLING.</span>
              <strong>
                MORE
                <br />
                LIVING.
              </strong>
              <span>TRADE SPHERE EVENTS</span>
            </div>
          </div>
          <div className="cover-scroll-note">
            <span>SCROLL TO TURN THE PAGE</span>
            <span>↓</span>
            <span>
              ALL EXPERIENCES IN THIS EDITION ARE DEMONSTRATION LISTINGS
            </span>
          </div>
        </div>
      </section>
    </>
  );
}
