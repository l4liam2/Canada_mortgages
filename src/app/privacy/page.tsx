import type { Metadata } from "next";
import { site } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Chad Denie collects, uses, and protects your personal information.",
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return (
    <section className="py-14 sm:py-20">
      <Container size="narrow">
        <SectionHeading eyebrow="Legal" title="Privacy policy" intro="Last updated September 2026." />
        <div className="prose-article mt-10">
          <h2>What we collect</h2>
          <p>
            When you contact us through this website, book a call, or start an application, we collect
            the information you provide, such as your name, email address, phone number, and details
            about your mortgage needs. Applications submitted through the online portal are collected
            and stored by {site.brokerage.name} in accordance with its own privacy policy.
          </p>
          <h2>How we use it</h2>
          <p>
            Your information is used to respond to your inquiry, assess your mortgage options, and,
            with your consent, submit applications to lenders on your behalf. We do not sell your
            personal information.
          </p>
          <h2>Who we share it with</h2>
          <p>
            Information may be shared with lenders, mortgage insurers, and service providers (such as
            appraisers and lawyers) only as needed to arrange your mortgage, and with regulators where
            required by law.
          </p>
          <h2>Your choices</h2>
          <p>
            You can ask to access, correct, or delete the personal information we hold about you at any
            time by emailing{" "}
            <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>.
          </p>
          <h2>Cookies and analytics</h2>
          <p>
            This site does not use advertising cookies. If analytics are enabled, they are used only
            to understand how visitors use the site in aggregate.
          </p>
          <h2>Contact</h2>
          <p>
            Questions about this policy can be sent to {site.contact.email} or {site.contact.phone}.
          </p>
        </div>
      </Container>
    </section>
  );
}
