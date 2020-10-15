import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'
import getConfig from 'next/config'
import { GoogleAnalytics } from '../components/Analytics'

const { publicRuntimeConfig } = getConfig()

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head>
          <GoogleAnalytics id="UA-69285708-14" />
          <link rel="icon" href="/favicon.ico" />

          {/* Primary Meta Tags */}
          <title>Elektronické daňové priznanie</title>
          <meta name="title" content="Elektronické daňové priznanie" />
          <meta
            name="description"
            content="Daňové priznanie pre živnostníkov s paušálnymi výdavkami (DPFO typ B)"
          />

          {/* <!-- Open Graph / Facebook --> */}
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://priznanie.digital/" />
          <meta property="og:title" content="Elektronické daňové priznanie" />
          <meta
            property="og:description"
            content="Daňové priznanie pre živnostníkov s paušálnymi výdavkami (DPFO typ B)"
          />
          <meta
            property="og:image"
            content="/assets/images/priznanie-share-image.png"
          />

          {/* <!-- Twitter --> */}
          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:url" content="https://priznanie.digital/" />
          <meta
            property="twitter:title"
            content="Elektronické daňové priznanie"
          />
          <meta
            property="twitter:description"
            content="Daňové priznanie pre živnostníkov s paušálnymi výdavkami (DPFO typ B)"
          />
          <meta
            property="twitter:image"
            content="/assets/images/priznanie-share-image.png"
          />

          {publicRuntimeConfig.buildTimestamp && (
            <meta
              name="version"
              content={new Date(
                parseInt(publicRuntimeConfig.buildTimestamp, 10) * 1000,
              ).toISOString()}
            />
          )}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
