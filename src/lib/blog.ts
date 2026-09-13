import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type PostMeta = {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // ISO date, e.g. 2026-09-01
  category: string;
  readingTime: string;
  featured?: boolean;
};

export type Post = PostMeta & { content: string };

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

function readingTime(text: string) {
  const words = text.trim().split(/\s+/).length;
  return `${Math.max(1, Math.round(words / 220))} min read`;
}

function parse(file: string): Post {
  const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
  const { data, content } = matter(raw);
  const slug = file.replace(/\.mdx?$/, "");
  return {
    slug,
    title: String(data.title ?? slug),
    excerpt: String(data.excerpt ?? ""),
    date: String(data.date ?? "1970-01-01"),
    category: String(data.category ?? "Mortgage basics"),
    featured: Boolean(data.featured ?? false),
    readingTime: readingTime(content),
    content,
  };
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => /\.mdx?$/.test(f))
    .map(parse)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

/** Post metadata without the Markdown body, safe to pass to client components. */
export function getAllPostMeta(): PostMeta[] {
  return getAllPosts().map(({ slug, title, excerpt, date, category, readingTime, featured }) => ({
    slug,
    title,
    excerpt,
    date,
    category,
    readingTime,
    featured,
  }));
}

export function getPost(slug: string): Post | null {
  const safe = slug.replace(/[^a-z0-9-]/gi, "");
  const candidates = [`${safe}.md`, `${safe}.mdx`];
  for (const c of candidates) {
    if (fs.existsSync(path.join(BLOG_DIR, c))) return parse(c);
  }
  return null;
}

export { formatDate } from "./format";
