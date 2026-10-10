import { site } from "@/data/site";

/** Social preview image, shared by every page's Open Graph / Twitter metadata. */
export const ogImage = {
  url: "/og.jpg",
  type: "image/jpeg",
  width: 1200,
  height: 630,
  alt: `${site.name} — ${site.title} & ${site.subtitle}`,
};
