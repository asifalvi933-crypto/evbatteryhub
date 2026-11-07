import Link from "next/link";
import { getPublishedCities } from "../lib/cities";

export default function BrowseCities({
  heading = "Browse EV Battery Scrap & Recycling by City",
}: {
  heading?: string;
}) {
  const cities = getPublishedCities();
  if (cities.length === 0) return null;

  return (
    <section
      id="cities"
      aria-labelledby="browse-cities-heading"
      className="mx-auto max-w-7xl px-4 py-14"
    >
      <div className="mx-auto mb-8 max-w-2xl text-center">
        <h2
          id="browse-cities-heading"
          className="text-2xl font-extrabold text-emerald-900 sm:text-3xl"
        >
          {heading}
        </h2>
        <p className="mt-2 text-slate-500">
          Local market notes, pickup details and FAQs for each city we serve.
        </p>
      </div>

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cities.map((c) => (
          <li key={c.slug}>
            <Link
              href={`/${c.slug}`}
              className="group block h-full rounded-2xl border border-emerald-100 bg-white p-5 transition hover:-translate-y-1 hover:border-cyan-400 hover:shadow-lg"
            >
              <span className="text-xs font-semibold uppercase tracking-wide text-cyan-700">
                {c.state}
              </span>
              <h3 className="mt-1 text-lg font-bold text-emerald-900">
                EV battery scrap in {c.name}
              </h3>
              <p className="mt-2 text-sm text-slate-600">{c.tagline}</p>
              <span className="mt-4 inline-block text-sm font-semibold text-cyan-700 group-hover:underline">
                View city page →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
