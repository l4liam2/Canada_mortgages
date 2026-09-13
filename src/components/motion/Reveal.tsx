"use client";

import { useEffect, useRef, type ReactNode } from "react";

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Adds the reveal animation to elements that are below the fold when the page loads.
 * Elements already in view are left untouched, so nothing above the fold is hidden
 * and the largest-contentful-paint metric is unaffected. Without JS, content is simply visible.
 */
function observe(elements: HTMLElement[], stagger: number) {
  if (prefersReducedMotion() || !("IntersectionObserver" in window)) return () => {};
  const candidates = elements.filter((el) => el.getBoundingClientRect().top > window.innerHeight * 0.92);
  if (candidates.length === 0) return () => {};
  candidates.forEach((el, i) => {
    el.classList.add("reveal");
    el.style.setProperty("--reveal-delay", `${Math.min(i * stagger, 480)}ms`);
  });
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      }
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
  );
  candidates.forEach((el) => io.observe(el));
  return () => io.disconnect();
}

/** Reveals a single block. */
export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    return observe([el], delay);
  }, [delay]);
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

/** Reveals each direct child in sequence. Use it as the grid or list container. */
export function RevealGroup({
  children,
  className = "",
  stagger = 90,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  as?: "div" | "ul" | "ol" | "dl";
}) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    return observe(Array.from(el.children) as HTMLElement[], stagger);
  }, [stagger]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Component = Tag as any;
  return (
    <Component ref={ref} className={className}>
      {children}
    </Component>
  );
}
