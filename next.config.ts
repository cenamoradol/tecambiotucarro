import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'pub-9148b91f5d944a5aa1b18d9846c58f94.r2.dev',
      },
      {
        protocol: 'https',
        hostname: 'dummyimage.com',
      },
      {
        protocol: 'https',
        hostname: 'media2.giphy.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.pixabay.com',
      },
    ],
    // AVIF/WebP: ~30% menos bytes que el JPEG original que devuelve R2
    formats: ['image/avif', 'image/webp'],
    // Sin 3840: las fotos de vehiculo se piden a 640-1920 y no a 4K
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    qualities: [75, 90],
    // 7 dias: las fotos de vehiculo son URLs con UUID (nunca cambian)
    minimumCacheTTL: 604800,
  },
};

export default nextConfig;
