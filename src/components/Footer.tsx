import Link from "next/link";
import { Mail, MapPin, Phone, Clock } from "lucide-react";
import { site } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { LinkedInIcon } from "@/components/ui/LinkedInIcon";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative mt-auto bg-espresso text-cream/80">
      <Container size="wide" className="py-16">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Link href="/" className="inline-flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-terracotta font-display text-lg font-semibold text-white">
                CD
              </span>
              <span className="leading-tight">
                <span className="block font-display text-xl font-semibold text-cream">{site.name}</span>
                <span className="block text-[0.7rem] font-medium uppercase tracking-[0.16em] text-cream/55">
                  {site.title}
                </span>
              </span>
            </Link>
            <p className="mt-5 max-w-sm text-[0.95rem] leading-relaxed text-cream/70">
              Clear, honest mortgage advice for first-time buyers, homeowners, and investors across{" "}
              {site.contact.serviceArea}.
            </p>
            <a
              href={site.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-cream/15 px-4 py-2 text-sm text-cream/80 transition-colors hover:border-cream/40 hover:text-cream"
            >
              <LinkedInIcon className="h-4 w-4" />
              Connect on LinkedIn
            </a>
          </div>

          <div className="md:col-span-3">
            <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-cream/50">
              Explore
            </h3>
            <ul className="mt-4 space-y-2.5 text-[0.95rem]">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-cream/80 transition-colors hover:text-cream">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/book" className="text-cream/80 transition-colors hover:text-cream">
                  Book a call
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-cream/80 transition-colors hover:text-cream">
                  Privacy policy
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-cream/50">
              Get in touch
            </h3>
            <ul className="mt-4 space-y-3.5 text-[0.95rem]">
              <li>
                <a href={site.contact.phoneHref} className="flex items-start gap-3 hover:text-cream">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-terracotta" aria-hidden="true" />
                  {site.contact.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.contact.email}`} className="flex items-start gap-3 hover:text-cream">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-terracotta" aria-hidden="true" />
                  {site.contact.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-terracotta" aria-hidden="true" />
                {site.contact.hours}
              </li>
              {site.offices.map((o) => (
                <li key={o.street}>
                  <a
                    href={o.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-3 hover:text-cream"
                  >
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-terracotta" aria-hidden="true" />
                    <span>
                      {o.street}, {o.city}, {o.province} {o.postal}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-cream/10 pt-8 text-[0.8rem] leading-relaxed text-cream/50">
          <p>
            {site.legalName}, Licence {site.agentLicence}. Brokered by{" "}
            <a
              href={site.brokerage.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cream/70 underline decoration-cream/30 underline-offset-2 hover:text-cream"
            >
              {site.brokerage.name}
            </a>
            , FSRA Brokerage Licence {site.brokerage.licence}. Each mortgage application is subject to
            lender approval. Rates and lending guidelines change without notice.
          </p>
          <p className="mt-3">
            &copy; {year} {site.name}. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
