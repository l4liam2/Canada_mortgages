import type { Metadata } from "next";
import { PrepaymentCalculator } from "@/components/calculators/PrepaymentCalculator";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CtaBand } from "@/components/CtaBand";

export const metadata: Metadata = {
  title: "Mortgage Prepayment Calculator",
  description:
    "See how much interest you save and how many years you cut from your mortgage with extra monthly payments, annual lump sums, or a one-time prepayment.",
};

export default function PrepaymentPage() {
  return (
    <>
      <section className="py-14 sm:py-20">
        <Container size="wide">
          <SectionHeading
            eyebrow="Free tool"
            title="Pay off your mortgage faster"
            intro="Small extra payments compound in your favour. See exactly what an extra amount each month, an annual lump sum, or a one-time payment does to your interest cost and payoff date."
          />
          <div className="mt-12">
            <PrepaymentCalculator />
          </div>
        </Container>
      </section>
      <CtaBand title="Thinking about restructuring instead?" body="Sometimes a refinance or a renewal with a shorter amortization does more than extra payments. Chad can compare both." />
    </>
  );
}
