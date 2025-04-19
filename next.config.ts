import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
    domains: ['cdn.sanity.io'], // ← this is the fix
  },

  devIndicators: {
    buildActivity: false,
  },};

export default nextConfig;
