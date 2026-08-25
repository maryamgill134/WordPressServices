/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  poweredByHeader: false,
  async redirects() {
    return [
      {
        source: "/services/maintain/wordpress-maintenance",
        destination: "/services/wordpress-maintenance",
        permanent: true,
      },
      {
        source: "/services/maintain/:service",
        destination: "/services/maintain",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
