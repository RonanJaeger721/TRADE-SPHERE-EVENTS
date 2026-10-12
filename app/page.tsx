import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { Hero } from "@/components/hero";
import { Reveal } from "@/components/reveal";
import { events, dateLabel } from "@/lib/events";
import { articles } from "@/lib/journal";
export const metadata = { title: "The journal — experiences, people & ideas" };
export default function Home() {
  return (
    <>
      <Hero />
      <Reveal>
        <section className="experience-row container">
          <div className="row-intro">
            <p className="eyebrow">FIND YOUR MOMENT</p>
            <h2>
              Experiences{" "}
              <em>worth exploring.</em>
            </h2>
            <p>Live music, fresh ideas and reasons to get out there.</p>
            <Link className="round-link" href="/events">
              <span>
                <ArrowRight size={16} />
              </span>
              Discover all experiences
            </Link>
          </div>
          <div className="experience-cards">
            {events.map((e) => (
              <Link
                className="experience-tile"
                href={"/events/" + e.slug}
                key={e.slug}
              >
                <img
                  src={e.image}
                  alt={e.tag + " — illustrative event photography"}
                  loading="lazy"
                />
                <div className="tile-shade" />
                <span className="tile-demo">DEMO</span>
                <div className="tile-caption">
                  <small>
                    {e.city} · {dateLabel(e.date)}
                  </small>
                  <h3>{e.name}</h3>
                  <ArrowUpRight size={20} />
                </div>
              </Link>
            ))}
          </div>
        </section>
      </Reveal>
      <div className="pale-band">
        <Reveal>
          <section className="reading-row container">
            <div className="row-intro">
              <p className="eyebrow">THE LATEST READS</p>
              <h2>
                Ideas for{" "}
                <em>your next chapter.</em>
              </h2>
              <p>
                A little inspiration. A few useful tips. Stories for people who
                show up.
              </p>
              <Link className="round-link" href="/journal">
                <span>
                  <ArrowRight size={16} />
                </span>
                Explore the journal
              </Link>
            </div>
            <div className="reading-cards">
              {articles.slice(0, 3).map((a) => (
                <Link
                  className="reading-card"
                  href={"/journal/" + a.slug}
                  key={a.slug}
                >
                  <div>
                    <img
                      src={a.image}
                      alt="Illustrative event photography"
                      loading="lazy"
                    />
                    <span>{a.category}</span>
                  </div>
                  <h3>{a.title}</h3>
                  <p>{a.summary}</p>
                  <small>
                    {a.readTime} <ArrowUpRight size={17} />
                  </small>
                </Link>
              ))}
            </div>
          </section>
        </Reveal>
      </div>
      <Reveal>
        <section className="wide-story">
          <img
            src="/culture.jpg"
            alt="Illustrative festival crowd"
            loading="lazy"
          />
          <div className="wide-story-overlay" />
          <div className="container">
            <p className="eyebrow">CONNECT · EXPERIENCE · CREATE MEMORIES</p>
            <h2>
              Some moments
              <br />
              are better <em>together.</em>
            </h2>
            <p>
              The room. The energy. The people.
              <br />
              Find a reason to be part of something.
            </p>
            <Link className="button cyan" href="/categories">
              Find your kind of experience <ArrowUpRight size={17} />
            </Link>
          </div>
        </section>
      </Reveal>
      <Reveal>
        <section className="hosting-row container">
          <div className="row-intro">
            <p className="eyebrow">BEHIND THE EXPERIENCE</p>
            <h2>
              For the{" "}
              <em>moment makers.</em>
            </h2>
            <p>
              Turn an idea into a gathering. Begin with a clear purpose and a
              thoughtful plan.
            </p>
            <Link className="round-link" href="/organisers">
              <span>
                <ArrowRight size={16} />
              </span>
              Explore hosting
            </Link>
          </div>
          <Link
            className="host-feature"
            href="/journal/from-an-idea-to-a-gathering"
          >
            <img
              src="/expo.jpg"
              alt="Illustrative conference gathering"
              loading="lazy"
            />
            <div>
              <small>THE ORGANISER’S NOTEBOOK</small>
              <h3>From an idea to a room full of people.</h3>
              <p>Start with the experience you want to create.</p>
              <span>
                Read the guide <ArrowUpRight size={18} />
              </span>
            </div>
          </Link>
          <aside className="contact-note">
            <span className="eyebrow">LET’S MAKE IT HAPPEN</span>
            <h3>
              Something{" "}
              in mind?
            </h3>
            <p>Tell Trade Sphere about the event you’re planning.</p>
            <Link href="/contact">
              Start a conversation <ArrowUpRight size={18} />
            </Link>
          </aside>
        </section>
      </Reveal>
      <div className="blue-band">
        <Reveal>
          <section className="about-journal container">
            <div className="image-pair">
              <img
                src="/network.jpg"
                alt="Illustrative social event setting"
                loading="lazy"
              />
              <img
                src="/concert.jpg"
                alt="Illustrative concert audience"
                loading="lazy"
              />
            </div>
            <div>
              <p className="eyebrow">WELCOME TO TRADE SPHERE</p>
              <h2>
                A space for
                <br />
                <em>people & possibilities.</em>
              </h2>
              <p>
                Discover experiences, connect with ideas and meet the people who
                bring them to life. Trade Sphere is being built around the
                moments worth remembering.
              </p>
              <Link className="button outline" href="/about">
                Get to know the sphere <ArrowUpRight size={17} />
              </Link>
            </div>
          </section>
        </Reveal>
      </div>
      <Reveal>
        <section className="journal-follow container">
          <div>
            <p className="eyebrow">KEEP THE CONVERSATION GOING</p>
            <h2>
              What’s your
              <br />
              <em>next story?</em>
            </h2>
          </div>
          <div>
            <p>
              Ask us about upcoming events, share your plans or find out how to
              hear about future editions.
            </p>
            <a
              className="button dark"
              href="https://wa.me/263789229508?text=Hi%20Trade%20Sphere%2C%20I%27d%20like%20to%20hear%20about%20upcoming%20events%20and%20the%20journal."
              target="_blank"
              rel="noopener noreferrer"
            >
              Talk to Trade Sphere <ArrowUpRight size={17} />
            </a>
            <small>Opens a conversation on WhatsApp.</small>
          </div>
        </section>
      </Reveal>
      <p className="home-demo-note container">
        Event listings, venues, dates and prices are demonstration content.
        Ticket sales are not open in this preview.
      </p>
    </>
  );
}
