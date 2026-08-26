import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {},
  images: {
    localPatterns: [{ pathname: "/**" }],
  },
};

export default nextConfig;
