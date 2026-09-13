"use client";

import { useState } from "react";
import type { PostMeta } from "@/lib/blog";
import { BlogCard } from "@/components/Cards";
import { RevealGroup } from "@/components/motion/Reveal";

export function BlogList({ posts }: { posts: PostMeta[] }) {
  const categories = ["All", ...Array.from(new Set(posts.map((p) => p.category)))];
  const [active, setActive] = useState("All");
  const shown = active === "All" ? posts : posts.filter((p) => p.category === active);
  const [lead, ...rest] = shown;

  return (
    <div>
      <div role="group" aria-label="Filter by topic" className="flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            aria-pressed={active === c}
            onClick={() => setActive(c)}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
              active === c ? "border-terracotta bg-terracotta text-white" : "border-sand bg-white text-ink-soft hover:border-terracotta hover:text-terracotta-dark"
            }`}
          >
            {c}
          </button>
        ))}
      </div>
      {shown.length === 0 ? (
        <p className="mt-10 text-ink-soft">No articles in this topic yet.</p>
      ) : (
        <RevealGroup className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <div className="md:col-span-2 lg:col-span-3">
            <BlogCard post={lead} large />
          </div>
          {rest.map((p) => (
            <BlogCard key={p.slug} post={p} />
          ))}
        </RevealGroup>
      )}
    </div>
  );
}
