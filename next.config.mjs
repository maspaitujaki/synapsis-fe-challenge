/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/blogs/1',
        permanent: true
      },
      {
        source: '/blogs',
        destination: '/blogs/1',
        permanent: true
      }
    ]
  }
};

export default nextConfig;
