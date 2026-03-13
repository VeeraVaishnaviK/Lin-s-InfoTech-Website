import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['localhost', 'images.unsplash.com', 'res.cloudinary.com'],
  },
  // Add other config options here if needed in the future
};

export default nextConfig;
