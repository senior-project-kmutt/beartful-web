const path = require('path');
const prefixpath = process.env.NODE_ENV == 'production' ? '/ssi1/' : ''
const nextConfig = {
  // distDir: 'build',
  assetPrefix: prefixpath,
  trailingSlash: true,
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  experimental: {
    outputStandalone: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
},
}

module.exports = nextConfig
