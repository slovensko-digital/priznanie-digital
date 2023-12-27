module.exports = {
  // to load runtime env vars we need to pass them via public runtime config (and disable static optimization)
  // this allows us to deploy one bundle into multiple envs
  publicRuntimeConfig: {
    isLive: process.env.NEXT_PUBLIC_isLive === "true" || false,
    isPostponeLive: process.env.NEXT_PUBLIC_isPostponeLive === "true" || false,
    navodyBaseUrl: process.env.NEXT_PUBLIC_navodyBaseUrl,
    priznanieStepUrl: process.env.NEXT_PUBLIC_priznanieStepUrl,
    odkladStepUrl: process.env.NEXT_PUBLIC_odkladStepUrl,
    plausibleDomain: process.env.NEXT_PUBLIC_plausibleDomain,
    odkladEmailTemplateId: process.env.NEXT_PUBLIC_odkladEmailTemplateId,
    priznanieEmailTemplateId: process.env.NEXT_PUBLIC_priznanieEmailTemplateId,
    autoformPublicToken: '61e4225378747a32f0e65ddd106a6fc18f5f82e81d58a539d86178a09128e47342ddc5d47ffe4073'
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
