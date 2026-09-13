import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { site } from "@/config/site";
import { assetPath } from "@/lib/paths";
import { formatDate, getAllPosts, getPost } from "@/lib/blog";
import { BlogCard } from "@/components/Cards";
import { ShareRow } from "@/components/ShareRow";
import { LeadMagnet } from "@/components/LeadMagnet";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

function MarkdownLink({ href = "", children }: { href?: string; children?: React.ReactNode }) {
  if (href.startsWith("/")) {
    return <Link href={href}>{children}</Link>;
  }
  const external = /^https?:/.test(href);
  return (
    <a href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
      {children}
    </a>
  );
}

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Article not found" };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      publishedTime: post.date,
      authors: [site.name],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = getAllPosts().filter((p) => p.slug !== post.slug).slice(0, 2);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { "@type": "Person", name: site.name, url: site.url },
    publisher: { "@type": "Person", name: site.name },
    mainEntityOfPage: `${site.url}/blog/${post.slug}`,
  };

  return (
    <>
      <article className="py-14 sm:py-20">
        <Container size="narrow">
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-medium text-terracotta hover:text-terracotta-dark">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            All articles
          </Link>
          <header className="mt-6">
            <div className="flex flex-wrap items-center gap-3 text-xs">
              <span className="rounded-full bg-terracotta-tint px-2.5 py-1 font-semibold text-terracotta-dark">
                {post.category}
              </span>
              <time dateTime={post.date} className="text-muted">
                {formatDate(post.date)}
              </time>
              <span className="text-muted">{post.readingTime}</span>
            </div>
            <h1 className="mt-5 text-4xl leading-[1.1] text-ink sm:text-5xl">{post.title}</h1>
            <p className="mt-5 text-xl leading-relaxed text-ink-soft">{post.excerpt}</p>
            <div className="mt-8 flex items-center gap-4 border-y border-sand py-5">
              <div className="relative h-12 w-12 overflow-hidden rounded-full">
                <Image src={assetPath("/images/chad-denie-square.jpg")} alt="" fill sizes="48px" className="object-cover" />
              </div>
              <div>
                <p className="text-sm font-semibold text-ink">{site.name}</p>
                <p className="text-xs text-muted">
                  {site.title}, {site.brokerage.shortName}
                </p>
              </div>
            </div>
          </header>

          <div className="prose-article mt-10">
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={{ a: MarkdownLink }}>
              {post.content}
            </ReactMarkdown>
          </div>

          <div className="mt-10 border-t border-sand pt-6">
            <ShareRow url={`${site.url}/blog/${post.slug}/`} title={post.title} />
          </div>

          <aside className="mt-14 rounded-2xl bg-espresso p-8 text-cream">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cream/55">Talk it through</p>
            <h2 className="mt-2 text-2xl text-cream">Want this applied to your numbers?</h2>
            <p className="mt-2 text-cream/75">
              A free 20-minute call is the fastest way to find out what this means for you.
            </p>
            <Button href="/book" variant="onDark" className="mt-6">
              Book a free call <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </aside>

          <div className="mt-6">
            <LeadMagnet variant="compact" />
          </div>
        </Container>
      </article>

      {related.length > 0 && (
        <section className="border-t border-sand bg-white py-16">
          <Container size="wide">
            <h2 className="text-2xl text-ink">Keep reading</h2>
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {related.map((p) => (
                <BlogCard key={p.slug} post={p} />
              ))}
            </div>
          </Container>
        </section>
      )}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
    </>
  );
}
