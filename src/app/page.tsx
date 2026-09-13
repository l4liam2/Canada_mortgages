import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, CalendarCheck, CalendarClock, Calculator, ShieldCheck, Sparkles, Users } from "lucide-react";
import { site } from "@/config/site";
import { assetPath } from "@/lib/paths";
import { services } from "@/content/services";
import { processSteps, stats } from "@/content/process";
import { testimonials } from "@/content/testimonials";
import { faqs } from "@/content/faq";
import { getAllPosts } from "@/lib/blog";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BlogCard, ServiceCard, TestimonialCard } from "@/components/Cards";
import { FaqAccordion } from "@/components/FaqAccordion";
import { CtaBand } from "@/components/CtaBand";

export default function HomePage() {
  const posts = getAllPosts().slice(0, 3);
  const featuredServices = services.filter((s) => s.featured);

  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-[60%] bg-[radial-gradient(ellipse_at_top_right,rgba(194,85,58,0.10),transparent_55%)]"
        />
        <Container size="wide" className="relative pb-16 pt-10 sm:pt-16 lg:pb-24 lg:pt-20">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-7">
              <p className="inline-flex items-center gap-2 rounded-full border border-sand bg-white/70 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-terracotta-dark">
                <BadgeCheck className="h-4 w-4" aria-hidden="true" />
                Toronto mortgage agent, Level 2
              </p>
              <h1 className="mt-6 text-[2.6rem] leading-[1.05] text-ink sm:text-6xl lg:text-[4.25rem]">
                Mortgages explained clearly.{" "}
                <span className="text-terracotta">Decisions made confidently.</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft sm:text-xl">
                I&apos;m Chad. For the past {site.yearsExperience} years I&apos;ve helped first-time
                buyers, homeowners renewing or refinancing, and investors across the GTA find the
                right mortgage, with every option explained in plain language.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button href="/book" size="lg">
                  <CalendarCheck className="h-5 w-5" aria-hidden="true" />
                  Book a free call
                </Button>
                <Button href="/get-started" size="lg" variant="secondary">
                  <Sparkles className="h-5 w-5" aria-hidden="true" />
                  Get pre-qualified in 2 minutes
                </Button>
              </div>
              <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-ink-soft">
                <li className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-terracotta" aria-hidden="true" />
                  Brokered by {site.brokerage.shortName}
                </li>
                <li className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-terracotta" aria-hidden="true" />
                  Access to 30+ lenders
                </li>
                <li className="flex items-center gap-2">
                  <BadgeCheck className="h-4 w-4 text-terracotta" aria-hidden="true" />
                  No cost for a consultation
                </li>
              </ul>
            </div>

            <div className="relative mx-auto w-full max-w-md lg:col-span-5 lg:max-w-none">
              <div
                aria-hidden="true"
                className="absolute -left-4 -top-4 h-full w-full rounded-[2rem] bg-terracotta/90 lg:-left-6 lg:-top-6"
              />
              <div
                aria-hidden="true"
                className="absolute -bottom-6 -right-6 h-40 w-40 rounded-full border border-sand bg-cream-deep"
              />
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-lift">
                <Image
                  src={assetPath("/images/chad-denie.jpg")}
                  alt="Chad Denie, mortgage agent, smiling in a grey blazer"
                  fill
                  priority
                  quality={85}
                  sizes="(min-width: 1024px) 40vw, (min-width: 640px) 28rem, 100vw"
                  className="object-cover object-top"
                />
              </div>
              <div className="absolute -bottom-5 left-4 rounded-2xl border border-sand bg-white px-5 py-4 shadow-lift sm:left-8">
                <p className="font-display text-3xl leading-none text-ink">{site.yearsExperience}+</p>
                <p className="mt-1 text-xs font-medium uppercase tracking-[0.12em] text-muted">
                  Years guiding buyers
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ---------- Stats ---------- */}
      <section className="border-y border-sand bg-cream-deep/60">
        <Container size="wide">
          <dl className="grid grid-cols-2 divide-sand sm:grid-cols-4 sm:divide-x">
            {stats.map((s) => (
              <div key={s.label} className="px-4 py-8 text-center sm:py-10">
                <dd className="font-display text-4xl text-ink sm:text-5xl">{s.value}</dd>
                <dt className="mt-2 text-sm text-ink-soft">{s.label}</dt>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* ---------- Services ---------- */}
      <section className="py-20 sm:py-28">
        <Container size="wide">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="How I can help"
              title="The right mortgage for where you are right now"
              intro="Whether you're buying your first place, renewing, refinancing, or building a portfolio, the approach is the same: understand your goals, show you the real numbers, and find the lender that fits."
            />
            <Link href="/services" className="inline-flex shrink-0 items-center gap-2 font-medium text-terracotta hover:text-terracotta-dark">
              All services <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featuredServices.map((s) => (
              <ServiceCard key={s.slug} service={s} />
            ))}
          </div>
        </Container>
      </section>

      {/* ---------- Process ---------- */}
      <section className="bg-white py-20 sm:py-28">
        <Container size="wide">
          <SectionHeading
            eyebrow="How it works"
            title="Simple, transparent, and never rushed"
            intro="Most clients are surprised by how straightforward the process is when someone actually walks them through it."
            align="center"
          />
          <ol className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((p, i) => (
              <li key={p.step} className="relative rounded-2xl border border-sand bg-cream p-7">
                <span className="font-display text-4xl text-terracotta/70">{p.step}</span>
                {i < processSteps.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="absolute -right-3 top-10 hidden h-px w-6 bg-sand lg:block"
                  />
                )}
                <h3 className="mt-4 text-xl text-ink">{p.title}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-soft">{p.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* ---------- About teaser ---------- */}
      <section className="py-20 sm:py-28">
        <Container size="wide">
          <div className="grid items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-sm">
                <div aria-hidden="true" className="absolute -bottom-4 -right-4 h-full w-full rounded-[2rem] bg-cream-deep" />
                <div className="relative aspect-square overflow-hidden rounded-[2rem] shadow-soft">
                  <Image
                    src={assetPath("/images/chad-denie-square.jpg")}
                    alt="Chad Denie portrait"
                    fill
                    sizes="(min-width: 1024px) 30vw, 24rem"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
            <div className="lg:col-span-7">
              <SectionHeading
                eyebrow="About Chad"
                title="Communication, transparency, and education. That's the whole approach."
              />
              <div className="mt-6 space-y-4 text-lg leading-relaxed text-ink-soft">
                <p>
                  I got into this work because too many people sign the biggest financial document of
                  their lives without really understanding it. My job is to change that: explain the
                  options, answer every question, and build tailored scenarios so you can make a
                  decision that fits your goals, not someone else&apos;s sales target.
                </p>
                <p>
                  I&apos;m a Level 2 mortgage agent with {site.brokerage.shortName}, which means I can
                  place your mortgage with major banks, credit unions, and lenders you can&apos;t reach
                  on your own.
                </p>
              </div>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button href="/about" variant="secondary">
                  More about Chad
                </Button>
                <Button href={site.links.linkedin} external variant="ghost">
                  Connect on LinkedIn <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ---------- Free tools ---------- */}
      <section className="bg-cream-deep py-20 sm:py-28">
        <Container size="wide">
          <SectionHeading
            eyebrow="Free tools"
            title="Do the math before you make the call"
            intro="Built for Canadian mortgages, with the real rules baked in. Use them as much as you like."
            align="center"
          />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            <Link href="/calculator" className="group rounded-2xl border border-sand bg-white p-7 shadow-soft transition hover:-translate-y-1 hover:border-terracotta/40 hover:shadow-lift">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-terracotta-tint text-terracotta transition-colors group-hover:bg-terracotta group-hover:text-white">
                <Calculator className="h-6 w-6" aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-xl text-ink">Four calculators</h3>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-soft">
                Payment, affordability, closing costs with land transfer tax, and how fast extra payments pay you off.
              </p>
              <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-terracotta">
                Open calculators <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </span>
            </Link>
            <Link href="/get-started" className="group rounded-2xl border border-sand bg-white p-7 shadow-soft transition hover:-translate-y-1 hover:border-terracotta/40 hover:shadow-lift">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-terracotta-tint text-terracotta transition-colors group-hover:bg-terracotta group-hover:text-white">
                <Sparkles className="h-6 w-6" aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-xl text-ink">Get pre-qualified</h3>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-soft">
                Four quick questions, no credit check. Chad replies with what&apos;s realistic and what to do first.
              </p>
              <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-terracotta">
                Start now <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </span>
            </Link>
            <Link href="/renewal-reminder" className="group rounded-2xl border border-sand bg-white p-7 shadow-soft transition hover:-translate-y-1 hover:border-terracotta/40 hover:shadow-lift">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-terracotta-tint text-terracotta transition-colors group-hover:bg-terracotta group-hover:text-white">
                <CalendarClock className="h-6 w-6" aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-xl text-ink">Renewal reminder</h3>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-soft">
                Put the day your review window opens in your calendar, so your next renewal is a choice, not a default.
              </p>
              <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-terracotta">
                Set a reminder <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </span>
            </Link>
          </div>
        </Container>
      </section>

      {/* ---------- Testimonials ---------- */}
      <section className="py-20 sm:py-28">
        <Container size="wide">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="Client stories"
              title="What it's like to work together"
            />
            <Link href="/testimonials" className="inline-flex shrink-0 items-center gap-2 font-medium text-terracotta hover:text-terracotta-dark">
              Read more stories <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {testimonials.slice(0, 3).map((t) => (
              <TestimonialCard key={t.name} t={t} />
            ))}
          </div>
        </Container>
      </section>

      {/* ---------- Blog ---------- */}
      {posts.length > 0 && (
        <section className="bg-white py-20 sm:py-28">
          <Container size="wide">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <SectionHeading
                eyebrow="From the blog"
                title="Straight answers on buying, renewing, and refinancing"
              />
              <Link href="/blog" className="inline-flex shrink-0 items-center gap-2 font-medium text-terracotta hover:text-terracotta-dark">
                All articles <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {posts.map((p) => (
                <BlogCard key={p.slug} post={p} />
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* ---------- FAQ teaser ---------- */}
      <section className="py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="Common questions"
            title="Things people ask before their first call"
            align="center"
          />
          <div className="mt-12">
            <FaqAccordion items={faqs.slice(0, 4)} />
          </div>
          <div className="mt-8 text-center">
            <Button href="/faq" variant="secondary">
              See all questions
            </Button>
          </div>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
