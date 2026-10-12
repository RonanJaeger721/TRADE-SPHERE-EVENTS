export const categories = [
  "Concerts & Live Music",
  "Business & Networking",
  "Trade Shows & Exhibitions",
  "Festivals",
  "Conferences & Workshops",
  "Sports",
  "Arts & Culture",
  "Lifestyle & Entertainment",
  "Community Events",
];
export type EventRecord = {
  slug: string;
  name: string;
  category: string;
  city: string;
  venue: string;
  date: string;
  price: number;
  image: string;
  description: string;
  tag: string;
};
export const events: EventRecord[] = [
  {
    slug: "experience-night",
    name: "Trade Sphere Experience Night",
    category: categories[0],
    city: "Harare",
    venue: "Demonstration venue · to be confirmed",
    date: "2026-12-12T18:00:00+02:00",
    price: 10,
    image: "/concert.jpg",
    tag: "Live music",
    description:
      "An evening built around the energy of a live crowd. This representative test event demonstrates how music, ticket information and event discovery will come together on Trade Sphere. General Admission $10 and VIP $25 are demonstration prices only.",
  },
  {
    slug: "connections-after-hours",
    name: "Connections, after hours",
    category: categories[1],
    city: "Harare",
    venue: "Demonstration venue · to be confirmed",
    date: "2026-11-20T17:30:00+02:00",
    price: 0,
    image: "/network.jpg",
    tag: "New perspectives",
    description:
      "A representative networking experience for founders, creatives and curious minds. Explore the proposed event format and discover the platform’s event-detail experience. This is test content, not an announced event.",
  },
  {
    slug: "makers-and-markets",
    name: "Makers & markets",
    category: categories[2],
    city: "Bulawayo",
    venue: "Demonstration venue · to be confirmed",
    date: "2026-12-05T09:00:00+02:00",
    price: 0,
    image: "/expo.jpg",
    tag: "Discover something",
    description:
      "A demonstration trade exhibition bringing ideas, products and people into one space. The date and location are representative test data and are not a confirmed business announcement.",
  },
  {
    slug: "culture-in-motion",
    name: "Culture in motion",
    category: categories[6],
    city: "Victoria Falls",
    venue: "Demonstration venue · to be confirmed",
    date: "2027-01-16T14:00:00+02:00",
    price: 0,
    image: "/culture.jpg",
    tag: "A different rhythm",
    description:
      "A representative arts and culture gathering. This listing illustrates the category browsing and event discovery experience. No tickets are being sold for this test event.",
  },
];
export const dateLabel = (date: string) =>
  new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "Africa/Harare",
  }).format(new Date(date));
export const timeLabel = (date: string) =>
  new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Africa/Harare",
  }).format(new Date(date));
