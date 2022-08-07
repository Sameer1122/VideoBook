/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true
  },
  images: {
    domains: ['i.tribune.com.pk', 'lh3.googleusercontent.com'],
  },
  swcMinify: true,
}

module.exports = nextConfig
