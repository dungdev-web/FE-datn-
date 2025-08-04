import type { NextConfig } from "next";
import path from 'path';

const nextConfig: NextConfig = {
  /* config options here */
    images: {
    domains: ['example.com'], 
  },
   webpack(config) {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      '@': path.resolve(__dirname, 'src'), 
    };
    return config;
  },

};

export default nextConfig;
