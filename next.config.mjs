const nextConfig = {
  /* config options here */
  typescript: {
    // WARNING, MUST BE REMOVED BEFORE PROD
    // FIXME,   MUST BE REMOVED BEFORE PROD
    ignoreBuildErrors: true,
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    }
  }
};

export default nextConfig;
