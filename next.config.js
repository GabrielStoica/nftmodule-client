/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_URL: process.env.API_URL,
    PROJECT_NAME: process.env.PROJECT_NAME,
    PROJECT_URL: process.env.PROJECT_URL,
    INFURA_PROJECT_ID: process.env.INFURA_PROJECT_ID,
    INFURA_API_SECRET_KEY: process.env.INFURA_API_SECRET_KEY,
    INFURA_API_ENDPOINT: process.env.INFURA_API_ENDPOINT,
    INFURA_DEDICATED_GATEWAY: process.env.INFURA_DEDICATED_GATEWAY,
  },
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;
