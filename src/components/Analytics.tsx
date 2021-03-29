import React from 'react'
import { googleTagManagerId } from '../lib/constants'

export const GoogleAnalytics = () => (
  <>
    <script
      dangerouslySetInnerHTML={{
        __html: `<!-- Google Tag Manager -->
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-WWSVXWJ');
<!-- End Google Tag Manager -->`,
      }}
    />

    <script
      async
      src={`https://www.googletagmanager.com/gtag/js?id=${googleTagManagerId}`}
    />
    <script
      dangerouslySetInnerHTML={{
        __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${googleTagManagerId}');`,
      }}
    />
  </>
)

export const GoogleAnalyticsNoScript = () => (
  <>
    <noscript
      dangerouslySetInnerHTML={{
        __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WWSVXWJ" height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
      }}
    />
  </>
)
