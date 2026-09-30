"use client";

/**
 * next/image loader for the static export. GitHub Pages can't resize images on request, so
 * scripts/build-images.mjs writes a WebP copy of every photo in public/images at each width
 * in src/lib/image-sizes.ts, and this points each srcset entry at the matching file:
 *   /images/photos/foo.jpg at 640px -> /images/generated/photos/foo-640.webp
 * Anything else (SVGs, remote URLs) is served as is.
 */
export default function imageLoader({ src, width }: { src: string; width: number }) {
  const match = src.match(/^(.*\/images)\/(.+)\.(jpe?g|png)$/i);
  if (!match) return src;
  return `${match[1]}/generated/${match[2]}-${width}.webp`;
}
