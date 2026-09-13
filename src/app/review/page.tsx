import type { Metadata } from "next";
import { ReviewForm } from "@/components/ReviewForm";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Leave a Review",
  description: "Worked with Chad Denie? Share your experience to help other buyers and homeowners.",
  robots: { index: false, follow: true },
};

export default function ReviewPage() {
  return (
    <section className="py-14 sm:py-20">
      <Container size="wide">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading
              eyebrow="Share your experience"
              title="Worked with Chad? Tell others how it went."
              intro="Honest reviews help the next first-time buyer or homeowner decide who to trust. Two minutes is plenty."
            />
          </div>
          <div className="lg:col-span-8">
            <ReviewForm />
          </div>
        </div>
      </Container>
    </section>
  );
}
