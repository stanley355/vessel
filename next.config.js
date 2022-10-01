/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  publicRuntimeConfig: {
    BASE_URL: process.env.BASE_URL,
    AUTHOR_URL: process.env.AUTHOR_URL
  },
  serverRuntimeConfig: {
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
    FIREBASE_MESSAGING_SENDER: process.env.FIREBASE_MESSAGING_SENDER,
    FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
    MEASUREMENT_ID: process.env.MEASUREMENT_ID
  }
}

module.exports = nextConfig
