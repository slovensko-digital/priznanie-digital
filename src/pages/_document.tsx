import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <body>
          <Main />
          <NextScript />
          {/* <script src="javascript/libs.js"></script> */}
          {/* <script src="javascript/navody-digital-0.1.8.min.js" /> */}
          {/* <script>window.navodyDigitalFrontend.initAll()</script> */}
        </body>
      </Html>
    )
  }
}

export default MyDocument
