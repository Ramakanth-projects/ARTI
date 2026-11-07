import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Cache Components enables the Next.js 16 caching model. Route segments opt
  // into request-time rendering explicitly via `connection()`.
  cacheComponents: true,
  partialPrefetching: true,
  // Tailwind v4 is compiled by the Turbopack rule below rather than PostCSS.
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  poweredByHeader: false,
};

export default nextConfig;
