// next.config.ts or next.config.js
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // disable Next.js’s LightningCSS optimizer to avoid the missing .node binary error
  experimental: {
    optimizeCss: false,
  },
}

export default nextConfig
