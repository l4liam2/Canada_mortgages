import { OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/lib/og";
import { getAllPosts, getPost } from "@/lib/blog";

// Generated at build time (static export)
export const dynamic = "force-static";
export const alt = "Article by Chad Denie, Mortgage Agent";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  return ogImage({ eyebrow: post?.category ?? "Blog", title: post?.title ?? "Mortgage advice you can actually use" });
}
