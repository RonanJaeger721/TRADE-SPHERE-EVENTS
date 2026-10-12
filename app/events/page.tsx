import { Discovery } from "@/components/discovery";
export const metadata = { title: "Discover events" };
export default async function Events({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; q?: string }>;
}) {
  const params = await searchParams;
  return (
    <section className="section light page">
      <p className="eyebrow">FIND YOUR PEOPLE. FIND YOUR MOMENT.</p>
      <h1>
        Your next
        <br />
        <em>“I was there.”</em>
      </h1>
      <p className="intro">
        Explore the demonstration directory. Every listing is test content;
        bookings are not yet available.
      </p>
      <Discovery initialCategory={params.category} initialQuery={params.q} />
    </section>
  );
}
