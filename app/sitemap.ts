import type { MetadataRoute } from "next";
import { SITE_URL, getPublishedCities } from "../lib/cities";

export default function sitemap(): MetadataRoute.Sitemap {
  const home: MetadataRoute.Sitemap[number] = {
    url: SITE_URL,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 1,
  };

  const cityPages: MetadataRoute.Sitemap = getPublishedCities().map((c) => ({
    url: `${SITE_URL}/${c.slug}`,
    lastModified: new Date(c.updatedAt),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [home, ...cityPages];
}
