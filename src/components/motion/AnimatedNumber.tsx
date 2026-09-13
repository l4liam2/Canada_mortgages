"use client";

import { useEffect, useRef, useState } from "react";

/** Tweens between numeric values so calculator results glide instead of snapping. */
export function AnimatedNumber({
  value,
  format,
  duration = 450,
}: {
  value: number;
  format: (n: number) => string;
  duration?: number;
}) {
  const [display, setDisplay] = useState(value);
  const current = useRef(value);
  const raf = useRef(0);

  useEffect(() => {
    cancelAnimationFrame(raf.current);
    const from = current.current;
    const to = value;
    if (from === to) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      raf.current = requestAnimationFrame(() => {
        current.current = to;
        setDisplay(to);
      });
      return () => cancelAnimationFrame(raf.current);
    }
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const v = from + (to - from) * eased;
      current.current = v;
      setDisplay(v);
      if (t < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [value, duration]);

  return <span className="tabular-nums">{format(display)}</span>;
}
