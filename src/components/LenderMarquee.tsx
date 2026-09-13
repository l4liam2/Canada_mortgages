import Image from "next/image";

import { Marquee } from "@/components/motion/Marquee";
import { lenders, type Lender } from "@/content/lenders";
import { assetPath } from "@/lib/paths";

/** Badge tints, cycled so the wall has rhythm without leaving the palette. */
const tones = ["bg-terracotta", "bg-espresso", "bg-sage"];

function LenderPlate({ lender, tone }: { lender: Lender; tone: string }) {
  const plate = "flex h-14 items-center rounded-xl border border-sand bg-white";

  if (lender.logo) {
    return (
      <div className={`${plate} px-5`}>
        <div className="relative h-7 w-24">
          <Image
            src={assetPath(`/images/lenders/${lender.logo}`)}
            alt={lender.name}
            fill
            sizes="6rem"
            className="object-contain"
          />
        </div>
      </div>
    );
  }

  // When the name opens with its own monogram (CWB, DUCA, IC Savings, B2B Bank) the
  // pair reads doubled, so the tile stands alone and the name is kept for screen
  // readers only -- the tile alone would announce "IC" rather than "IC Savings".
  const standalone = lender.name === lender.abbr || lender.name.startsWith(`${lender.abbr} `);

  return (
    <div className={`${plate} ${standalone ? "px-3" : "gap-3 pl-3 pr-5"}`}>
      <span
        aria-hidden="true"
        className={`flex h-9 min-w-9 items-center justify-center rounded-lg px-2 font-display font-semibold leading-none text-cream ${tone} ${
          lender.abbr.length > 2 ? "text-xs tracking-tight" : "text-sm"
        }`}
      >
        {lender.abbr}
      </span>
      <span className={standalone ? "sr-only" : "whitespace-nowrap text-sm font-medium text-ink"}>
        {lender.name}
      </span>
    </div>
  );
}

/** The home page lender wall: a logo plate per lender, scrolling slowly. */
export function LenderMarquee() {
  return (
    <Marquee
      items={lenders.map((lender, i) => (
        <LenderPlate key={lender.name} lender={lender} tone={tones[i % tones.length]} />
      ))}
    />
  );
}
