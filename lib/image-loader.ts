import { pickWidth, variantPath } from "./image-variants.mjs";

/**
 * Image loader for static hosting: serves the pre-built responsive variant
 * (see scripts/optimize-images.mjs) under the site's base path.
 */
export default function imageLoader({ src, width }: { src: string; width: number }) {
  if (/^https?:\/\//.test(src)) return src;
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  if (src.startsWith("/images/")) return `${base}${variantPath(src, pickWidth(width))}`;
  return `${base}${src}?w=${width}`;
}
