const nextConfig = {
  /* config options here */
  typescript: {
    // WARNING, MUST BE REMOVED BEFORE PROD
    // FIXME,   MUST BE REMOVED BEFORE PROD
    ignoreBuildErrors: true,
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    }
  }
};

export default nextConfig;
