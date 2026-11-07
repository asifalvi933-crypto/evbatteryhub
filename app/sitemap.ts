import type { MetadataRoute } from "next";
import { SITE_URL, getCityUrl, getPublishedCities } from "../lib/cities";

export default function sitemap(): MetadataRoute.Sitemap {
  const cities = getPublishedCities();

  // Use the newest content date instead of "now", so lastmod stays truthful
  const latest = cities.reduce(
    (max, c) => Math.max(max, Date.parse(c.updatedAt)),
    0
  );

  return [
    {
      url: SITE_URL,
      lastModified: latest ? new Date(latest) : undefined,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...cities.map((c) => ({
      url: getCityUrl(c.slug),
      lastModified: new Date(c.updatedAt),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
