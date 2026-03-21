import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "freight.cargo.site",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "i.vimeocdn.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.the3dapp.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
