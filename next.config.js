/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  publicRuntimeConfig: {
    BASE_URL: process.env.BASE_URL,
    AUTHOR_URL: process.env.AUTHOR_URL,
    PAYMENT_URL: process.env.PAYMENT_URL,
    CHANNEL_URL: process.env.CHANNEL_URL,
    APP_ENV: process.env.APP_ENV,
    KONTENKU_URL: process.env.KONTENKU_URL,
    ADMIN_CRYPTO_SECRET: process.env.ADMIN_CRYPTO_SECRET,
    DOKU_API_URL: process.env.DOKU_API_URL,
  },
  serverRuntimeConfig: {
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
    FIREBASE_MESSAGING_SENDER: process.env.FIREBASE_MESSAGING_SENDER,
    FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
    MEASUREMENT_ID: process.env.MEASUREMENT_ID,
    PAYMENT_API_TOKEN: process.env.PAYMENT_API_TOKEN,
    ADMIN_EMAIL: process.env.ADMIN_EMAIL,
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
    DOKU_CLIENT_ID: process.env.DOKU_CLIENT_ID,
    DOKU_SECRET_KEY: process.env.DOKU_SECRET_KEY,
  },
};

module.exports = nextConfig;
