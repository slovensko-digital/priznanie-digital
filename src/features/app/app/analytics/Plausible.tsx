import Head from 'next/head'
import getConfig from 'next/config'

const {
  publicRuntimeConfig: { plausibleDomain },
} = getConfig()

// TODO: fixnut warning
// Do not add <script> tags using next/head (see <script> tag with src="https://plausible.io/js/plausible.js"). Use next/script instead. 
// See more info here: https://nextjs.org/docs/messages/no-script-tags-in-head-component

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
