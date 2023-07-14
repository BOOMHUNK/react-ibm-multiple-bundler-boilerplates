/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config) => {
    config = {
      ...config,
      resolve: {
        alias: {
          
        },
      },
    };

    return config;
  },
};

module.exports = nextConfig;
