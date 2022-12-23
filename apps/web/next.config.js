const withTM = require("next-transpile-modules")(["blockchain"]); // pass the modules you would like to see transpiled

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  i18n: {
    locales: ['en',],
    defaultLocale: 'en',
    localeDetection: false,
  },
};

module.exports = withTM(nextConfig);
