"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Pause, Play } from "lucide-react";
import { events, dateLabel } from "@/lib/events";
export function Hero() {
  const [index, setIndex] = useState(0),
    [paused, setPaused] = useState(false),
    [hovered, setHovered] = useState(false),
    [focused, setFocused] = useState(false),
    [visible, setVisible] = useState(true),
    [reduced, setReduced] = useState(false),
    [tabActive, setTabActive] = useState(true);
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    const query = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener("change", update);
    const visibility = () => setTabActive(!document.hidden);
    document.addEventListener("visibilitychange", visibility);
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.1 },
    );
    if (root.current) observer.observe(root.current);
    return () => {
      query.removeEventListener("change", update);
      document.removeEventListener("visibilitychange", visibility);
      observer.disconnect();
    };
  }, []);
  const playing =
    !paused && !hovered && !focused && visible && !reduced && tabActive;
  useEffect(() => {
    if (!playing) return;
    const timer = setInterval(
      () => setIndex((i) => (i + 1) % events.length),
      6500,
    );
    return () => clearInterval(timer);
  }, [playing]);
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    let frame = 0;
    const render = () => {
      frame = 0;
      const box = el.getBoundingClientRect();
      el.style.setProperty(
        "--hero-exit",
        String(reduced ? 0 : Math.max(0, Math.min(1, -box.top / box.height))),
      );
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(render);
    };
    render();
    addEventListener("scroll", schedule, { passive: true });
    addEventListener("resize", schedule);
    return () => {
      removeEventListener("scroll", schedule);
      removeEventListener("resize", schedule);
      cancelAnimationFrame(frame);
    };
  }, [reduced]);
  const e = events[index];
  return (
    <section
      ref={root}
      className="photo-hero"
      aria-label="Trade Sphere journal featured experiences"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget))
          setFocused(false);
      }}
    >
      <div className="hero-slides" aria-hidden="true">
        {events.map((event, i) => (
          <img
            key={event.slug}
            src={event.image}
            className={index === i ? "hero-slide active" : "hero-slide"}
            alt=""
            fetchPriority={i === 0 ? "high" : "auto"}
          />
        ))}
      </div>
      <div className="hero-overlay" />
      <div className="hero-inner">
        <div className="photo-hero-copy">
          <p className="eyebrow">THE TRADE SPHERE JOURNAL</p>
          <h1>
            Great experiences.
            <br />
            <em>Even better stories.</em>
          </h1>
          <p>
            Discover what’s happening, find your people,
            <br />
            and make a little room for the unexpected.
          </p>
          <div className="photo-hero-actions">
            <Link className="button cyan" href="/events">
              Explore experiences <ArrowUpRight size={17} />
            </Link>
            <Link className="hero-read-link" href="/journal">
              Read the journal <ArrowUpRight size={17} />
            </Link>
          </div>
        </div>
        <div className="hero-bottom">
          <Link className="hero-current" href={"/events/" + e.slug}>
            <span>FEATURED EXPERIENCE · DEMO</span>
            <strong>
              {e.name} <ArrowUpRight size={18} />
            </strong>
            <small>
              {dateLabel(e.date)} · {e.city}
            </small>
          </Link>
          <div className="hero-playback">
            <div className="hero-dots" aria-label="Choose featured image">
              {events.map((event, i) => (
                <button
                  key={event.slug}
                  className={i === index ? "selected" : ""}
                  aria-label={"Show " + event.name}
                  aria-pressed={i === index}
                  onClick={() => setIndex(i)}
                />
              ))}
            </div>
            <button
              className="pause-slideshow"
              aria-label={
                paused
                  ? "Resume automatic slideshow"
                  : "Pause automatic slideshow"
              }
              onClick={() => setPaused((p) => !p)}
            >
              {paused ? <Play size={15} /> : <Pause size={15} />}
            </button>
            <span>{String(index + 1).padStart(2, "0")} / 04</span>
          </div>
        </div>
      </div>
      <span className="hero-paper-edge" aria-hidden="true" />
    </section>
  );
}
