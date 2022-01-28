module.exports = {
  typescript: {
    ignoreDevErrors: true,
  },
  publicRuntimeConfig: {
    // navodyBaseUrl: 'https://navody.staging.slovensko.digital',
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
