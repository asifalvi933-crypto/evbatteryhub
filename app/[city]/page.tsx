import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SITE_URL, getCity, getPublishedCities } from "@/lib/cities";

// Jo city JSON mein nahi hai ya published=false hai, wo 404 degi
export const dynamicParams = false;

type Props = { params: Promise<{ city: string }> };

export function generateStaticParams() {
  return getPublishedCities().map((c) => ({ city: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city: slug } = await params;
  const city = getCity(slug);
  if (!city) return {};

  const title = `EV Lithium-ion Battery Scrap & Recycling in ${city.name} | EV Battery Hub India`;
  const description = `${city.name} mein purani EV lithium-ion, LFP, NMC aur lead acid battery ka scrap rate check karein. Verified buyers se connect hon aur WhatsApp par quote payein.`;
  const url = `${SITE_URL}/${city.slug}`;

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: "EV Battery Hub India",
      type: "website",
      locale: "en_IN",
    },
  };
}

export default async function CityPage({ params }: Props) {
  const { city: slug } = await params;
  const city = getCity(slug);
  if (!city) notFound();

  const url = `${SITE_URL}/${city.slug}`;
  const nearby = city.nearby
    .map((s) => getCity(s))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": url,
        url,
        name: `EV Battery Scrap & Recycling in ${city.name}`,
        dateModified: city.updatedAt,
        inLanguage: "en-IN",
      },
      {
        "@type": "Service",
        name: `EV Battery Scrap Valuation & Buyer Matching in ${city.name}`,
        serviceType: "Battery scrap valuation and recycler matching",
        areaServed: { "@type": "City", name: city.name },
        provider: {
          "@type": "Organization",
          name: "EV Battery Hub India",
          url: SITE_URL,
        },
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
        <Link href="/" className="hover:underline">Home</Link> / {city.name}
      </nav>

      <h1 className="mt-3 text-3xl font-extrabold text-emerald-900 sm:text-4xl">
        EV Lithium-ion Battery Scrap, Purchase &amp; Recycling in {city.name}
      </h1>
      <p className="mt-4 text-slate-600">{city.intro}</p>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          href="/#home"
          className="rounded-xl bg-emerald-900 px-5 py-3 font-semibold text-white"
        >
          Scrap Value Calculate Karein
        </Link>
        <Link
          href="/#lead-form"
          className="rounded-xl border-2 border-emerald-900 px-5 py-3 font-semibold text-emerald-900"
        >
          Bulk Quote Maangein
        </Link>
      </div>

      <section className="mt-10">
        <h2 className="text-xl font-bold text-emerald-900">
          {city.name} mein hum kin batteries ke liye kaam karte hain
        </h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {city.batteryTypes.map((t) => (
            <span key={t} className="rounded-full bg-cyan-50 px-3 py-1 text-sm text-cyan-800">
              {t}
            </span>
          ))}
        </div>
        <ul className="mt-4 list-disc space-y-1 pl-5 text-slate-700">
          {city.segments.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-bold text-emerald-900">
          {city.name} ka local market
        </h2>
        <p className="mt-3 text-slate-700">{city.marketContext}</p>
        <p className="mt-3 text-slate-700">
          <b>Covered areas:</b> {city.localAreas.join(", ")}
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-bold text-emerald-900">Pickup &amp; Logistics</h2>
        <p className="mt-3 text-slate-700">{city.logistics}</p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-bold text-emerald-900">Process kaise kaam karta hai</h2>
        <ol className="mt-3 list-decimal space-y-1 pl-5 text-slate-700">
          <li>Calculator se indicative scrap value check karein.</li>
          <li>Form mein apni battery ki details aur quantity bharein.</li>
          <li>Hum aapko verified, authorised buyer se WhatsApp par connect karte hain.</li>
          <li>Inspection ke baad final price tay hota hai aur pickup hota hai.</li>
        </ol>
        <p className="mt-3 text-xs text-slate-500">
          Estimates indicative hain. Final price inspection, State of Health aur live market rates par depend karta hai.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-bold text-emerald-900">
          {city.name} ke liye FAQs
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
        <section className="mt-10">
          <h2 className="text-xl font-bold text-emerald-900">Nearby cities</h2>
          <div className="mt-3 flex flex-wrap gap-3">
            {nearby.map((n) => (
              <Link
                key={n.slug}
                href={`/${n.slug}`}
                className="rounded-lg bg-emerald-50 px-4 py-2 text-emerald-900 hover:bg-emerald-100"
              >
                Battery scrap in {n.name}
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
