import Head from 'next/head'

export function Plausible() {
  return (
    <Head>
      <script
        defer
        data-domain="priznanie.digital"
        src="https://plausible.io/js/plausible.js"
      ></script>
    </Head>
  )
}
