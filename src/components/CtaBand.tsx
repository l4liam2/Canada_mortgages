import { ArrowRight, CalendarCheck } from "lucide-react";
import { site } from "@/config/site";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function CtaBand({
  title = "Ready to talk through your options?",
  body = "A 20-minute call is usually enough to map out what you qualify for, what it will cost, and what to do next. No pressure, no jargon.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-espresso py-20 text-cream grain sm:py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-terracotta/25 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -left-24 h-80 w-80 rounded-full bg-terracotta/15 blur-3xl"
      />
      <Container className="relative">
        <div className="grid items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <h2 className="text-3xl leading-[1.12] text-cream sm:text-4xl lg:text-[2.75rem]">{title}</h2>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-cream/75">{body}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:col-span-4 lg:flex-col lg:items-stretch">
            <Button href="/book" size="lg" className="w-full">
              <CalendarCheck className="h-5 w-5" aria-hidden="true" />
              Book a free call
            </Button>
            <Button href={site.links.apply} external size="lg" variant="onDark" className="w-full">
              Apply online
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
