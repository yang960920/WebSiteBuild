/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        // Vercel Blob CDN 도메인
        protocol: "https",
        hostname: "**.public.blob.vercel-storage.com",
      },
    ],
  },
}

export default nextConfig;

