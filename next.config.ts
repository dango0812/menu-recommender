import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,

  /** 이미지 도메인 설정 */
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'www.foodsafetykorea.go.kr',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.foodsafetykorea.go.kr',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
