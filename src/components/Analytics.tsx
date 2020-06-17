import React from 'react'

export interface GoogleAnalyticsProps {
  id: string
}

export const GoogleAnalytics = ({ id }: GoogleAnalyticsProps) => (
  <>
    <script async src={`https://www.googletagmanager.com/gtag/js?id=${id}`} />
    <script
      dangerouslySetInnerHTML={{
        __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${id}');`,
      }}
    />
  </>
)
