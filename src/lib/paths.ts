/** Base path the site is served under (e.g. "/Canada_morgages" on GitHub Pages, "" on a custom domain). */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/**
 * Prefix a root-relative asset path with the base path.
 * next/link handles this automatically; next/image (unoptimized), <img>, and metadata images do not.
 */
export function assetPath(path: string) {
  return `${BASE_PATH}${path.startsWith("/") ? path : `/${path}`}`;
}
