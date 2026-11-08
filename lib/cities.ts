import rawCities from "../data/cities.json";
import { SITE_URL } from "./site";
import type { BatteryType } from "./knowledge";

export { SITE_URL, SITE_NAME } from "./site";
export type { BatteryType } from "./knowledge";

export type Faq = { q: string; a: string };
export type LocalArea = { name: string; note: string; slug?: string };

export type City = {
  slug: string;
  name: string;
  state: string;
  kind: "hub" | "city" | "locality";
  parentSlug?: string;
  published: boolean;
  updatedAt: string; // YYYY-MM-DD, change ONLY when content really changes
  h1: string;
  metaTitle: string;
  metaDescription: string;
  tagline: string;
  heroSummary: string;
  keywords: { primary: string; price: string; buyer: string; recycling: string };
  marketContext: string[];
  industrialHubs: LocalArea[];
  dealerNetwork: string;
  logistics: string;
  chemistryFocus: Partial<Record<BatteryType, string>>;
  sellerTips: string[];
  nearby: string[];
  faqs: Faq[];
};

const RESERVED = new Set([
  "api", "blog", "cities", "sitemap", "sitemap.xml", "robots", "robots.txt",
  "favicon.ico", "_next", "admin", "contact", "about", "guides",
]);
const PLACEHOLDER = /\[REPLACE|lorem ipsum|TODO:/i;
const MIN_WORDS = 450;
const MAX_SIMILARITY = 0.25;

const tokens = (t: string) =>
  t.toLowerCase().replace(/[^a-z0-9\s]/g, " ").split(/\s+/).filter(Boolean);

function uniqueText(c: City): string {
  return [
    c.heroSummary,
    ...c.marketContext,
    ...c.industrialHubs.map((h) => `${h.name} ${h.note}`),
    c.dealerNetwork,
    c.logistics,
    ...Object.values(c.chemistryFocus),
    ...c.sellerTips,
    ...c.faqs.flatMap((f) => [f.q, f.a]),
  ].join(" ");
}

function shingles(words: string[], n = 4): Set<string> {
  const s = new Set<string>();
  for (let i = 0; i + n <= words.length; i++) s.add(words.slice(i, i + n).join(" "));
  return s;
}

function jaccard(a: Set<string>, b: Set<string>): number {
  let inter = 0;
  a.forEach((x) => { if (b.has(x)) inter++; });
  const union = a.size + b.size - inter;
  return union === 0 ? 0 : inter / union;
}

function validate(list: City[]): City[] {
  const slugs = new Set<string>();
  const titles = new Set<string>();
  const h1s = new Set<string>();
  const descs = new Set<string>();
  const questions = new Set<string>();

  for (const c of list) {
    const id = `[cities.json] "${c.slug}"`;
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(c.slug)) throw new Error(`${id}: invalid slug`);
    if (RESERVED.has(c.slug)) throw new Error(`${id}: reserved slug`);
    if (slugs.has(c.slug)) throw new Error(`${id}: duplicate slug`);
    slugs.add(c.slug);
    if (Number.isNaN(Date.parse(c.updatedAt))) throw new Error(`${id}: bad updatedAt`);
    if (!c.published) continue;

    if (PLACEHOLDER.test(JSON.stringify(c))) throw new Error(`${id}: placeholder text found`);
    if (!c.h1 || !c.metaTitle || !c.metaDescription) throw new Error(`${id}: missing h1/meta`);
    if (c.metaTitle.length > 65) throw new Error(`${id}: metaTitle > 65 chars`);
    if (c.metaDescription.length < 100 || c.metaDescription.length > 170)
      throw new Error(`${id}: metaDescription must be 100-170 chars`);
    if (titles.has(c.metaTitle)) throw new Error(`${id}: duplicate metaTitle`);
    if (h1s.has(c.h1)) throw new Error(`${id}: duplicate h1`);
    if (descs.has(c.metaDescription)) throw new Error(`${id}: duplicate metaDescription`);
    titles.add(c.metaTitle); h1s.add(c.h1); descs.add(c.metaDescription);

    if (Object.keys(c.chemistryFocus).length < 2) throw new Error(`${id}: need 2+ chemistries`);
    if (c.faqs.length < 4) throw new Error(`${id}: need at least 4 FAQs`);
    for (const f of c.faqs) {
      const q = f.q.toLowerCase();
      if (questions.has(q)) throw new Error(`${id}: duplicate FAQ question "${f.q}"`);
      questions.add(q);
    }
    const words = tokens(uniqueText(c)).length;
    if (words < MIN_WORDS) throw new Error(`${id}: only ${words} unique words (min ${MIN_WORDS})`);
  }

  for (const c of list) {
    for (const n of c.nearby) if (!slugs.has(n)) throw new Error(`[cities.json] "${c.slug}" links to unknown "${n}"`);
    if (c.parentSlug && !slugs.has(c.parentSlug)) throw new Error(`[cities.json] "${c.slug}" has unknown parent`);
  }

  // Cross-page similarity (published only)
  const pub = list.filter((c) => c.published).map((c) => ({ c, s: shingles(tokens(uniqueText(c))) }));
  for (let i = 0; i < pub.length; i++) {
    for (let j = i + 1; j < pub.length; j++) {
      const sim = jaccard(pub[i].s, pub[j].s);
      if (sim > MAX_SIMILARITY)
        throw new Error(
          `[cities.json] "${pub[i].c.slug}" and "${pub[j].c.slug}" are ${(sim * 100).toFixed(0)}% similar. Rewrite one.`
        );
    }
  }
  return list;
}

const ALL: City[] = validate(rawCities as unknown as City[]);

export const getPublishedCities = (): City[] => ALL.filter((c) => c.published);
export const getCity = (slug: string): City | undefined =>
  getPublishedCities().find((c) => c.slug === slug);
export const getCityUrl = (slug: string): string => `${SITE_URL}/${slug}`;
export const getNearbyCities = (city: City): City[] =>
  city.nearby.map((s) => getCity(s)).filter((c): c is City => c !== undefined);
