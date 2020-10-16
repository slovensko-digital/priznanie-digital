module.exports = {
  typescript: {
    ignoreDevErrors: true,
  },
  publicRuntimeConfig: {
    withDebug: process.env.WITH_DEBUG === 'true',
  },
  webpack: (webpackConfig) => {
    const config = { ...webpackConfig }
    config.plugins = config.plugins || []

    config.plugins = [...config.plugins]

    return config
  },
}
