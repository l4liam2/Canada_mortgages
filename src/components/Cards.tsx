import Link from "next/link";
import { ArrowUpRight, Star } from "lucide-react";
import type { Service } from "@/content/services";
import type { Testimonial } from "@/content/testimonials";
import type { PostMeta } from "@/lib/blog";
import { formatDate } from "@/lib/format";

export function ServiceCard({ service }: { service: Service }) {
  const Icon = service.icon;
  return (
    <Link
      href={`/services#${service.slug}`}
      className="group relative flex flex-col rounded-2xl border border-sand bg-white p-7 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-terracotta/40 hover:shadow-lift"
    >
      <span className="grid h-12 w-12 place-items-center rounded-xl bg-terracotta-tint text-terracotta transition-colors group-hover:bg-terracotta group-hover:text-white">
        <Icon className="h-6 w-6" aria-hidden="true" />
      </span>
      <h3 className="mt-5 text-xl text-ink">{service.title}</h3>
      <p className="mt-2 flex-1 text-[0.95rem] leading-relaxed text-ink-soft">{service.short}</p>
      <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-terracotta">
        Learn more
        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
      </span>
    </Link>
  );
}

export function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < count ? "fill-terracotta text-terracotta" : "text-sand"}`}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

export function TestimonialCard({ t, featured = false }: { t: Testimonial; featured?: boolean }) {
  return (
    <figure
      className={`flex h-full flex-col rounded-2xl border border-sand bg-white p-7 shadow-soft ${
        featured ? "lg:p-9" : ""
      }`}
    >
      <Stars count={t.rating} />
      <blockquote className={`mt-4 flex-1 leading-relaxed text-ink ${featured ? "font-display text-xl" : "text-[0.98rem] text-ink-soft"}`}>
        &ldquo;{t.quote}&rdquo;
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-3 border-t border-sand pt-5">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-cream-deep font-display text-sm font-semibold text-terracotta-dark">
          {t.name.charAt(0)}
        </span>
        <span>
          <span className="block text-sm font-semibold text-ink">{t.name}</span>
          <span className="block text-xs text-muted">{t.detail}</span>
        </span>
      </figcaption>
    </figure>
  );
}

export function BlogCard({ post, large = false }: { post: PostMeta; large?: boolean }) {
  return (
    <article className="group flex h-full flex-col">
      <Link
        href={`/blog/${post.slug}`}
        className="flex h-full flex-col rounded-2xl border border-sand bg-white p-7 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-terracotta/40 hover:shadow-lift"
      >
        <div className="flex items-center gap-3 text-xs">
          <span className="rounded-full bg-terracotta-tint px-2.5 py-1 font-semibold text-terracotta-dark">
            {post.category}
          </span>
          <span className="text-muted">{post.readingTime}</span>
        </div>
        <h3 className={`mt-4 text-ink transition-colors group-hover:text-terracotta-dark ${large ? "text-2xl sm:text-3xl" : "text-xl"}`}>
          {post.title}
        </h3>
        <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-ink-soft">{post.excerpt}</p>
        <time dateTime={post.date} className="mt-5 block text-sm text-muted">
          {formatDate(post.date)}
        </time>
      </Link>
    </article>
  );
}
