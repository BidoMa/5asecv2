/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['js.hsforms.net', 'share.hsforms.com', 'forms.hsforms.com'],
    formats: ['image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.hsforms.net https://forms.hsforms.com *.hsforms.net; style-src 'self' 'unsafe-inline' https://js.hsforms.net *.hsforms.net; img-src 'self' data: https://js.hsforms.net *.hsforms.net; connect-src 'self' https://js.hsforms.net https://forms.hsforms.com https://api.hsforms.com *.hsforms.net; frame-src https://share.hsforms.com https://forms.hsforms.com *.hsforms.net;"
          }
        ],
      },
    ]
  },
}

export default nextConfig
