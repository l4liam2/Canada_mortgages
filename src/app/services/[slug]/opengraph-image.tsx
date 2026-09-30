import { OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/lib/og";
import { getService, services } from "@/content/services";

// Generated at build time (static export)
export const dynamic = "force-static";
export const alt = "Mortgage services from Chad Denie, Mortgage Agent";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);
  return ogImage({ eyebrow: "Services", title: service?.short ?? "Mortgage solutions for every stage of home ownership" });
}
