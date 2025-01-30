/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  publicRuntimeConfig: {
    // Available on both server and client
    theme: "DEFAULT",
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['picsum.photos']
  }
};

module.exports = nextConfig;
