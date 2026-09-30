/**
 * Widths next/image may request, shared by next.config.ts (to build each srcset) and
 * scripts/build-images.mjs (to write a WebP file at every one of them).
 * Keep the lists short: every width is another file per source image.
 */
export const deviceSizes = [640, 828, 1080, 1280, 1920];
export const imageSizes = [96, 256, 384];
