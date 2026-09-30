import type { Metadata } from "next";
import { Star } from "lucide-react";
import { site } from "@/config/site";
import { ReviewForm } from "@/components/ReviewForm";
import { Button } from "@/components/ui/Button";
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
            <div className="mt-8 rounded-2xl border border-sand bg-white p-6 shadow-soft">
              <p className="font-sans text-base font-semibold text-ink">The best place is Google</p>
              <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                A Google review helps the most, since it&apos;s where people look first.
              </p>
              <Button href={site.links.googleReviews} external className="mt-4">
                <Star className="h-4 w-4" aria-hidden="true" />
                Review Chad on Google
              </Button>
              <p className="mt-4 text-xs text-muted">Prefer not to use Google? The form works too.</p>
            </div>
          </div>
          <div className="lg:col-span-8">
            <ReviewForm />
          </div>
        </div>
      </Container>
    </section>
  );
}
