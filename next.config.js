module.exports = {
  typescript: {
    ignoreDevErrors: true,
  },
  publicRuntimeConfig: {
    navodyBaseUrl: process.env.NAVODY_BASE_URL,
  },
  webpack: (webpackConfig) => {
    const config = { ...webpackConfig }
    config.plugins = config.plugins || []

    config.plugins = [...config.plugins]

    return config
  },
  async redirects() {
    return [
      {
        source: '/',
        destination:
          'https://navody.digital/zivotne-situacie/elektronicke-podanie-danoveho-priznania',
        statusCode: 302,
      },
    ]
  },
}
