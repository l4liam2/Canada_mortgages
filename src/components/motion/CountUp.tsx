"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Counts a stat like "30+" or "$0" up from zero when it scrolls into view.
 * The final value is server-rendered, so nothing flashes if JS is slow or motion is reduced.
 */
export function CountUp({ value, duration = 1200 }: { value: string; duration?: number }) {
  const match = value.match(/^([^\d]*)(\d[\d,]*)(.*)$/);
  const prefix = match?.[1] ?? "";
  const target = match ? Number(match[2].replace(/,/g, "")) : NaN;
  const suffix = match?.[3] ?? "";
  const [display, setDisplay] = useState<number | null>(null);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || Number.isNaN(target) || target === 0) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return; // already visible: no animation
    let raf = 0;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 3);
          setDisplay(Math.round(target * eased));
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [target, duration]);

  if (Number.isNaN(target)) return <span ref={ref}>{value}</span>;
  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {(display ?? target).toLocaleString("en-CA")}
      {suffix}
    </span>
  );
}
