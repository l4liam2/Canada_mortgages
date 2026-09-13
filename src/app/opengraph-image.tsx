import { OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/lib/og";

// Generated at build time (static export)
export const dynamic = "force-static";
export const alt = "Mortgages explained clearly. Decisions made confidently. | Chad Denie, Mortgage Agent";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogImage({ eyebrow: "Toronto mortgage agent", title: "Mortgages explained clearly. Decisions made confidently." });
}
