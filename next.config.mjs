/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Add all external domains you use for images
    remotePatterns: [
      {
        protocol: "https",
        hostname: "backend.scootylelo.com",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "8005",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "192.168.2.124",
        port: "8005",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
