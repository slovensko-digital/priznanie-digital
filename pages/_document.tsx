import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }
  render() {
    return (
      <Html>
        <Head>
          <link rel="icon" href="/favicon.ico" />

          <link rel="stylesheet" href="/stylesheets/libs.css"></link>
          <link
            rel="stylesheet"
            href="/stylesheets/navody-digital-0.1.8.min.css"
          ></link>
        </Head>
        <body>
          <Main />
          <NextScript />
          <script src="javascript/libs.js"></script>
          <script src="javascript/navody-digital-0.1.8.min.js"></script>
          <script>window.GOVUKFrontend.initAll()</script>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
