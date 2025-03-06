import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
},
  images: {
    domains: ["i.ibb.co","lh3.googleusercontent.com"], // Add your image hostname here
  },
};

export default nextConfig;
