import Link from "next/link";
import { notFound } from "next/navigation";
import { categories } from "@/lib/events";
import { Discovery } from "@/components/discovery";
const pages: Record<string, { title: string; kicker: string; body: string }> = {
  about: {
    title: "People. Places. Possibilities.",
    kicker: "OUR SPHERE",
    body: "Trade Sphere Events is being developed as a place to discover events and connect with experiences across Zimbabwe. Our brand is built around a simple idea: connect, experience and create memories. This first design milestone introduces the public experience; event management and ticketing will follow in dedicated development stages.",
  },
  organisers: {
    title: "Make your next event matter.",
    kicker: "THE ORGANISER SPHERE",
    body: "Bring your concert, exhibition, workshop or community gathering to Trade Sphere. The upcoming organiser workspace is planned to support event listings, ticket categories, bookings and entrance management. Account registration is not open in this foundation preview. Speak to us about your event using the contact below.",
  },
  contact: {
    title: "Start a connection.",
    kicker: "LET’S TALK",
    body: "Planning an event, looking for an experience or interested in working with Trade Sphere? Contact us by phone or continue the conversation on WhatsApp.",
  },
  advertise: {
    title: "Put your experience in the spotlight.",
    kicker: "REACH YOUR AUDIENCE",
    body: "Featured event placements are planned for the Trade Sphere marketplace. Placement availability, campaign dates and commercial terms will be confirmed directly. No advertising package or audience reach is guaranteed in this preview.",
  },
  terms: {
    title: "Terms & conditions.",
    kicker: "POLICY PREVIEW",
    body: "The platform’s full terms require approval before bookings open. This release is a design demonstration and does not offer event admission, collect payments or form a ticket purchase agreement. Event listings, dates, venues and prices shown are demonstration data. Contact Trade Sphere for confirmed information.",
  },
  privacy: {
    title: "Your privacy matters.",
    kicker: "POLICY PREVIEW",
    body: "This foundation preview does not provide account registration or collect checkout details. A complete privacy policy covering customer accounts, payment providers, retention and data rights must be approved before those features launch. Following a WhatsApp link takes you to an external service with its own privacy terms.",
  },
  refunds: {
    title: "Clear expectations. Better experiences.",
    kicker: "REFUND POLICY PREVIEW",
    body: "No tickets are sold in this design preview. A client-approved refund policy will be published before checkout launches, including event cancellation, eligibility, provider fees, processing times and the party responsible for refunds. Contact Trade Sphere for any confirmed event enquiries.",
  },
};
const deferred = [
  "organiser/register",
  "organiser/login",
  "admin/login",
  "organiser/dashboard",
  "admin/dashboard",
  "organiser/check-in",
  "checkout",
  "my-tickets",
  "my-account",
];
export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ path: string[] }>;
  searchParams: Promise<{ q?: string }>;
}) {
  const { path } = await params;
  const key = path.join("/");
  if (key === "categories")
    return (
      <section className="section light page">
        <p className="eyebrow">FOLLOW YOUR CURIOSITY</p>
        <h1>
          There’s a sphere
          <br />
          <em>for everyone.</em>
        </h1>
        <div className="category-list">
          {categories.map((c, i) => (
            <Link key={c} href={"/events?category=" + encodeURIComponent(c)}>
              <span>0{i + 1}</span>
              <h2>{c}</h2>
              <span>↗</span>
            </Link>
          ))}
        </div>
      </section>
    );
  if (key === "search") {
    const { q } = await searchParams;
    return (
      <section className="section light page">
        <h1>Explore your sphere.</h1>
        <Discovery initialQuery={q} />
      </section>
    );
  }
  if (key === "faq")
    return (
      <section className="section light page narrow">
        <p className="eyebrow">A FEW THINGS TO KNOW</p>
        <h1>
          Your questions.
          <br />
          <em>Answered.</em>
        </h1>
        {[
          [
            "Can I buy tickets now?",
            "Not yet. This is Milestone 1, a design and architecture preview. All events and prices are test content.",
          ],
          [
            "How do I list an event?",
            "Contact Trade Sphere on WhatsApp to discuss your event. Organiser accounts and event management are planned for Milestone 2.",
          ],
          [
            "What timezone is used?",
            "Event dates are shown in Africa/Harare, Central Africa Time (UTC+2).",
          ],
          [
            "Are these real events?",
            "No. Every listing in this preview is clearly identified as a demonstration event. Confirmed listings will replace them before ticket sales open.",
          ],
          [
            "How can I contact Trade Sphere?",
            "Call +263 78 922 9508 or use the WhatsApp link on our Contact page.",
          ],
        ].map(([q, a]) => (
          <details key={q}>
            <summary>{q}</summary>
            <p>{a}</p>
          </details>
        ))}
        <Link className="button dark" href="/contact">
          Talk to Trade Sphere ↗
        </Link>
      </section>
    );
  if (deferred.includes(key) || path[0] === "booking")
    return (
      <section className="section light page narrow">
        <p className="eyebrow">APPLICATION FOUNDATION</p>
        <h1>
          This part of the sphere
          <br />
          <em>is taking shape.</em>
        </h1>
        <p className="intro">
          {key.includes("admin")
            ? "Secure administration"
            : key.includes("organiser")
              ? "Organiser accounts and management"
              : "Customer booking and ticketing"}{" "}
          will be implemented in the next development milestones. This preview
          does not accept credentials, reservations or payments.
        </p>
        <Link className="button dark" href="/events">
          Explore the demonstration directory ↗
        </Link>
      </section>
    );
  const p = pages[key];
  if (!p) notFound();
  return (
    <section className="section light page info-page">
      <p className="eyebrow">{p.kicker}</p>
      <h1>{p.title}</h1>
      <div className="info-columns">
        <img
          src={key === "about" ? "/brand-logo.jpeg" : "/network.jpg"}
          alt={
            key === "about"
              ? "Official Trade Sphere Events logo"
              : "Illustrative event space"
          }
        />
        <div>
          <p className="intro">{p.body}</p>
          {["contact", "organisers", "advertise"].includes(key) ? (
            <>
              <a className="contact-number" href="tel:+263789229508">
                +263 78 922 9508
              </a>
              <a
                className="button dark"
                href={
                  "https://wa.me/263789229508?text=" +
                  encodeURIComponent(
                    "Hi Trade Sphere Events, I would like to discuss " +
                      (key === "organisers"
                        ? "hosting an event"
                        : key === "advertise"
                          ? "event advertising"
                          : "an event enquiry") +
                      ".",
                  )
                }
                target="_blank"
                rel="noopener noreferrer"
              >
                Continue on WhatsApp ↗
              </a>
              <p className="demo-note">
                Opens WhatsApp. Your message is sent when you choose to send it.
              </p>
            </>
          ) : (
            <Link className="button dark" href="/contact">
              Contact Trade Sphere ↗
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
