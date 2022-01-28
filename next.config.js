const { withSentryConfig } = require('@sentry/nextjs')

const moduleExports = {
  typescript: {
    ignoreDevErrors: true,
  },
  publicRuntimeConfig: {
    navodyBaseUrl: process.env.NAVODY_BASE_URL,
  },
  /**
   * Redirect to navody.
   * It is used in the beggining of the year when the updated version is not ready yet */
  // async redirects() {
  //   return [
  //     {
  //       source: '/',
  //       destination:
  //         'https://navody.digital/zivotne-situacie/elektronicke-podanie-danoveho-priznania',
  //       statusCode: 302,
  //     },
  //   ]
  // },
}

const sentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore

  silent: true, // Suppresses all logs
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
}

// Make sure adding Sentry options is the last code to run before exporting, to
// ensure that your source maps include changes from all other Webpack plugins
module.exports = withSentryConfig(moduleExports, sentryWebpackPluginOptions)
