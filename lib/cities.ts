import data from "@/data/cities.json";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://evbatteryhub.in";

export type Faq = { q: string; a: string };

export type City = {
  slug: string;
  name: string;
  state: string;
  published: boolean;
  updatedAt: string; // YYYY-MM-DD
  intro: string;
  localAreas: string[];
  marketContext: string;
  logistics: string;
  segments: string[];
  batteryTypes: string[];
  nearby: string[];
  faqs: Faq[];
};

const cities = data as City[];

/** Sirf published cities hi pages aur sitemap mein jaayengi */
export const getPublishedCities = (): City[] =>
  cities.filter((c) => c.published);

export const getCity = (slug: string): City | undefined =>
  getPublishedCities().find((c) => c.slug === slug);
