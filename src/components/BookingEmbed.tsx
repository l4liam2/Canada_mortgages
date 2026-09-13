import { CalendarCheck, ExternalLink, Phone } from "lucide-react";
import { site } from "@/config/site";
import { Button } from "@/components/ui/Button";

const isConfigured = !site.links.booking.includes("YOUR-HANDLE");

export function BookingEmbed() {
  if (!isConfigured) {
    return (
      <div className="rounded-2xl border border-dashed border-terracotta/40 bg-terracotta-tint/40 p-8 text-center">
        <CalendarCheck className="mx-auto h-8 w-8 text-terracotta" aria-hidden="true" />
        <h3 className="mt-4 text-xl text-ink">Online booking coming soon</h3>
        <p className="mx-auto mt-2 max-w-md text-ink-soft">
          Until the calendar is connected, the fastest way to reach Chad is a quick call or the
          contact form.
        </p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <Button href={site.contact.phoneHref}>
            <Phone className="h-4 w-4" aria-hidden="true" />
            Call {site.contact.phone}
          </Button>
          <Button href="/contact" variant="secondary">
            Send a message
          </Button>
        </div>
        <p className="mt-6 text-xs text-muted">
          Site owner: paste your Calendly link into <code>links.booking</code> in{" "}
          <code>src/config/site.ts</code> to activate this widget.
        </p>
      </div>
    );
  }

  const src = `${site.links.booking}?hide_gdpr_banner=1&background_color=faf6f0&text_color=2a211c&primary_color=c2553a`;
  return (
    <div>
      <div className="overflow-hidden rounded-2xl border border-sand bg-white shadow-soft">
        <iframe
          title="Book a call with Chad Denie"
          src={src}
          className="h-[720px] w-full"
          loading="lazy"
        />
      </div>
      <p className="mt-4 text-center text-sm text-muted">
        Calendar not loading?{" "}
        <a
          href={site.links.booking}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-terracotta underline underline-offset-2"
        >
          Open it in a new tab <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
      </p>
    </div>
  );
}
