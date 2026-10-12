"use client";
import { useEffect, useRef } from "react";
export function Reveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const setup = () => {
      el.dataset.motionReady = media.matches ? "false" : "true";
      if (media.matches) el.classList.add("is-visible");
    };
    setup();
    const observer = new IntersectionObserver(
      ([entry]) => {
        el.classList.toggle(
          "is-visible",
          entry.isIntersecting || media.matches,
        );
      },
      { threshold: 0.08, rootMargin: "0px 0px -25px 0px" },
    );
    observer.observe(el);
    media.addEventListener("change", setup);
    return () => {
      observer.disconnect();
      media.removeEventListener("change", setup);
    };
  }, []);
  return (
    <div className={"reveal " + className} ref={ref}>
      {children}
    </div>
  );
}
