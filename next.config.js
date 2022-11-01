/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['i.imgur.com'],
  },
  env: {
    SUPABASE_API_URL: process.env.SUPABASE_API_URL,
    SUPABASE_API_KEY: process.env.SUPABASE_API_KEY,
  }
}

module.exports = nextConfig
