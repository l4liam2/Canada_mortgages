import type { Metadata } from "next";
import { Clock, Lock, Sparkles } from "lucide-react";
import { GetStartedWizard } from "@/components/GetStartedWizard";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Get Pre-Qualified",
  description:
    "Answer a few quick questions and Chad Denie will map out what you qualify for, with no credit check and no obligation.",
};

const points = [
  { icon: Clock, title: "Two minutes", body: "Four short steps. No documents needed yet." },
  { icon: Lock, title: "No credit check", body: "Nothing touches your credit until you decide to apply." },
  { icon: Sparkles, title: "A real plan back", body: "Chad replies with realistic numbers and next steps, not a form letter." },
];

export default function GetStartedPage() {
  return (
    <section className="py-14 sm:py-20">
      <Container size="wide">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading
              eyebrow="Get started"
              title="Find out where you stand"
              intro="Tell Chad a little about what you're hoping to do. He'll come back with what's realistic, what it costs, and what to do first."
            />
            <ul className="mt-10 space-y-6">
              {points.map((p) => (
                <li key={p.title} className="flex gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-terracotta-tint text-terracotta">
                    <p.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-sans text-base font-semibold text-ink">{p.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-ink-soft">{p.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-8">
            <GetStartedWizard />
          </div>
        </div>
      </Container>
    </section>
  );
}
