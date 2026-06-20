/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    // AlaSQL's package entry references optional Node/React-Native filesystem
    // deps it never needs for in-memory queries. Stub them so it bundles for
    // the browser without dragging in (and failing to parse) react-native.
    config.resolve.alias = {
      ...config.resolve.alias,
      "react-native$": false,
      "react-native-fs": false,
      "react-native-fetch-blob": false,
    };
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      path: false,
      crypto: false,
    };
    return config;
  },
};

export default nextConfig;
