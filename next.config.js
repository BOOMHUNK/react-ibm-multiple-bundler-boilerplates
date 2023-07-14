const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    unstable_runtimeJS: false
  },
  webpack: (config) => {
    config = {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve.alias,
          '~@ibm/plex': path.resolve('node_modules/@ibm/plex'),
          'react/jsx-dev-runtime.js': 'react/jsx-dev-runtime',
          'react/jsx-runtime.js': 'react/jsx-runtime',
        },
      },
    };

    return config;
  },
};

module.exports = nextConfig;
