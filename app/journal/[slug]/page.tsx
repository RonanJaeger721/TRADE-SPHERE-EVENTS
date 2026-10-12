import Link from "next/link";
import { notFound } from "next/navigation";
import { articles } from "@/lib/journal";
import { Reveal } from "@/components/reveal";
export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return {
    title: articles.find((a) => a.slug === slug)?.title || "Article not found",
  };
}
export default async function Article({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) notFound();
  return (
    <article className="journal-article">
      <div className="article-heading container">
        <Link className="text-link" href="/journal">
          ← Back to the journal
        </Link>
        <p className="eyebrow">
          {article.category} · {article.readTime}
        </p>
        <h1>{article.title}</h1>
        <p className="intro">{article.summary}</p>
      </div>
      <img
        className="article-cover"
        src={article.image}
        alt="Illustrative event photography"
      />
      <div className="article-body">
        {article.sections.map((section) => (
          <Reveal key={section.heading}>
            <section>
              <h2>{section.heading}</h2>
              <p>{section.body}</p>
            </section>
          </Reveal>
        ))}
        <div className="article-next">
          <p className="eyebrow">PUT THE IDEAS INTO PRACTICE</p>
          <Link className="button dark" href="/events">
            Explore experiences ↗
          </Link>
          <Link className="text-link" href="/journal">
            More from the journal ↗
          </Link>
        </div>
      </div>
    </article>
  );
}
