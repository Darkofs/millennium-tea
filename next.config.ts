import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // NOTE: 'output: export' was removed — it disables API routes (serverless functions).
  // Vercel handles Next.js natively; no static export is needed.
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
