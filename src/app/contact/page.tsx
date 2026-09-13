import type { Metadata } from "next";
import { ArrowUpRight, Clock, Mail, MapPin, MessageSquare, Phone } from "lucide-react";
import { site } from "@/config/site";
import { ContactForm } from "@/components/ContactForm";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LinkedInIcon } from "@/components/ui/LinkedInIcon";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with Chad Denie, Toronto mortgage agent. Call ${site.contact.phone}, email, or send a message and hear back within one business day.`,
};

export default function ContactPage() {
  return (
    <section className="py-14 sm:py-20">
      <Container size="wide">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Contact"
              title="Let's talk about your mortgage"
              intro="Send a message, call, or book a time directly. Every inquiry gets a personal reply, usually within one business day."
            />

            <ul className="mt-10 space-y-5">
              <li className="flex gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-terracotta-tint text-terracotta">
                  <Phone className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">Phone</p>
                  <a href={site.contact.phoneHref} className="mt-0.5 block text-lg font-medium text-ink hover:text-terracotta">
                    {site.contact.phone}
                  </a>
                </div>
              </li>
              {site.contact.smsHref && (
                <li className="flex gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-terracotta-tint text-terracotta">
                    <MessageSquare className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">Text</p>
                    <a href={site.contact.smsHref} className="mt-0.5 block text-lg font-medium text-ink hover:text-terracotta">
                      Send a text message
                    </a>
                    <p className="text-sm text-ink-soft">Quick questions welcome</p>
                  </div>
                </li>
              )}
              <li className="flex gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-terracotta-tint text-terracotta">
                  <Mail className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">Email</p>
                  <a href={`mailto:${site.contact.email}`} className="mt-0.5 block text-lg font-medium text-ink hover:text-terracotta">
                    {site.contact.email}
                  </a>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-terracotta-tint text-terracotta">
                  <Clock className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">Hours</p>
                  <p className="mt-0.5 text-lg font-medium text-ink">{site.contact.hours}</p>
                  <p className="text-sm text-ink-soft">Evenings and weekends by appointment</p>
                </div>
              </li>
              {site.offices.map((o) => (
                <li key={o.street} className="flex gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-terracotta-tint text-terracotta">
                    <MapPin className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">{o.label}</p>
                    <a
                      href={o.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-0.5 inline-flex items-center gap-1 text-lg font-medium text-ink hover:text-terracotta"
                    >
                      {o.street}
                      <ArrowUpRight className="h-4 w-4 text-muted" aria-hidden="true" />
                    </a>
                    <p className="text-sm text-ink-soft">
                      {o.city}, {o.province} {o.postal}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Button href="/book">Book a call instead</Button>
              <Button href={site.links.linkedin} external variant="secondary">
                <LinkedInIcon className="h-4 w-4" />
                LinkedIn
              </Button>
            </div>
          </div>

          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </Container>
    </section>
  );
}
