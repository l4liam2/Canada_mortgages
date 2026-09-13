import type { Metadata } from "next";
import { faqs } from "@/content/faq";
import { FaqAccordion } from "@/components/FaqAccordion";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CtaBand } from "@/components/CtaBand";

export const metadata: Metadata = {
  title: "Mortgage FAQ",
  description:
    "Answers to common questions about down payments, the stress test, pre-approvals, fixed versus variable rates, renewals, and working with a mortgage agent in Ontario.",
};

export default function FaqPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  return (
    <>
      <section className="py-14 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="FAQ"
            title="Questions people ask before their first call"
            intro="If your question isn't here, send it over. There's no such thing as a silly mortgage question."
            align="center"
          />
          <div className="mt-12">
            <FaqAccordion items={faqs} />
          </div>
        </Container>
      </section>
      <CtaBand title="Still have a question?" body="Send it through the contact form or book a quick call. Either way you'll get a straight answer." />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
    </>
  );
}
