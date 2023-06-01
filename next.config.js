/** @type {import("next").NextConfig} */

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});
module.exports = 
    withBundleAnalyzer({
      // experimental: { appDir: true },
      reactStrictMode: true,
      swcMinify: true,
      async redirects(){
        return[
          {
            source: "/aaa",
            destination: "/TodoItem",
            permanent: false
          }
        ]
      },
      compress: true,
      webpack(config, {webpack}){
          const prod = process.env.NODE_ENV === "production";
          const plugins = [...config.plugins];
          return{
              ...config,
              mode: prod ? "production" : "development",
              devtool: prod ? "hidden-source-map" : "eval",
              plugins,
          };
      },
  })
