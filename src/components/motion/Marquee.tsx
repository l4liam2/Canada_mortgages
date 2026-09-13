import type { ReactNode } from "react";

/**
 * Slow, continuous strip of items. Pure CSS; pauses on hover.
 * The track holds two identical rows so the loop is seamless: the second is hidden
 * from assistive tech, and from the page entirely when motion is reduced (the rows
 * wrap and centre instead of scrolling, so a duplicate would be visible).
 */
export function Marquee({ items, durationSeconds = 70 }: { items: ReactNode[]; durationSeconds?: number }) {
  const row = (clone: boolean) => (
    <ul
      aria-hidden={clone || undefined}
      data-marquee-clone={clone || undefined}
      className="flex shrink-0 items-center"
    >
      {items.map((item, i) => (
        <li key={`${clone ? "b" : "a"}-${i}`} className="flex shrink-0 items-center px-2 sm:px-3">
          {item}
        </li>
      ))}
    </ul>
  );
  return (
    <div className="marquee" style={{ "--marquee-duration": `${durationSeconds}s` } as React.CSSProperties}>
      <div className="marquee-track">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
