import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Info } from "lucide-react";
import { caseStudies } from "@/content/case-studies";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CtaBand } from "@/components/CtaBand";
import { RevealGroup } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "How Chad Denie approaches real mortgage situations: a first condo with 5% down, a self-employed approval after a bank declined, and a renewal that beat the lender's letter.",
};

export default function CaseStudiesPage() {
  return (
    <>
      <section className="py-14 sm:py-20">
        <Container size="wide">
          <SectionHeading
            eyebrow="Case studies"
            title="How it actually plays out"
            intro="Three situations that come up again and again, and what a good plan looks like in each."
          />
          <nav aria-label="Jump to a case study" className="mt-8 flex flex-wrap gap-2">
            {caseStudies.map((c) => (
              <a key={c.slug} href={`#${c.slug}`} className="rounded-full border border-sand bg-white px-4 py-2 text-sm font-medium text-ink-soft transition hover:border-terracotta hover:text-terracotta-dark">
                {c.tag}
              </a>
            ))}
          </nav>
          <p className="mt-6 flex max-w-3xl items-start gap-3 rounded-2xl border border-sand bg-white px-5 py-4 text-sm text-ink-soft">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-terracotta" aria-hidden="true" />
            <span>
              These are composite scenarios drawn from the kinds of files Chad works on regularly. No client is
              identified, and the figures are rounded and illustrative. Your outcome depends on your own circumstances
              and lender approval.
            </span>
          </p>
        </Container>
      </section>

      <section className="pb-20 sm:pb-28">
        <Container size="wide">
          <RevealGroup className="space-y-8" stagger={60}>
            {caseStudies.map((c, i) => (
              <article key={c.slug} id={c.slug} className="scroll-mt-28 overflow-hidden rounded-[2rem] border border-sand bg-white shadow-soft">
                <div className="grid lg:grid-cols-12">
                  <div className="p-8 lg:col-span-8 lg:p-12">
                    <div className="flex items-center gap-3 text-xs">
                      <span className="rounded-full bg-terracotta-tint px-2.5 py-1 font-semibold text-terracotta-dark">{c.tag}</span>
                      <span className="font-display text-muted">0{i + 1}</span>
                    </div>
                    <h2 className="mt-4 text-3xl leading-tight text-ink">{c.title}</h2>
                    <p className="mt-3 text-lg text-ink-soft">{c.summary}</p>

                    <h3 className="mt-8 font-sans text-xs font-semibold uppercase tracking-[0.18em] text-terracotta">The situation</h3>
                    <p className="mt-2 leading-relaxed text-ink-soft">{c.situation}</p>
                    <h3 className="mt-6 font-sans text-xs font-semibold uppercase tracking-[0.18em] text-terracotta">The challenge</h3>
                    <p className="mt-2 leading-relaxed text-ink-soft">{c.challenge}</p>
                    <h3 className="mt-6 font-sans text-xs font-semibold uppercase tracking-[0.18em] text-terracotta">What Chad did</h3>
                    <ul className="mt-3 space-y-2.5">
                      {c.approach.map((step) => (
                        <li key={step} className="flex items-start gap-3 leading-relaxed text-ink-soft">
                          <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-sage" aria-hidden="true" />
                          {step}
                        </li>
                      ))}
                    </ul>
                    <h3 className="mt-6 font-sans text-xs font-semibold uppercase tracking-[0.18em] text-terracotta">The outcome</h3>
                    <p className="mt-2 leading-relaxed text-ink-soft">{c.outcome}</p>
                  </div>
                  <aside className="flex flex-col justify-between bg-espresso p-8 text-cream lg:col-span-4 lg:p-10">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cream/55">At a glance</p>
                      <dl className="mt-5 space-y-5">
                        {c.numbers.map((n) => (
                          <div key={n.label}>
                            <dd className="font-display text-3xl text-cream">{n.value}</dd>
                            <dt className="mt-1 text-sm text-cream/65">{n.label}</dt>
                          </div>
                        ))}
                      </dl>
                    </div>
                    <div className="mt-10">
                      <p className="font-display text-lg leading-snug text-cream">&ldquo;{c.takeaway}&rdquo;</p>
                      <Link href={c.relatedTool.href} className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-terracotta-tint hover:text-cream">
                        {c.relatedTool.label} <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </Link>
                    </div>
                  </aside>
                </div>
              </article>
            ))}
          </RevealGroup>
          <div className="mt-12 text-center">
            <Button href="/get-started" size="lg">
              Start your own story
            </Button>
          </div>
        </Container>
      </section>
      <CtaBand title="Your situation is probably one of these, or close to it." body="A short call is enough to know which plan fits. No pressure, no jargon." />
    </>
  );
}
