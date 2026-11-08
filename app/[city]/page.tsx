import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  CALCULATOR_HREF,
  LEAD_FORM_HREF,
  SITE_NAME,
  SITE_URL,
  whatsAppLink,
} from "../../lib/site";
import {
  getCity,
  getCityUrl,
  getNearbyCities,
  getPublishedCities,
  type BatteryType,
} from "../../lib/cities";
import { CHEMISTRY, COMMON_CHECKS, COMPLIANCE } from "../../lib/knowledge";

export const dynamicParams = false;

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
    twitter: { card: "summary", title: city.metaTitle, description: city.metaDescription },
  };
}

const KIND_LABEL = { hub: "Regional hub", city: "City page", locality: "Locality page" } as const;

export default async function CityPage({ params }: Props) {
  const { city: slug } = await params;
  const city = getCity(slug);
  if (!city) notFound();

  const url = getCityUrl(city.slug);
  const nearby = getNearbyCities(city);
  const parent = city.parentSlug ? getCity(city.parentSlug) : undefined;
  const chems = Object.keys(city.chemistryFocus) as BatteryType[];
  const checks = COMMON_CHECKS.filter((c) => c.appliesTo.some((t) => chems.includes(t)));
  const updated = new Date(city.updatedAt).toLocaleDateString("en-IN", {
    day: "numeric", month: "long", year: "numeric", timeZone: "UTC",
  });

  const wa = whatsAppLink(
    `Hi ${SITE_NAME}, I want a scrap price for my old battery in ${city.name}. Chemistry: ... Voltage/Ah: ... Quantity: ...`
  );

  const crumbs = [
    { name: "Home", item: SITE_URL },
    ...(parent ? [{ name: parent.name, item: getCityUrl(parent.slug) }] : []),
    { name: city.name, item: url },
  ];

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
        name: `Battery scrap valuation and buyer matching in ${city.name}`,
        serviceType: "Battery scrap valuation and recycler matching",
        areaServed: { "@type": "Place", name: `${city.name}, ${city.state}` },
        provider: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: crumbs.map((c, i) => ({
          "@type": "ListItem", position: i + 1, name: c.name, item: c.item,
        })),
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

  const Cta = ({ className = "" }: { className?: string }) => (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      <Link href={CALCULATOR_HREF}
        className="rounded-xl bg-emerald-900 px-5 py-3 font-semibold text-white transition hover:bg-emerald-800">
        Calculate Scrap Price
      </Link>
      <Link href={LEAD_FORM_HREF}
        className="rounded-xl bg-cyan-500 px-5 py-3 font-semibold text-white transition hover:bg-cyan-600">
        Get Bulk Price
      </Link>
      {wa && (
        <a href={wa} target="_blank" rel="noopener noreferrer"
          className="rounded-xl border-2 border-green-600 px-5 py-3 font-semibold text-green-700 transition hover:bg-green-50">
          WhatsApp Us
        </a>
      )}
    </div>
  );

  return (
    <main className="mx-auto max-w-4xl px-4 py-10 pb-28 sm:pb-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      <nav className="text-sm text-slate-500" aria-label="Breadcrumb">
        <Link href="/" className="hover:underline">Home</Link>
        {parent && (<><span className="mx-1">/</span>
          <Link href={`/${parent.slug}`} className="hover:underline">{parent.name}</Link></>)}
        <span className="mx-1">/</span>
        <span aria-current="page">{city.name}</span>
      </nav>

      <span className="mt-4 inline-block rounded-full bg-cyan-50 px-3 py-1 text-xs font-semibold text-cyan-800">
        {KIND_LABEL[city.kind]} · {city.state}
      </span>
      <h1 className="mt-3 text-3xl font-extrabold leading-tight text-emerald-900 sm:text-4xl">{city.h1}</h1>
      <p className="mt-4 text-lg text-slate-600">{city.heroSummary}</p>
      <p className="mt-2 text-xs text-slate-400">Last updated: {updated}</p>
      <Cta className="mt-6" />

      {/* Price factors */}
      <section className="mt-12">
        <h2 className="text-xl font-bold text-emerald-900">{city.keywords.price}: what decides the rate</h2>
        <p className="mt-3 text-slate-700">
          Scrap is priced differently for each chemistry. Lead-acid is usually bought by weight and follows lead
          rates, while lithium-ion packs are priced on chemistry, pack format, state of health and metal markets.
          That is why we do not publish one flat figure for {city.name}. Use the calculator for an indicative
          number, then compare written quotes from authorised buyers.
        </p>
      </section>

      {/* Local market */}
      <section className="mt-12">
        <h2 className="text-xl font-bold text-emerald-900">The battery scrap market in {city.name}</h2>
        {city.marketContext.map((p, i) => (
          <p key={i} className="mt-3 text-slate-700">{p}</p>
        ))}
      </section>

      {/* Areas */}
      <section className="mt-12">
        <h2 className="text-xl font-bold text-emerald-900">Industrial areas and neighbourhoods we cover</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {city.industrialHubs.map((a) => {
            const linked = a.slug ? getCity(a.slug) : undefined;
            return (
              <div key={a.name} className="rounded-xl border border-emerald-100 p-4">
                <h3 className="font-semibold text-slate-800">
                  {linked ? (
                    <Link href={`/${linked.slug}`} className="text-cyan-700 hover:underline">{a.name}</Link>
                  ) : a.name}
                </h3>
                <p className="mt-1 text-sm text-slate-600">{a.note}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Chemistry */}
      <section className="mt-12">
        <h2 className="text-xl font-bold text-emerald-900">
          {city.keywords.recycling}: chemistry-wise factors
        </h2>
        <div className="mt-4 space-y-4">
          {chems.map((t) => {
            const f = CHEMISTRY[t];
            return (
              <article key={t} className="rounded-2xl border border-emerald-100 p-5">
                <h3 className="font-bold text-emerald-900">{f.label}</h3>
                <p className="mt-2 text-slate-700">{city.chemistryFocus[t]}</p>
                <dl className="mt-3 space-y-2 text-sm text-slate-600">
                  <div><dt className="font-semibold text-slate-800">How to identify it</dt><dd>{f.identify}</dd></div>
                  <div><dt className="font-semibold text-slate-800">Weight</dt><dd>{f.weight}</dd></div>
                  <div><dt className="font-semibold text-slate-800">Where the value comes from</dt><dd>{f.value}</dd></div>
                  <div><dt className="font-semibold text-slate-800">Safe handling</dt><dd>{f.handling}</dd></div>
                </dl>
              </article>
            );
          })}
        </div>
      </section>

      {/* Buyers */}
      <section className="mt-12">
        <h2 className="text-xl font-bold text-emerald-900">Finding an {city.keywords.buyer}</h2>
        <p className="mt-3 text-slate-700">{city.dealerNetwork}</p>
      </section>

      {/* Logistics */}
      <section className="mt-12">
        <h2 className="text-xl font-bold text-emerald-900">Pickup and logistics in {city.name}</h2>
        <p className="mt-3 text-slate-700">{city.logistics}</p>
      </section>

      {/* Seller checklist */}
      <section className="mt-12">
        <h2 className="text-xl font-bold text-emerald-900">Before you ask for a quote</h2>
        <ul className="mt-3 space-y-3">
          {checks.map((c) => (
            <li key={c.title} className="rounded-xl bg-emerald-50 p-4 text-sm text-slate-700">
              <b className="text-emerald-900">{c.title}.</b> {c.text}
            </li>
          ))}
        </ul>
        <h3 className="mt-6 font-semibold text-slate-800">Tips specific to {city.name}</h3>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-700">
          {city.sellerTips.map((t) => <li key={t}>{t}</li>)}
        </ul>
      </section>

      {/* Compliance */}
      <section className="mt-12 rounded-2xl border-2 border-cyan-200 bg-cyan-50 p-5">
        <h2 className="text-lg font-bold text-emerald-900">{COMPLIANCE.title}</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-700">
          {COMPLIANCE.points.map((p) => <li key={p}>{p}</li>)}
        </ul>
      </section>

      {/* How it works */}
      <section className="mt-12">
        <h2 className="text-xl font-bold text-emerald-900">
          Sell old battery online in India from {city.name}: how it works
        </h2>
        <ol className="mt-3 list-decimal space-y-1 pl-5 text-slate-700">
          <li>Check an indicative scrap price with the calculator.</li>
          <li>Submit chemistry, voltage, Ah, quantity and condition through the form or WhatsApp.</li>
          <li>We connect you with a buyer who can show registration.</li>
          <li>The buyer inspects, weighs, confirms the final price and collects.</li>
        </ol>
        <p className="mt-3 text-xs text-slate-500">
          Estimates are indicative. Final price depends on inspection, state of health and live metal rates.
        </p>
        <Cta className="mt-5" />
      </section>

      {/* FAQ */}
      <section className="mt-12">
        <h2 className="text-xl font-bold text-emerald-900">FAQs: battery scrap in {city.name}</h2>
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
          <h2 className="text-xl font-bold text-emerald-900">Nearby locations</h2>
          <div className="mt-3 flex flex-wrap gap-3">
            {nearby.map((n) => (
              <Link key={n.slug} href={`/${n.slug}`}
                className="rounded-lg bg-emerald-50 px-4 py-2 text-emerald-900 transition hover:bg-emerald-100">
                {n.keywords.primary}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Sticky mobile CTA */}
      <div className="fixed inset-x-0 bottom-0 z-40 flex gap-2 border-t border-emerald-100 bg-white p-3 sm:hidden">
        <Link href={CALCULATOR_HREF}
          className="flex-1 rounded-xl bg-emerald-900 py-3 text-center text-sm font-semibold text-white">
          Calculate Scrap Price
        </Link>
        <Link href={wa ?? LEAD_FORM_HREF}
          className="flex-1 rounded-xl bg-cyan-500 py-3 text-center text-sm font-semibold text-white">
          Get Bulk Price
        </Link>
      </div>
    </main>
  );
}
