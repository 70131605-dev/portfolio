import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Base path the site is served under ("" locally, "/QaiserShaban" on GitHub Pages). */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Prefix a root-relative URL for plain <a>/<img> tags (next/link and the image loader handle this themselves). */
export const withBase = (path: string) => (path.startsWith("/") ? `${basePath}${path}` : path);

/** Home-page anchors work from any route. */
export function sectionHref(id: string, onHome: boolean) {
  return onHome ? `#${id}` : withBase(`/#${id}`);
}
