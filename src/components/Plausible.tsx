import Head from 'next/head'
import getConfig from '../lib/runtimeConfig'

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
