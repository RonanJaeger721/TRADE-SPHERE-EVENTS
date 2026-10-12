import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { articles } from "@/lib/journal";
import { Reveal } from "@/components/reveal";
export const metadata = { title: "The journal" };
export default function Journal() {
  return (
    <section className="journal-index container">
      <p className="eyebrow">EXPERIENCES · PEOPLE · IDEAS</p>
      <h1>
        The Trade Sphere <em>journal.</em>
      </h1>
      <p className="intro">
        Guides, thoughtful ideas and a little inspiration for your next
        experience.
      </p>
      <div className="journal-posts">
        {articles.map((a) => (
          <Reveal key={a.slug}>
            <Link className="reading-card" href={"/journal/" + a.slug}>
              <div>
                <img src={a.image} alt="Illustrative event photography" />
                <span>{a.category}</span>
              </div>
              <h2>{a.title}</h2>
              <p>{a.summary}</p>
              <small>
                {a.readTime}
                <ArrowUpRight size={17} />
              </small>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
