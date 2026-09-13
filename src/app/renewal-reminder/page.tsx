import type { Metadata } from "next";
import { RenewalReminder } from "@/components/RenewalReminder";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CtaBand } from "@/components/CtaBand";

export const metadata: Metadata = {
  title: "Mortgage Renewal Reminder",
  description:
    "Enter your mortgage maturity date and get a calendar reminder 120 days before renewal, when rate holds begin and you can shop your renewal.",
};

export default function RenewalReminderPage() {
  return (
    <>
      <section className="py-14 sm:py-20">
        <Container size="wide">
          <SectionHeading
            eyebrow="Free tool"
            title="Never sign a renewal on autopilot again"
            intro="Set a reminder for the moment your review window opens. It takes ten seconds and can save thousands over your next term."
          />
          <div className="mt-12">
            <RenewalReminder />
          </div>
        </Container>
      </section>
      <CtaBand title="Renewal coming up sooner?" body="Send Chad your renewal letter the day it arrives and get a market comparison back, usually within a business day." />
    </>
  );
}
