import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      // Add Cloudinary if needed later, e.g.:
      // {
      //   protocol: 'https',
      //   hostname: 'res.cloudinary.com',
      // },
    ],
  },
};

export default nextConfig;
