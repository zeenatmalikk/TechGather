import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript:{
    ignoreBuildErrors: true,
  },
  images:{
    remotePatterns:[
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      }
    ]
  },
  reactCompiler:true,
  cacheComponents: true,
  experimental:{
    turbopackFileSystemCacheForDev: true,
  }
  /* config options here */
};

export default nextConfig;
