import React from 'react'
import { googleTagManagerId } from '../lib/constants'

export const GoogleAnalytics = () => (
  <>
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
