import Link from "next/link";
export default function NotFound() {
  return (
    <section className="section light page">
      <p className="eyebrow">404 · OUTSIDE THE SPHERE</p>
      <h1>
        Let’s get you
        <br />
        back to the moment.
      </h1>
      <Link className="button dark" href="/events">
        Discover events ↗
      </Link>
    </section>
  );
}
