module.exports = {
  // runtime env vars (NEXT_PUBLIC_*) are read at run time in src/lib/runtimeConfig.ts
  // this allows us to deploy one bundle into multiple envs
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
