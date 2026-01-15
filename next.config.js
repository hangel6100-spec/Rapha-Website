/** @type {import('next').NextConfig} */
const nextConfig = {
 // output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  // Optimize for Cloudflare Pages
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConfig
