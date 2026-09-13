import type { Metadata } from "next";
import { testimonials } from "@/content/testimonials";
import { TestimonialCard } from "@/components/Cards";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CtaBand } from "@/components/CtaBand";

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
          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            <div className="lg:col-span-3">
              <TestimonialCard t={first} featured />
            </div>
            {rest.map((t) => (
              <TestimonialCard key={t.name} t={t} />
            ))}
          </div>
          <p className="mx-auto mt-10 max-w-xl text-center text-sm text-muted">
            Testimonials reflect individual experiences. Every application is assessed on its own
            merits and outcomes vary.
          </p>
        </Container>
      </section>
      <CtaBand title="Want to be the next story?" body="Book a free call and let's talk through what you're hoping to do." />
    </>
  );
}
