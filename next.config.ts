import type { NextConfig } from "next";

/**
 * Static export for GitHub Pages. The deploy workflow sets PAGES_BASE_PATH
 * (e.g. "/portfolio"); local `next dev` / `next build` are unaffected.
 */
const basePath = process.env.PAGES_BASE_PATH ?? "";
const staticExport = process.env.STATIC_EXPORT === "true";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  ...(staticExport && { output: "export", trailingSlash: true }),
  basePath: basePath || undefined,
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  images: staticExport
    ? // No image server on static hosting: a tiny loader just adds the base path.
      { loader: "custom", loaderFile: "./lib/image-loader.ts" }
    : {
        formats: ["image/avif", "image/webp"],
        // 95 is reserved for the hero portrait, where softness is most visible.
        qualities: [75, 95],
        remotePatterns: [{ protocol: "https", hostname: "avatars.githubusercontent.com" }],
      },
  experimental: {
    optimizePackageImports: ["lucide-react", "react-icons"],
  },
};

export default nextConfig;
