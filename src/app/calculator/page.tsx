import type { Metadata } from "next";
import { MortgageCalculator } from "@/components/MortgageCalculator";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CtaBand } from "@/components/CtaBand";

export const metadata: Metadata = {
  title: "Mortgage Calculators",
  description:
    "Estimate your Canadian mortgage payment, default insurance premium, total interest, and payoff time with monthly, bi-weekly, or accelerated payments.",
};

export default function CalculatorPage() {
  return (
    <>
      <section className="py-14 sm:py-20">
        <Container size="wide">
          <SectionHeading
            eyebrow="Free tool"
            title="Mortgage payment calculator"
            intro="Adjust the price, down payment, rate, and payment frequency to see how each choice changes your payment and total interest. Built for Canadian mortgages. Use the tabs below to switch tools."
          />
          <div className="mt-12">
            <MortgageCalculator />
          </div>
        </Container>
      </section>
      <CtaBand
        title="Numbers are a start. Let's turn them into a plan."
        body="A calculator can't tell you which lender will approve you or how to structure your down payment. A short call can."
      />
    </>
  );
}
