import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // ignoreBuildErrors: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    // missingSuspenseWithCSRBailout: false,
  },
  output: "export",
};

export default nextConfig;
