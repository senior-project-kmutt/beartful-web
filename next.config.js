const path = require('path');
const nextConfig = {
  basePath: '/ssi1',
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  }
}

module.exports = nextConfig
