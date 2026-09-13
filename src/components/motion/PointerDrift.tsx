"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Lets decorative children drift a few pixels toward the pointer.
 * Mark targets with data-drift="<strength>", e.g. data-drift="0.03". Fine pointers only.
 */
export function PointerDrift({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const targets = Array.from(root.querySelectorAll<HTMLElement>("[data-drift]"));
    if (targets.length === 0) return;
    let raf = 0;
    let dx = 0;
    let dy = 0;
    const apply = () => {
      raf = 0;
      for (const t of targets) {
        const k = Number(t.dataset.drift ?? 0.02);
        t.style.transform = `translate(${(dx * k).toFixed(1)}px, ${(dy * k).toFixed(1)}px)`;
      }
    };
    const onMove = (e: PointerEvent) => {
      const r = root.getBoundingClientRect();
      dx = e.clientX - (r.left + r.width / 2);
      dy = e.clientY - (r.top + r.height / 2);
      if (!raf) raf = requestAnimationFrame(apply);
    };
    const onLeave = () => {
      dx = 0;
      dy = 0;
      if (!raf) raf = requestAnimationFrame(apply);
    };
    root.addEventListener("pointermove", onMove);
    root.addEventListener("pointerleave", onLeave);
    return () => {
      root.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
