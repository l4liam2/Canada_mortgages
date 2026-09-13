import type { Metadata } from "next";
import { ClosingCostsCalculator } from "@/components/calculators/ClosingCostsCalculator";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CtaBand } from "@/components/CtaBand";

export const metadata: Metadata = {
  title: "Closing Costs and Land Transfer Tax Calculator",
  description:
    "Estimate Ontario and Toronto land transfer tax, first-time buyer rebates, PST on mortgage insurance, legal fees, and the total cash you need on closing day.",
};

export default function ClosingCostsPage() {
  return (
    <>
      <section className="py-14 sm:py-20">
        <Container size="wide">
          <SectionHeading
            eyebrow="Free tool"
            title="Closing costs and land transfer tax"
            intro="The down payment is only part of the cash you need. This estimates land transfer tax (with the Toronto surcharge and first-time buyer rebates), fees, and adjustments so there are no surprises at your lawyer's office."
          />
          <div className="mt-12">
            <ClosingCostsCalculator />
          </div>
        </Container>
      </section>
      <CtaBand title="Not sure you've budgeted for everything?" body="Send over your purchase price and situation and Chad will walk through the full picture with you." />
    </>
  );
}
