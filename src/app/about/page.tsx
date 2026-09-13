import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, BadgeCheck, GraduationCap, Handshake, MessageSquare } from "lucide-react";
import { site } from "@/config/site";
import { assetPath } from "@/lib/paths";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LinkedInIcon } from "@/components/ui/LinkedInIcon";
import { CtaBand } from "@/components/CtaBand";

export const metadata: Metadata = {
  title: "About Chad",
  description: `Meet Chad Denie, a Level 2 mortgage agent in Toronto with ${site.yearsExperience}+ years helping first-time buyers, homeowners, and investors.`,
};

const values = [
  {
    icon: MessageSquare,
    title: "Strong communication",
    body: "You'll always know where your file stands and what happens next. No chasing, no surprises at the lawyer's office.",
  },
  {
    icon: Handshake,
    title: "Transparency",
    body: "Every rate, fee, and penalty is on the table before you commit. If a deal doesn't make sense for you, I'll say so.",
  },
  {
    icon: GraduationCap,
    title: "Education",
    body: "I take the time to explain how each option works so you can make an informed choice, not just follow a recommendation.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="py-14 sm:py-20">
        <Container size="wide">
          <div className="grid items-start gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <div className="mx-auto max-w-md lg:sticky lg:top-28">
                <div className="relative">
                  <div aria-hidden="true" className="absolute -left-4 -top-4 h-full w-full rounded-[2rem] bg-terracotta/90" />
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-lift">
                    <Image
                      src={assetPath("/images/chad-denie.jpg")}
                      alt="Chad Denie, mortgage agent"
                      fill
                      priority
                      quality={85}
                      sizes="(min-width: 1024px) 40vw, 28rem"
                      className="object-cover object-top"
                    />
                  </div>
                </div>
                <div className="mt-8 rounded-2xl border border-sand bg-white p-6 shadow-soft">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-terracotta">At a glance</p>
                  <dl className="mt-4 space-y-3 text-sm">
                    <div className="flex justify-between gap-4 border-b border-sand pb-3">
                      <dt className="text-muted">Role</dt>
                      <dd className="text-right font-medium text-ink">{site.title}</dd>
                    </div>
                    <div className="flex justify-between gap-4 border-b border-sand pb-3">
                      <dt className="text-muted">Brokerage</dt>
                      <dd className="text-right font-medium text-ink">{site.brokerage.name}</dd>
                    </div>
                    <div className="flex justify-between gap-4 border-b border-sand pb-3">
                      <dt className="text-muted">Licence</dt>
                      <dd className="text-right font-medium text-ink">{site.agentLicence}</dd>
                    </div>
                    <div className="flex justify-between gap-4 border-b border-sand pb-3">
                      <dt className="text-muted">Based in</dt>
                      <dd className="text-right font-medium text-ink">Toronto, Ontario</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-muted">Serving</dt>
                      <dd className="text-right font-medium text-ink">{site.contact.serviceArea}</dd>
                    </div>
                  </dl>
                  <a
                    href={site.links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-terracotta hover:text-terracotta-dark"
                  >
                    <LinkedInIcon className="h-4 w-4" />
                    Connect on LinkedIn
                  </a>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <SectionHeading
                eyebrow="About Chad"
                title="Hi, I'm Chad Denie. I help people understand their mortgage before they sign it."
              />
              <div className="mt-8 space-y-5 text-lg leading-relaxed text-ink-soft">
                <p>
                  For the past {site.yearsExperience} years I&apos;ve worked as a dedicated mortgage agent
                  in Toronto, and most of that time has been spent with first-time buyers. I love that
                  part of the job. Buying your first home is one of the biggest steps you&apos;ll take,
                  and it should feel exciting, not intimidating.
                </p>
                <p>
                  My approach is hands-on. I guide clients through every stage of the purchase, from
                  the first pre-approval conversation to the day the keys are handed over, and I make
                  sure nothing is signed until it&apos;s been explained. Clients tell me the difference
                  is that they always know what&apos;s happening and why.
                </p>
                <p>
                  I believe in strong communication, transparency, and education. That means taking the
                  time to walk through your options, answering every question, and building tailored
                  scenarios, whether you&apos;re buying your first condo or planning a real estate
                  investment portfolio, so your decision lines up with your actual financial goals.
                </p>
                <p>
                  Beyond first purchases, I work extensively on refinances and renewals. If you&apos;re
                  looking to optimize a mortgage you already have, access equity, or make sure your
                  renewal isn&apos;t costing you more than it should, I can help there too.
                </p>
                <p>
                  I&apos;m a Level 2 mortgage agent licensed in Ontario and brokered through{" "}
                  {site.brokerage.name}, which gives my clients access to major banks, credit unions,
                  and monoline lenders. Your mortgage goes where it fits best, not just where you
                  happen to bank.
                </p>
              </div>

              <div className="mt-12">
                <h2 className="text-2xl text-ink">What you can expect</h2>
                <ul className="mt-6 grid gap-4 sm:grid-cols-3">
                  {values.map((v) => (
                    <li key={v.title} className="rounded-2xl border border-sand bg-white p-6 shadow-soft">
                      <v.icon className="h-6 w-6 text-terracotta" aria-hidden="true" />
                      <h3 className="mt-4 text-lg text-ink">{v.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-ink-soft">{v.body}</p>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-12 rounded-2xl bg-cream-deep p-6 sm:p-8">
                <div className="flex items-start gap-4">
                  <BadgeCheck className="mt-1 h-6 w-6 shrink-0 text-terracotta" aria-hidden="true" />
                  <div>
                    <h2 className="text-xl text-ink">Licensed and accountable</h2>
                    <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-soft">
                      Mortgage agents in Ontario are licensed and regulated by the Financial Services
                      Regulatory Authority of Ontario (FSRA). Chad&apos;s licence number is{" "}
                      {site.agentLicence} and {site.brokerage.name} holds brokerage licence{" "}
                      {site.brokerage.licence}. You can verify both on the FSRA public registry.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Button href="/book" size="lg">
                  Book a free call
                </Button>
                <Button href="/services" size="lg" variant="secondary">
                  See how I can help <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
