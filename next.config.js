/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};
const withTM = require("next-transpile-modules")(["@delab-team/connect"]); // pass the modules you would like to see transpiled
module.exports = withTM(nextConfig);
