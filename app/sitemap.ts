import type { MetadataRoute } from "next";
import { SITE_URL, getCityUrl, getPublishedCities } from "../lib/cities";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const cities = getPublishedCities();

  const latest = cities.reduce((max, c) => {
    const time = Date.parse(c.updatedAt);
    return isNaN(time) ? max : Math.max(max, time);
  }, 0);

  const staticEntry: MetadataRoute.Sitemap[number] = {
    url: SITE_URL,
    lastModified: latest ? new Date(latest) : new Date(),
    changeFrequency: "weekly",
    priority: 1.0,
  };

  const cityEntries: MetadataRoute.Sitemap = cities.map((c) => ({
    url: getCityUrl(c.slug),
    lastModified: !isNaN(Date.parse(c.updatedAt)) ? new Date(c.updatedAt) : new Date(),
    changeFrequency: "weekly" as const,
    priority: c.kind === "hub" ? 0.9 : 0.8,
  }));

  return [staticEntry, ...cityEntries];
}
