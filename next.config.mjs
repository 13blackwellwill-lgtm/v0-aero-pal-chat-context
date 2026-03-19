/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Disable caching during development to prevent hydration mismatches
  generateBuildId: async () => {
    return `build-${Date.now()}`
  },
}

export default nextConfig
