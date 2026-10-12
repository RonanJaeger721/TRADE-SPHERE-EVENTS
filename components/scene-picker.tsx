"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { events } from "@/lib/events";
const moods = [
  "Feel the music",
  "Find your people",
  "Discover an idea",
  "Follow the culture",
];
export function ScenePicker() {
  const [index, setIndex] = useState(0);
  const e = events[index];
  return (
    <section className="scene-editorial">
      <div className="journal-section-line">
        <span>02 / A DIFFERENT POINT OF VIEW</span>
        <span>CHOOSE YOUR SCENE</span>
      </div>
      <div className="scene-layout">
        <div className="scene-photo" key={e.slug}>
          <img src={e.image} alt={e.tag + " — illustrative photography"} />
          <span className="scene-photo-label">{e.city} / DEMO EXPERIENCE</span>
          <span className="scene-photo-number">0{index + 1}</span>
        </div>
        <div className="scene-copy">
          <p className="eyebrow">SAME SPHERE. DIFFERENT ENERGY.</p>
          <h2>
            Change&nbsp;
            <br />
            the <span>scene.</span>
          </h2>
          <p>
            Some days call for a crowd.
            <br />
            Others start with a conversation.
            <br />
            What are you in the mood for?
          </p>
          <div className="scene-options" aria-label="Choose an experience mood">
            {moods.map((m, i) => (
              <button
                key={m}
                aria-pressed={index === i}
                onClick={() => setIndex(i)}
              >
                <span>0{i + 1}</span>
                {m}
                <ArrowUpRight size={19} />
              </button>
            ))}
          </div>
          <Link className="scene-result" href={"/events/" + e.slug}>
            <small>YOUR NEXT READ · DEMO</small>
            <span>
              {e.name}
              <ArrowUpRight size={22} />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
