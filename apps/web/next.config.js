/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  experimental: {
    turbo: {
      rules: {
        "*.svg": {
          loaders: ["@svgr/webpack"],
          as: "*.js",
        },
      },
    },
    serverActions: {
      bodySizeLimit: "10Mb",
    },
    cssChunking: "strict",
    inlineCss: true,
  },
  api: {
    bodyParser: {
      sizeLimit: "10Mb",
    },
  },
  transpilePackages: ["@humming-vision/shared"],
  images: {
    remotePatterns: [
      new URL(
        "https://humming-vision-s3-bucket.s3.ap-northeast-2.amazonaws.com/**",
      ),
      new URL("https://humming-vision-s3-bucket.s3.amazonaws.com/**"),
      new URL("https://map.kakao.com/favicon.ico"),
      new URL("https://ssl.pstatic.net/static/maps/assets/icons/favicon.ico"),
    ],
  },
};

export default nextConfig;
