import type { Metadata } from "next";
import { testimonials } from "@/content/testimonials";
import { TestimonialCard } from "@/components/Cards";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CtaBand } from "@/components/CtaBand";
import { RevealGroup } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Client Testimonials",
  description: "What first-time buyers, homeowners, and investors say about working with Chad Denie.",
};

export default function TestimonialsPage() {
  const [first, ...rest] = testimonials;
  return (
    <>
      <section className="py-14 sm:py-20">
        <Container size="wide">
          <SectionHeading
            eyebrow="Client stories"
            title="Real people, real mortgages, honest feedback"
            intro="Most of my clients come from referrals. Here's why."
            align="center"
          />
          <RevealGroup className="mt-14 grid gap-5 lg:grid-cols-3">
            <div className="lg:col-span-3">
              <TestimonialCard t={first} featured />
            </div>
            {rest.map((t) => (
              <TestimonialCard key={t.name} t={t} />
            ))}
          </RevealGroup>
          <div className="mx-auto mt-12 max-w-xl rounded-2xl border border-sand bg-white p-8 text-center shadow-soft">
            <h2 className="text-2xl text-ink">Worked with Chad?</h2>
            <p className="mt-2 text-ink-soft">Your experience helps the next buyer decide who to trust. It takes two minutes.</p>
            <Button href="/review" variant="secondary" className="mt-5">
              Leave a review
            </Button>
          </div>
          <p className="mx-auto mt-8 max-w-xl text-center text-sm text-muted">
            Testimonials reflect individual experiences. Every application is assessed on its own
            merits and outcomes vary.
          </p>
        </Container>
      </section>
      <CtaBand title="Want to be the next story?" body="Book a free call and let's talk through what you're hoping to do." />
    </>
  );
}
