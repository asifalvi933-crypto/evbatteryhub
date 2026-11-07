import rawCities from "../data/cities.json";

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://evbatteryhub.in"
).replace(/\/+$/, "");
export const SITE_NAME = "EV Battery Hub India";

export type BatteryType = "LFP" | "NMC" | "Lead Acid";
export type Faq = { q: string; a: string };
export type LocalArea = { name: string; note: string };

export type City = {
  slug: string;
  name: string;
  state: string;
  published: boolean;
  updatedAt: string; // YYYY-MM-DD
  tagline: string;
  metaTitle: string;
  metaDescription: string;
  heroSummary: string;
  marketContext: string[];
  localAreas: LocalArea[];
  demandDrivers: string[];
  segments: string[];
  batteryTypes: BatteryType[];
  logistics: string;
  sellerTips: string[];
  nearby: string[];
  faqs: Faq[];
};

/** Slugs that would collide with real routes or files */
const RESERVED_SLUGS = new Set([
  "api", "blog", "cities", "sitemap", "sitemap.xml", "robots", "robots.txt",
  "favicon.ico", "_next", "admin", "contact", "about",
]);

const PLACEHOLDER = /\[REPLACE|lorem ipsum|TODO:/i;

function validate(list: City[]): City[] {
  const seen = new Set<string>();

  for (const c of list) {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(c.slug)) {
      throw new Error(`[cities.json] Invalid slug: "${c.slug}"`);
    }
    if (RESERVED_SLUGS.has(c.slug)) {
      throw new Error(`[cities.json] Reserved slug: "${c.slug}"`);
    }
    if (seen.has(c.slug)) {
      throw new Error(`[cities.json] Duplicate slug: "${c.slug}"`);
    }
    seen.add(c.slug);

    if (Number.isNaN(Date.parse(c.updatedAt))) {
      throw new Error(`[cities.json] Bad updatedAt for "${c.slug}"`);
    }
    if (c.published) {
      if (PLACEHOLDER.test(JSON.stringify(c))) {
        throw new Error(`[cities.json] Placeholder text found in "${c.slug}"`);
      }
      if (c.faqs.length < 3) {
        throw new Error(`[cities.json] "${c.slug}" needs at least 3 FAQs`);
      }
    }
  }

  for (const c of list) {
    for (const n of c.nearby) {
      if (!seen.has(n)) {
        throw new Error(`[cities.json] "${c.slug}" links to unknown city "${n}"`);
      }
    }
  }
  return list;
}

const ALL_CITIES: City[] = validate(rawCities as unknown as City[]);

/** Only published cities get pages and appear in the sitemap */
export const getPublishedCities = (): City[] =>
  ALL_CITIES.filter((c) => c.published);

export const getCity = (slug: string): City | undefined =>
  getPublishedCities().find((c) => c.slug === slug);

export const getCityUrl = (slug: string): string => `${SITE_URL}/${slug}`;

export const getNearbyCities = (city: City): City[] =>
  city.nearby
    .map((s) => getCity(s))
    .filter((c): c is City => c !== undefined);
