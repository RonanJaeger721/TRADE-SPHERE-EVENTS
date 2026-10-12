"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
export function Shell({ children }: { children: React.ReactNode }) {
  const isHome = usePathname() === "/";
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    let previous = window.scrollY;
    const onScroll = () => {
      const current = window.scrollY;
      if (Math.abs(current - previous) < 10 && current > 180) return;
      setHidden(current > 180 && current > previous);
      previous = current;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <div className="demo-bar">
        DESIGN PREVIEW{" "}
        <span>
          All event listings are demonstration content. Ticket sales are not
          open.
        </span>
      </div>
      <header
        className={`site-header${isHome ? " home-glass-header" : ""}${hidden && !open ? " header-hidden" : ""}`}
      >
        <Link href="/" aria-label="Trade Sphere Events home" className="brand">
          <img src="/brand-logo.jpeg" alt="Trade Sphere Events official logo" />
          <span>
            TRADE SPHERE<small>EVENTS</small>
          </span>
        </Link>
        <nav className={open ? "nav open" : "nav"} aria-label="Main navigation">
          <Link href="/events" onClick={() => setOpen(false)}>
            Discover events
          </Link>
          <Link href="/journal" onClick={() => setOpen(false)}>
            The journal
          </Link>
          <Link href="/categories" onClick={() => setOpen(false)}>
            Categories
          </Link>
          <Link href="/about" onClick={() => setOpen(false)}>
            Our sphere
          </Link>
          <Link href="/contact" onClick={() => setOpen(false)}>
            Contact
          </Link>
          <Link
            className="nav-cta"
            href="/organisers"
            onClick={() => setOpen(false)}
          >
            Host an event <ArrowUpRight size={16} />
          </Link>
        </nav>
        <button
          className="menu"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </header>
      <main id="main">{children}</main>
      <footer>
        <div className="footer-top">
          <div>
            <p className="eyebrow">CONNECT · EXPERIENCE · CREATE MEMORIES</p>
            <h2>
              See you in
              <br />
              <em>the sphere.</em>
            </h2>
          </div>
          <Link className="button cyan" href="/events">
            Find your next experience <ArrowUpRight size={18} />
          </Link>
        </div>
        <div className="footer-links">
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/faq">FAQs</Link>
          <Link href="/advertise">Advertise</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/refunds">Refunds</Link>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Trade Sphere Events</span>
          <a
            href="https://wa.me/263789937251"
            target="_blank"
            rel="noopener noreferrer"
          >
            Designed & Developed by Jaeger Media ↗
          </a>
        </div>
      </footer>
    </>
  );
}
