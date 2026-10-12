import Link from "next/link";
import { ArrowUpRight, ArrowDown } from "lucide-react";
import { Hero } from "@/components/hero";
import { ScenePicker } from "@/components/scene-picker";
import { events, dateLabel } from "@/lib/events";
export default function Home() {
  return (
    <>
      <Hero />
      <section className="agenda-journal">
        <div className="journal-section-line">
          <span>01 / THE AGENDA</span>
          <span>GOOD PLANS START HERE</span>
        </div>
        <div className="agenda-heading">
          <h2>
            Worth stepping
            <br />
            <span>out for.</span>
          </h2>
          <p>
            Live music. New conversations. Unexpected discoveries.
            <br />A few pages from the world of Trade Sphere.
          </p>
          <Link href="/events">
            Explore the directory <ArrowUpRight size={19} />
          </Link>
        </div>
        <div className="agenda-layout">
          <Link className="lead-story" href={"/events/" + events[0].slug}>
            <div className="lead-photo">
              <img
                src={events[0].image}
                alt="Illustrative live concert"
                loading="lazy"
              />
              <span>THE COVER EXPERIENCE / DEMO</span>
              <ArrowUpRight size={30} />
            </div>
            <div className="story-kicker">
              <span>{events[0].category}</span>
              <span>{dateLabel(events[0].date)}</span>
            </div>
            <h3>{events[0].name}</h3>
            <p>
              For the feeling you can’t download. A demonstration of the live
              music experiences coming to the sphere.
            </p>
          </Link>
          <div className="shortlist">
            <div className="shortlist-title">
              <h3>The shortlist.</h3>
              <span>
                03 READS <ArrowDown size={16} />
              </span>
            </div>
            {events.slice(1).map((e, i) => (
              <Link
                href={"/events/" + e.slug}
                className="shortlist-story"
                key={e.slug}
              >
                <span className="shortlist-number">0{i + 2}</span>
                <div>
                  <small>{e.category} · DEMO</small>
                  <h3>{e.name}</h3>
                  <p>
                    {dateLabel(e.date)} · {e.city}
                  </p>
                </div>
                <img src={e.image} alt="" loading="lazy" />
                <ArrowUpRight size={18} />
              </Link>
            ))}
            <div className="editors-note">
              <span className="eyebrow">A NOTE ON THIS EDITION</span>
              <p>
                These are representative experiences, not announced events.
                Dates, venues and prices are test content. Real listings will
                take their place before bookings open.
              </p>
            </div>
          </div>
        </div>
      </section>
      <ScenePicker />
      <section className="journal-letter">
        <div className="letter-margin">
          <span>03 / FROM THE SPHERE</span>
          <span>
            CONNECT
            <br />
            EXPERIENCE
            <br />
            CREATE MEMORIES
          </span>
        </div>
        <div className="letter-body">
          <p className="eyebrow">TO THE PEOPLE WHO SHOW UP</p>
          <h2>
            The best stories
            <br />
            start with
            <br />
            <span>“I was there.”</span>
          </h2>
          <p>
            You remember the room. The first song. The conversation you almost
            didn’t have. The unexpected idea that stayed with you on the way
            home.
          </p>
          <p>
            Trade Sphere is being built for those moments — and the people who
            make them happen.
          </p>
          <Link href="/about" className="journal-button">
            A little more about us <ArrowUpRight size={18} />
          </Link>
        </div>
        <div className="letter-photo">
          <img
            src="/culture.jpg"
            alt="Illustrative live experience with an audience"
            loading="lazy"
          />
          <span>BE PART OF THE STORY.</span>
        </div>
      </section>
      <section className="journal-noticeboard">
        <div>
          <span className="eyebrow">FOR THE MOMENT MAKERS</span>
          <h2>
            Got a story
            <br />
            worth <span>gathering for?</span>
          </h2>
          <p>Bring your event into the sphere. Tell us what you’re planning.</p>
          <Link href="/organisers" className="journal-button">
            Explore hosting <ArrowUpRight size={19} />
          </Link>
        </div>
        <div className="stay-in-loop">
          <span className="eyebrow">THE NEXT CHAPTER</span>
          <h3>
            Stay in
            <br />
            the loop.
          </h3>
          <p>
            Ask Trade Sphere about upcoming events and how to hear about the
            next edition.
          </p>
          <a
            href="https://wa.me/263789229508?text=Hi%20Trade%20Sphere%2C%20I%27d%20like%20to%20hear%20about%20upcoming%20events%20and%20future%20editions."
            target="_blank"
            rel="noopener noreferrer"
          >
            Ask about updates on WhatsApp <ArrowUpRight size={18} />
          </a>
          <small>Opens a conversation on WhatsApp.</small>
        </div>
      </section>
    </>
  );
}
