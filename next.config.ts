import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  turbopack: {},
  images: {
    localPatterns: [{ pathname: "/**" }],
  },
};

export default nextConfig;
