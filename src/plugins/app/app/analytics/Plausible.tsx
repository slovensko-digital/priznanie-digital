import Head from 'next/head'
import getConfig from 'next/config'

const {
  publicRuntimeConfig: { plausibleDomain },
} = getConfig()

export function Plausible() {
  return (
    <Head>
      <script
        defer
        data-domain={plausibleDomain}
        src="https://plausible.io/js/plausible.js"
      />
    </Head>
  )
}
