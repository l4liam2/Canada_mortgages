import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import { BlogCard } from "@/components/Cards";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CtaBand } from "@/components/CtaBand";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Plain-language articles on buying your first home, choosing between fixed and variable rates, renewing, and refinancing in Ontario.",
};

export default function BlogIndexPage() {
  const posts = getAllPosts();
  const [lead, ...rest] = posts;
  return (
    <>
      <section className="py-14 sm:py-20">
        <Container size="wide">
          <SectionHeading
            eyebrow="Blog"
            title="Mortgage advice you can actually use"
            intro="Short, practical articles on the decisions that matter most. Written for real people, not for lenders."
          />
          {posts.length === 0 ? (
            <p className="mt-12 text-ink-soft">No articles yet. Check back soon.</p>
          ) : (
            <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              <div className="md:col-span-2 lg:col-span-3">
                <BlogCard post={lead} large />
              </div>
              {rest.map((p) => (
                <BlogCard key={p.slug} post={p} />
              ))}
            </div>
          )}
        </Container>
      </section>
      <CtaBand title="Have a question an article didn't answer?" body="Book a free call and get an answer that's specific to your situation." />
    </>
  );
}
