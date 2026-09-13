import type { Metadata } from "next";
import { AffordabilityCalculator } from "@/components/calculators/AffordabilityCalculator";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CtaBand } from "@/components/CtaBand";

export const metadata: Metadata = {
  title: "Mortgage Affordability Calculator",
  description:
    "Estimate the maximum home price you can qualify for in Ontario using your income, debts, down payment, and the mortgage stress test.",
};

export default function AffordabilityPage() {
  return (
    <>
      <section className="py-14 sm:py-20">
        <Container size="wide">
          <SectionHeading
            eyebrow="Free tool"
            title="How much home can you afford?"
            intro="Lenders qualify you on debt-service ratios at the stress-test rate. Enter your numbers to see the purchase price that fits, and how much the stress test changes it."
          />
          <div className="mt-12">
            <AffordabilityCalculator />
          </div>
        </Container>
      </section>
      <CtaBand title="Want the number a lender would actually approve?" body="A pre-approval reviews your full file and holds a rate for 120 days. It takes one short conversation to start." />
    </>
  );
}
