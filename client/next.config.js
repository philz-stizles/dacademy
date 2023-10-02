/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['thrangra.sirv.com', 'i.pravatar.cc', 'utfs.io'],
  },
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.(graphql|gql)/,
      exclude: /node_modules/,
      loader: 'graphql-tag/loader',
    });

    return config;
  },
};

module.exports = nextConfig;
