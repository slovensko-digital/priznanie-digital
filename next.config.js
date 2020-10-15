module.exports = {
  typescript: {
    ignoreDevErrors: true,
  },
  publicRuntimeConfig: {
    withDebug: process.env.WITH_DEBUG === 'true',
    buildTimestamp: process.env.BUILD_TIMESTAMP,
    buildCommit: process.env.COMMIT,
  },
  webpack: (webpackConfig) => {
    const config = { ...webpackConfig }
    config.plugins = config.plugins || []

    config.plugins = [...config.plugins]

    return config
  },
}
