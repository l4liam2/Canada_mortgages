import { OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/lib/og";

// Generated at build time (static export)
export const dynamic = "force-static";
export const alt = "Real people, real mortgages, honest feedback | Chad Denie, Mortgage Agent";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogImage({ eyebrow: "Client stories", title: "Real people, real mortgages, honest feedback" });
}
