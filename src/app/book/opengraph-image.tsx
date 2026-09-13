import { OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/lib/og";

// Generated at build time (static export)
export const dynamic = "force-static";
export const alt = "Pick a time that works for you | Chad Denie, Mortgage Agent";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogImage({ eyebrow: "Book a call", title: "Pick a time that works for you" });
}
