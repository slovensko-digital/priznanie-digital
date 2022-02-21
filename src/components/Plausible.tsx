import Head from 'next/head'

export function Plausible() {
  return (
    <Head>
      <script
        defer
        data-domain={`${process.env.NEXT_PUBLIC_plausibleDomain}`}
        src="https://plausible.io/js/plausible.js"
      ></script>
    </Head>
  )
}
