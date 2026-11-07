import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  SITE_NAME,
  SITE_URL,
  getCity,
  getCityUrl,
  getNearbyCities,
  getPublishedCities,
} from "../../lib/cities";

// Change these if your homepage uses different section IDs
const CALCULATOR_HREF = "/#home";
const LEAD_FORM_HREF = "/#lead-form";

// Slugs not in cities.json (or unpublished) return a clean 404
export const dynamicParams = false;

// Works on both Next.js 14 and 15
type Props = { params: Promise<{ city: string }> };

export function generateStaticParams() {
  return getPublishedCities().map((c) => ({ city: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city: slug } = await params;
  const city = getCity(slug);
  if (!city) return {};

  const url = getCityUrl(city.slug);

  return {
    title: { absolute: city.metaTitle },
    description: city.metaDescription,
    alternates: { canonical: url },
    robots: { index: true, follow: true },
    openGraph: {
      title: city.metaTitle,
      description: city.metaDescription,
      url,
      siteName: SITE_NAME,
      type: "website",
      locale: "en_IN",
    },
    twitter: {
      card: "summary",
      title: city.metaTitle,
      description: city.metaDescription,
    },
  };
}

export default async function CityPage({ params }: Props) {
  const { city: slug } = await params;
  const city = getCity(slug);
  if (!city) notFound();

  const url = getCityUrl(city.slug);
  const nearby = getNearbyCities(city);
  const updated = new Date(city.updatedAt).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: city.metaTitle,
        description: city.metaDescription,
        dateModified: city.updatedAt,
        inLanguage: "en-IN",
        isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL },
      },
      {
        "@type": "Service",
        name: `EV battery scrap valuation and buyer matching in ${city.name}`,
        serviceType: "Battery scrap valuation and recycler matching",
        areaServed: { "@type": "Place", name: `${city.name}, ${city.state}` },
        provider: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: city.name, item: url },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: city.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <nav className="text-sm text-slate-500" aria-label="Breadcrumb">
        <Link href="/" className="hover:underline">Home</Link>
        <span className="mx-1">/</span>
        <span aria-current="page">{city.name}</span>
      </nav>

      <h1 className="mt-3 text-3xl font-extrabold text-emerald-900 sm:text-4xl">
        EV Lithium-ion Battery Scrap, Purchase &amp; Recycling in {city.name}
      </h1>
      <p className="mt-4 text-lg text-slate-600">{city.heroSummary}</p>
      <p className="mt-2 text-xs text-slate-400">Last updated: {updated}</p>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          href={CALCULATOR_HREF}
          className="rounded-xl bg-emerald-900 px-5 py-3 font-semibold text-white transition hover:bg-emerald-800"
        >
          Calculate Scrap Value
        </Link>
        <Link
          href={LEAD_FORM_HREF}
          className="rounded-xl border-2 border-emerald-900 px-5 py-3 font-semibold text-emerald-900 transition hover:bg-emerald-50"
        >
          Get a Bulk Quote
        </Link>
      </div>

      <section className="mt-12">
        <h2 className="text-xl font-bold text-emerald-900">
          The battery scrap market in {city.name}
        </h2>
        {city.marketContext.map((p, i) => (
          <p key={i} className="mt-3 text-slate-700">{p}</p>
        ))}
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-bold text-emerald-900">
          Who sells batteries in {city.name}
        </h2>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-slate-700">
          {city.segments.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
        <h3 className="mt-6 font-semibold text-slate-800">Battery types we handle</h3>
        <div className="mt-2 flex flex-wrap gap-2">
          {city.batteryTypes.map((t) => (
            <span key={t} className="rounded-full bg-cyan-50 px-3 py-1 text-sm font-medium text-cyan-800">
              {t}
            </span>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-bold text-emerald-900">What drives supply here</h2>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-slate-700">
          {city.demandDrivers.map((d) => (
            <li key={d}>{d}</li>
          ))}
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-bold text-emerald-900">Areas we cover in and around {city.name}</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {city.localAreas.map((a) => (
            <div key={a.name} className="rounded-xl border border-emerald-100 p-4">
              <h3 className="font-semibold text-slate-800">{a.name}</h3>
              <p className="mt-1 text-sm text-slate-600">{a.note}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-bold text-emerald-900">Pickup &amp; logistics</h2>
        <p className="mt-3 text-slate-700">{city.logistics}</p>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-bold text-emerald-900">Tips before you sell</h2>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-slate-700">
          {city.sellerTips.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-bold text-emerald-900">How it works</h2>
        <ol className="mt-3 list-decimal space-y-1 pl-5 text-slate-700">
          <li>Check an indicative scrap value with our calculator.</li>
          <li>Submit your battery details and quantity through the form.</li>
          <li>We connect you with a buyer who can show their registration.</li>
          <li>The buyer inspects the lot, confirms the final price and arranges pickup.</li>
        </ol>
        <p className="mt-3 text-xs text-slate-500">
          Estimates are indicative only. Final price depends on inspection, battery
          State of Health and live market rates. Waste batteries should only be handed
          to registered or authorised recyclers and refurbishers under India&apos;s
          Battery Waste Management Rules.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-bold text-emerald-900">
          Frequently asked questions: {city.name}
        </h2>
        <div className="mt-3 space-y-4">
          {city.faqs.map((f) => (
            <div key={f.q} className="rounded-xl border border-emerald-100 p-4">
              <h3 className="font-semibold text-slate-800">{f.q}</h3>
              <p className="mt-1 text-slate-600">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      {nearby.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xl font-bold text-emerald-900">Nearby cities</h2>
          <div className="mt-3 flex flex-wrap gap-3">
            {nearby.map((n) => (
              <Link
                key={n.slug}
                href={`/${n.slug}`}
                className="rounded-lg bg-emerald-50 px-4 py-2 text-emerald-900 transition hover:bg-emerald-100"
              >
                EV battery scrap in {n.name}
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
