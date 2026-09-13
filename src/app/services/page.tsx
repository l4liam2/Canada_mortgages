import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { services } from "@/content/services";
import { calculatorTools } from "@/components/calculators/CalculatorNav";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CtaBand } from "@/components/CtaBand";
import { RevealGroup } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Mortgage Services",
  description:
    "First-time buyer mortgages, refinancing, renewals and switches, investment properties, self-employed lending, HELOCs, and pre-approvals across Toronto and the GTA.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="py-14 sm:py-20">
        <Container size="wide">
          <SectionHeading
            eyebrow="Services"
            title="Mortgage solutions for every stage of home ownership"
            intro="Every file starts with the same question: what are you trying to accomplish? From there, the strategy and the lender follow. Here's what I help clients with most often."
          />
          <nav aria-label="Jump to a service" className="mt-10 flex flex-wrap gap-2">
            {services.map((s) => (
              <a
                key={s.slug}
                href={`#${s.slug}`}
                className="rounded-full border border-sand bg-white px-4 py-2 text-sm font-medium text-ink-soft transition hover:border-terracotta hover:text-terracotta-dark"
              >
                {s.title}
              </a>
            ))}
          </nav>
        </Container>
      </section>

      <section className="pb-20 sm:pb-28">
        <Container size="wide">
          <RevealGroup className="space-y-6" stagger={60}>
            {services.map((s, i) => {
              const Icon = s.icon;
              return (
                <article
                  key={s.slug}
                  id={s.slug}
                  className="scroll-mt-28 grid gap-8 rounded-[2rem] border border-sand bg-white p-8 shadow-soft lg:grid-cols-12 lg:p-12"
                >
                  <div className="lg:col-span-7">
                    <div className="flex items-center gap-4">
                      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-terracotta-tint text-terracotta">
                        <Icon className="h-6 w-6" aria-hidden="true" />
                      </span>
                      <span className="font-display text-sm text-muted">0{i + 1}</span>
                    </div>
                    <h2 className="mt-5 text-3xl text-ink">{s.title}</h2>
                    <p className="mt-2 text-lg text-terracotta-dark">{s.short}</p>
                    <p className="mt-5 text-[1.05rem] leading-relaxed text-ink-soft">{s.description}</p>
                  </div>
                  <div className="lg:col-span-5">
                    <div className="h-full rounded-2xl bg-cream p-6">
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-terracotta">
                        What&apos;s included
                      </p>
                      <ul className="mt-4 space-y-3">
                        {s.bullets.map((b) => (
                          <li key={b} className="flex items-start gap-3 text-[0.95rem] text-ink-soft">
                            <Check className="mt-1 h-4 w-4 shrink-0 text-sage" aria-hidden="true" />
                            {b}
                          </li>
                        ))}
                      </ul>
                      <Button href="/book" variant="secondary" className="mt-6 w-full">
                        Talk to Chad about this
                      </Button>
                    </div>
                  </div>
                </article>
              );
            })}
          </RevealGroup>

          <div className="mt-12 rounded-[2rem] border border-sand bg-white p-8 shadow-soft lg:p-10">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-terracotta">Helpful tools</p>
                <h2 className="mt-2 text-2xl text-ink">Run the numbers before we talk</h2>
              </div>
              <Link href="/resources" className="inline-flex items-center gap-2 font-medium text-terracotta hover:text-terracotta-dark">
                All resources <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {calculatorTools.map((t) => (
                <Link key={t.href} href={t.href} className="flex items-center gap-3 rounded-xl border border-sand bg-cream px-4 py-3 text-sm font-medium text-ink transition hover:border-terracotta">
                  <t.icon className="h-5 w-5 shrink-0 text-terracotta" aria-hidden="true" />
                  {t.label} calculator
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
