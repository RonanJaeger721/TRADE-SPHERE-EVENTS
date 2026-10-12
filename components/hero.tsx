"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Pause, Play } from "lucide-react";
import { events, dateLabel, timeLabel } from "@/lib/events";
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
      4000,
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
  useEffect(() => {
    const el = root.current;
    if (!el || reduced || !matchMedia("(pointer: fine)").matches) return;
    let frame = 0;
    let x = 0,
      y = 0;
    const render = () => {
      frame = 0;
      el.style.setProperty("--pointer-x", x.toFixed(3));
      el.style.setProperty("--pointer-y", y.toFixed(3));
    };
    const move = (event: PointerEvent) => {
      const box = el.getBoundingClientRect();
      x = Math.max(
        -1,
        Math.min(1, ((event.clientX - box.left) / box.width) * 2 - 1),
      );
      y = Math.max(
        -1,
        Math.min(1, ((event.clientY - box.top) / box.height) * 2 - 1),
      );
      if (!frame) frame = requestAnimationFrame(render);
    };
    const reset = () => {
      x = 0;
      y = 0;
      if (!frame) frame = requestAnimationFrame(render);
    };
    el.addEventListener("pointermove", move, { passive: true });
    el.addEventListener("pointerleave", reset);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", reset);
      cancelAnimationFrame(frame);
      el.style.setProperty("--pointer-x", "0");
      el.style.setProperty("--pointer-y", "0");
    };
  }, [reduced]);
  const e = events[index];
  return (
    <section
      ref={root}
      className="photo-hero"
      aria-label="Trade Sphere journal featured experiences"
      data-in-view={visible}
      data-playing={playing}
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
      <div className="hero-stage-light" aria-hidden="true">
        <i />
        <i />
        <i />
      </div>
      <div className="hero-inner">
        <div className="living-hero-main">
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
          <div
            className="pass-float"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <Link
              className="glass-pass"
              href={"/events/" + e.slug}
              aria-label={"Preview " + e.name}
            >
              <div className="pass-head">
                <span>
                  <i /> THE EXPERIENCE EDIT
                </span>
                <small>0{index + 1} / 04</small>
              </div>
              <div className="pass-photo">
                <img
                  key={e.slug}
                  src={e.image}
                  alt="Illustrative event photography"
                />
                <span>DEMO EXPERIENCE</span>
              </div>
              <div className="pass-content">
                <span className="pass-category">{e.category}</span>
                <h2 key={"name-" + e.slug}>{e.name}</h2>
                <div className="pass-details">
                  <div>
                    <small>WHEN</small>
                    <span>{dateLabel(e.date)}</span>
                    <span>{timeLabel(e.date)} CAT</span>
                  </div>
                  <div>
                    <small>WHERE</small>
                    <span>{e.city}</span>
                    <span>Demo venue</span>
                  </div>
                </div>
              </div>
              <div className="pass-action">
                <span>Step inside the experience</span>
                <span className="pass-arrow">
                  <ArrowUpRight size={21} />
                </span>
              </div>
            </Link>
            <span className="pass-caption">
              CONNECT. EXPERIENCE. CREATE MEMORIES.
            </span>
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
          <div
            className="hero-playback"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
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
