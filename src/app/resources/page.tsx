import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, BookOpen, CalendarClock, ClipboardCheck, FolderOpen, HelpCircle, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { checklists } from "@/content/checklists";
import { calculatorTools } from "@/components/calculators/CalculatorNav";
import { DocumentChecklist } from "@/components/DocumentChecklist";
import { LeadMagnet } from "@/components/LeadMagnet";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CtaBand } from "@/components/CtaBand";
import { RevealGroup } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Free mortgage tools and guides: calculators, document checklists for buying, renewing, and self-employed borrowers, a renewal reminder, glossary, and FAQ.",
};

const guides: { href: string; title: string; body: string; icon: LucideIcon }[] = [
  { href: "/get-started", title: "Get pre-qualified", body: "Four quick questions, no credit check, and a real plan back from Chad.", icon: Sparkles },
  { href: "/renewal-reminder", title: "Renewal reminder", body: "Add a calendar reminder for the day your renewal review window opens.", icon: CalendarClock },
  { href: "/case-studies", title: "Case studies", body: "A first condo with 5% down, a self-employed approval, and a renewal that beat the letter.", icon: FolderOpen },
  { href: "/glossary", title: "Mortgage glossary", body: "Plain-language definitions for every term you'll see on a mortgage document.", icon: BookOpen },
  { href: "/faq", title: "Questions and answers", body: "Down payments, the stress test, fixed versus variable, and what an agent costs.", icon: HelpCircle },
];

export default function ResourcesPage() {
  return (
    <>
      <section className="py-14 sm:py-20 print:hidden">
        <Container size="wide">
          <SectionHeading
            eyebrow="Resources"
            title="Tools and guides for every step"
            intro="Everything here is free, built for Canadian mortgages, and written the way Chad explains things on a call."
          />
          <h2 className="mt-12 text-xs font-semibold uppercase tracking-[0.18em] text-terracotta">Calculators</h2>
          <RevealGroup className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {calculatorTools.map((t) => (
              <Link key={t.href} href={t.href} className="group rounded-2xl border border-sand bg-white p-6 shadow-soft transition hover:-translate-y-0.5 hover:border-terracotta/40 hover:shadow-lift">
                <t.icon className="h-6 w-6 text-terracotta" aria-hidden="true" />
                <h3 className="mt-4 text-lg text-ink">{t.label} calculator</h3>
                <p className="mt-1 text-sm text-ink-soft">{t.short}</p>
              </Link>
            ))}
          </RevealGroup>
          <h2
            id="guides"
            className="mt-12 scroll-mt-24 text-xs font-semibold uppercase tracking-[0.18em] text-terracotta"
          >
            Guides and tools
          </h2>
          <RevealGroup className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {guides.map((g) => (
              <Link key={g.href} href={g.href} className="group rounded-2xl border border-sand bg-white p-6 shadow-soft transition hover:-translate-y-0.5 hover:border-terracotta/40 hover:shadow-lift">
                <g.icon className="h-6 w-6 text-terracotta" aria-hidden="true" />
                <h3 className="mt-4 flex items-center gap-1 text-lg text-ink">
                  {g.title}
                  <ArrowUpRight className="h-4 w-4 text-muted transition group-hover:text-terracotta" aria-hidden="true" />
                </h3>
                <p className="mt-1 text-sm text-ink-soft">{g.body}</p>
              </Link>
            ))}
          </RevealGroup>
        </Container>
      </section>

      <section id="checklists" className="scroll-mt-24 border-t border-sand bg-cream-deep/50 py-16 sm:py-20 print:border-0 print:bg-white print:py-0">
        <Container size="wide">
          <div className="mb-14 print:hidden">
            <LeadMagnet />
          </div>
          <div className="print:hidden">
            <SectionHeading
              eyebrow="Document checklists"
              title="What you'll need to gather"
              intro="Having documents ready is the single biggest thing that speeds up an approval. Tick items off as you go, then print the list."
            />
          </div>
          <div className="mt-10 print:mt-0">
            <DocumentChecklist lists={checklists} />
          </div>
          <p className="mt-4 flex items-center gap-2 text-sm text-muted print:hidden">
            <ClipboardCheck className="h-4 w-4" aria-hidden="true" />
            Not sure which list applies? Ask Chad and he&apos;ll send a tailored one.
          </p>
        </Container>
      </section>
      <div className="print:hidden">
        <CtaBand />
      </div>
    </>
  );
}
