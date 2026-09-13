import type { Metadata } from "next";
import { Clock, MessageSquare, ShieldCheck } from "lucide-react";
import { BookingEmbed } from "@/components/BookingEmbed";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Book a Free Call",
  description: "Schedule a free 20-minute mortgage consultation with Chad Denie by phone or video.",
};

const expectations = [
  { icon: Clock, title: "20 minutes", body: "Enough time to understand your situation and outline realistic next steps." },
  { icon: MessageSquare, title: "No jargon", body: "Bring your questions. You'll leave with clear answers, not a sales pitch." },
  { icon: ShieldCheck, title: "No obligation", body: "There's no cost and no pressure. If it's not the right time, that's fine." },
];

export default function BookPage() {
  return (
    <section className="py-14 sm:py-20">
      <Container size="wide">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading
              eyebrow="Book a call"
              title="Pick a time that works for you"
              intro="Phone or video, whichever you prefer. Evenings are available on request."
            />
            <ul className="mt-10 space-y-6">
              {expectations.map((e) => (
                <li key={e.title} className="flex gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-terracotta-tint text-terracotta">
                    <e.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-sans text-base font-semibold text-ink">{e.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-ink-soft">{e.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-8">
            <BookingEmbed />
          </div>
        </div>
      </Container>
    </section>
  );
}
