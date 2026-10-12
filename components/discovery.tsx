"use client";
import { useState, useMemo } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { events, categories } from "@/lib/events";
import { EventCard } from "./event-card";
export function Discovery({
  initialCategory = "",
  initialQuery = "",
}: {
  initialCategory?: string;
  initialQuery?: string;
}) {
  const [query, setQuery] = useState(initialQuery),
    [category, setCategory] = useState(initialCategory),
    [city, setCity] = useState(""),
    [price, setPrice] = useState(""),
    [sort, setSort] = useState("date"),
    [period, setPeriod] = useState("");
  const filtered = useMemo(
    () =>
      events
        .filter(
          (e) =>
            (!query ||
              (e.name + " " + e.city + " " + e.category)
                .toLowerCase()
                .includes(query.toLowerCase())) &&
            (!category || e.category === category) &&
            (!city || e.city === city) &&
            (!price || (price === "free" ? e.price === 0 : e.price > 0)) &&
            (!period ||
              (period === "2026"
                ? e.date.startsWith("2026")
                : e.date.startsWith("2027"))),
        )
        .sort((a, b) =>
          sort === "price"
            ? a.price - b.price
            : sort === "name"
              ? a.name.localeCompare(b.name)
              : a.date.localeCompare(b.date),
        ),
    [query, category, city, price, sort, period],
  );
  return (
    <>
      <div className="search-field">
        <Search size={22} />
        <label className="sr-only" htmlFor="query">
          Search events
        </label>
        <input
          id="query"
          placeholder="An experience, a city, a new connection…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <div className="filters">
        <SlidersHorizontal size={18} />
        <label>
          Category
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All categories</option>
            {categories.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </label>
        <label>
          Location
          <select value={city} onChange={(e) => setCity(e.target.value)}>
            <option value="">All cities</option>
            {["Harare", "Bulawayo", "Victoria Falls"].map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </label>
        <label>
          Price
          <select value={price} onChange={(e) => setPrice(e.target.value)}>
            <option value="">Any price</option>
            <option value="free">Free</option>
            <option value="paid">Paid</option>
          </select>
        </label>
        <label>
          Date
          <select value={period} onChange={(e) => setPeriod(e.target.value)}>
            <option value="">All dates</option>
            <option value="2026">2026</option>
            <option value="2027">2027</option>
          </select>
        </label>
        <label>
          Sort
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="date">Soonest first</option>
            <option value="price">Lowest price</option>
            <option value="name">Event name</option>
          </select>
        </label>
        <button
          className="text-link"
          onClick={() => {
            setQuery("");
            setCategory("");
            setCity("");
            setPrice("");
            setPeriod("");
            setSort("date");
          }}
        >
          Reset filters
        </button>
      </div>
      <p className="result-count" aria-live="polite">
        {filtered.length} demonstration experience
        {filtered.length === 1 ? "" : "s"}
      </p>
      {filtered.length ? (
        <div className="event-grid">
          {filtered.map((e) => (
            <EventCard key={e.slug} event={e} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>A little quiet in this sphere.</h2>
          <p>Try another city or category, or reset your filters.</p>
        </div>
      )}
    </>
  );
}
