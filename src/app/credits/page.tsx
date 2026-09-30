import type { Metadata } from "next";
import Image from "next/image";
import { photos } from "@/content/photos";
import { assetPath } from "@/lib/paths";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Photo Credits",
  description: "Credits and licences for the openly licensed photos used on this site.",
  robots: { index: false, follow: true },
};

export default function CreditsPage() {
  return (
    <section className="py-14 sm:py-20">
      <Container size="narrow">
        <SectionHeading
          eyebrow="Credits"
          title="Photo credits"
          intro="Photos of Chad are his own. The other photos on this site are shared by their creators under open licences. Thank you to each of them."
        />
        <ul className="mt-10 divide-y divide-sand border-y border-sand">
          {Object.values(photos).map((p) => (
            <li key={p.src} className="flex items-center gap-5 py-5">
              <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-lg bg-cream-deep">
                <Image src={assetPath(p.src)} alt="" fill sizes="6rem" className="object-cover" />
              </div>
              <div className="text-[0.95rem] leading-relaxed">
                <p className="text-ink">{p.alt}</p>
                <p className="text-sm text-ink-soft">
                  By{" "}
                  <a href={p.source} target="_blank" rel="noopener noreferrer" className="text-terracotta underline-offset-2 hover:underline">
                    {p.author}
                  </a>
                  , {p.license === "CC0" ? "public domain" : "licensed under"}{" "}
                  <a href={p.licenseUrl} target="_blank" rel="noopener noreferrer" className="text-terracotta underline-offset-2 hover:underline">
                    {p.license === "CC0" ? "(CC0)" : p.license}
                  </a>
                  . Resized and cropped for this site.
                </p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
