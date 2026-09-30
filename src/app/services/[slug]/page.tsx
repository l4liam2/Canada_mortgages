import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CalendarCheck, Check, ChevronRight, Sparkles } from "lucide-react";
import { getService, services } from "@/content/services";
import { processSteps } from "@/content/process";
import { getPost } from "@/lib/blog";
import { breadcrumbJsonLd, JsonLd, serviceJsonLd } from "@/lib/jsonld";
import { calculatorTools } from "@/components/calculators/CalculatorNav";
import { BlogCard, ServiceCard } from "@/components/Cards";
import { CtaBand } from "@/components/CtaBand";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { GoogleRating } from "@/components/ui/GoogleRating";
import { RevealGroup } from "@/components/motion/Reveal";

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return { title: "Service not found" };
  return {
    title: `${service.title} in Toronto and Ontario`,
    // The one-liner plus the first sentence of the description keeps it near search-snippet length.
    description: `${service.short} ${service.description.split(". ")[0]}.`,
  };
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const Icon = service.icon;
  const tool = calculatorTools.find((t) => t.href === service.tool);
  const posts = (service.posts ?? []).map(getPost).filter((p) => p !== null);
  // The next three services in the list, wrapping around, so every page links onward.
  const index = services.indexOf(service);
  const others = [1, 2, 3].map((n) => services[(index + n) % services.length]);

  return (
    <>
      <section className="py-14 sm:py-20">
        <Container size="wide">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-muted">
            <Link href="/services" className="hover:text-terracotta-dark">
              Services
            </Link>
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
            <span aria-current="page" className="text-ink-soft">
              {service.title}
            </span>
          </nav>

          <div className="mt-8 grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-terracotta-tint text-terracotta">
                <Icon className="h-7 w-7" aria-hidden="true" />
              </span>
              <h1 className="mt-6 text-4xl leading-[1.08] text-ink sm:text-5xl">{service.title}</h1>
              <p className="mt-4 text-xl text-terracotta-dark">{service.short}</p>
              <p className="mt-6 text-lg leading-relaxed text-ink-soft">{service.description}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button href="/book" size="lg">
                  <CalendarCheck className="h-5 w-5" aria-hidden="true" />
                  Book a free call
                </Button>
                <Button href="/get-started" size="lg" variant="secondary">
                  <Sparkles className="h-5 w-5" aria-hidden="true" />
                  Get pre-qualified
                </Button>
              </div>
              <GoogleRating className="mt-6" />
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-[2rem] border border-sand bg-white p-8 shadow-soft">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-terracotta">What&apos;s included</p>
                <ul className="mt-5 space-y-4">
                  {service.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-3 text-ink-soft">
                      <Check className="mt-1 h-4 w-4 shrink-0 text-sage" aria-hidden="true" />
                      {b}
                    </li>
                  ))}
                </ul>
                {tool && (
                  <Link
                    href={tool.href}
                    className="mt-8 flex items-center gap-3 rounded-xl border border-sand bg-cream px-4 py-3 text-sm font-medium text-ink transition hover:border-terracotta"
                  >
                    <tool.icon className="h-5 w-5 shrink-0 text-terracotta" aria-hidden="true" />
                    <span className="flex-1">
                      {tool.label} calculator
                      <span className="block font-normal text-muted">{tool.short}</span>
                    </span>
                    <ArrowRight className="h-4 w-4 text-terracotta" aria-hidden="true" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-y border-sand bg-cream-deep/60 py-16 sm:py-20">
        <Container size="wide">
          <h2 className="text-3xl text-ink">How it works</h2>
          <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step) => (
              <li key={step.step}>
                <span className="font-display text-sm text-terracotta">{step.step}</span>
                <h3 className="mt-2 text-lg text-ink">{step.title}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-soft">{step.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {posts.length > 0 && (
        <section className="py-16 sm:py-20">
          <Container size="wide">
            <h2 className="text-3xl text-ink">Further reading</h2>
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {posts.map((p) => (
                <BlogCard key={p.slug} post={p} />
              ))}
            </div>
          </Container>
        </section>
      )}

      <section className="bg-white py-16 sm:py-20">
        <Container size="wide">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <h2 className="text-3xl text-ink">Other ways Chad can help</h2>
            <Link href="/services" className="inline-flex items-center gap-2 font-medium text-terracotta hover:text-terracotta-dark">
              All services <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <RevealGroup className="mt-8 grid gap-5 md:grid-cols-3">
            {others.map((s) => (
              <ServiceCard key={s.slug} service={s} />
            ))}
          </RevealGroup>
        </Container>
      </section>

      <CtaBand />
      <JsonLd
        data={[
          serviceJsonLd(service),
          breadcrumbJsonLd([
            { name: "Services", path: "/services" },
            { name: service.title, path: `/services/${service.slug}` },
          ]),
        ]}
      />
    </>
  );
}
