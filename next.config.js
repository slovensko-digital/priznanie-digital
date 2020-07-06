require('dotenv').config()

const path = require('path')
const Dotenv = require('dotenv-webpack')

let commitHash = require('child_process')
  .execSync('git rev-parse --short HEAD')
  .toString()

module.exports = {
  env: {
    commitHash,
  },
  typescript: {
    ignoreDevErrors: true,
  },
  webpack: (webpackConfig) => {
    const config = { ...webpackConfig }
    config.plugins = config.plugins || []

    config.plugins = [
      ...config.plugins,

      // Read the .env file
      new Dotenv({
        path: path.join(__dirname, '.env'),
        systemvars: true,
      }),
    ]

    return config
  },
}
