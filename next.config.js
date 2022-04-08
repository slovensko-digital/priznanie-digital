module.exports = {
  publicRuntimeConfig: {
    navodyBaseUrl: process.env.NEXT_PUBLIC_navodyBaseUrl,
    plausibleDomain: process.env.NEXT_PUBLIC_plausibleDomain,
    odkladEmailTemplateId: process.env.NEXT_PUBLIC_odkladEmailTemplateId,
    priznanieEmailTemplateId: process.env.NEXT_PUBLIC_priznanieEmailTemplateId,
  },
  typescript: {
    ignoreDevErrors: true,
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
