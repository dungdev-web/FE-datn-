import type { NextConfig } from "next";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");

const nextConfig: NextConfig = {
  images: {
    domains: ["example.com"], // domain ảnh API trả về
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.plugins.push(new CaseSensitivePathsPlugin());
    }
    return config;
  },
};

export default nextConfig;
