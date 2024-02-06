const path = require('path');
const nextConfig = {
  // distDir: 'build',
  // basePath: '/ssi1',
  trailingSlash: true,
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  experimental: {
    outputStandalone: true,
  }
}

module.exports = nextConfig
