/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['i.imgur.com'],
  },
  env: {
    // NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    // NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    SUPABASE_API_URL: process.env.SUPABASE_API_URL,
    SUPABASE_API_KEY: process.env.SUPABASE_API_KEY,
  }
}

module.exports = nextConfig
