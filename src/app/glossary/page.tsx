import type { Metadata } from "next";
import { glossary } from "@/content/glossary";
import { site } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CtaBand } from "@/components/CtaBand";

export const metadata: Metadata = {
  title: "Mortgage Glossary",
  description:
    "Plain-language definitions of Canadian mortgage terms: amortization, stress test, IRD penalty, HELOC, GDS and TDS ratios, porting, and more.",
};

function slug(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export default function GlossaryPage() {
  const sorted = [...glossary].sort((a, b) => a.term.localeCompare(b.term));
  const letters = Array.from(new Set(sorted.map((t) => t.term[0].toUpperCase())));
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    name: "Canadian mortgage glossary",
    url: `${site.url}/glossary/`,
    hasDefinedTerm: sorted.map((t) => ({
      "@type": "DefinedTerm",
      name: t.term,
      description: t.definition,
      url: `${site.url}/glossary/#${slug(t.term)}`,
    })),
  };

  return (
    <>
      <section className="py-14 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="Glossary"
            title="Mortgage terms, explained plainly"
            intro="The words that show up on pre-approvals, commitment letters, and renewal offers, without the jargon."
            align="center"
          />
          <nav aria-label="Jump to letter" className="mt-10 flex flex-wrap justify-center gap-1.5">
            {letters.map((l) => (
              <a key={l} href={`#letter-${l}`} className="grid h-9 w-9 place-items-center rounded-full border border-sand bg-white text-sm font-medium text-ink-soft transition hover:border-terracotta hover:text-terracotta-dark">
                {l}
              </a>
            ))}
          </nav>
          <dl className="mt-12 space-y-10">
            {letters.map((l) => (
              <div key={l} id={`letter-${l}`} className="scroll-mt-28">
                <p className="font-display text-3xl text-terracotta">{l}</p>
                <div className="mt-4 divide-y divide-sand rounded-2xl border border-sand bg-white shadow-soft">
                  {sorted
                    .filter((t) => t.term[0].toUpperCase() === l)
                    .map((t) => (
                      <div key={t.term} id={slug(t.term)} className="scroll-mt-28 px-6 py-5">
                        <dt className="text-lg font-semibold text-ink">{t.term}</dt>
                        <dd className="mt-1.5 text-[0.98rem] leading-relaxed text-ink-soft">{t.definition}</dd>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </dl>
        </Container>
      </section>
      <CtaBand title="Still translating a document?" body="Send it over. Chad will walk you through every clause before you sign." />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
