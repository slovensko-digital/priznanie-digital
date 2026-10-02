// Replacement for `next/config` publicRuntimeConfig, which was removed in Next.js 16.
// Values are read from env vars at run time (not build time), so one bundle can be deployed into multiple envs.
// On the server they are read from process.env, on the client from the script injected in _document.

export interface PublicRuntimeConfig {
  isLive: boolean
  isPostponeLive: boolean
  navodyBaseUrl?: string
  priznanieStepUrl?: string
  odkladStepUrl?: string
  informujteMaKedBudeLive?: string
  plausibleDomain?: string
  odkladEmailTemplateId?: string
  priznanieEmailTemplateId?: string
  autoformPublicToken: string
}

declare global {
  interface Window {
    __PUBLIC_RUNTIME_CONFIG__?: PublicRuntimeConfig
  }
}

export const PUBLIC_RUNTIME_CONFIG_SCRIPT_ID = '__PUBLIC_RUNTIME_CONFIG__'

// computed key access prevents Next.js from inlining NEXT_PUBLIC_* values at build time
const readEnv = (name: string): string | undefined => {
  const env = process.env
  return env[`NEXT_PUBLIC_${name}`]
}

const readFromEnv = (): PublicRuntimeConfig => ({
  isLive: readEnv('isLive') === 'true',
  isPostponeLive: readEnv('isPostponeLive') === 'true',
  navodyBaseUrl: readEnv('navodyBaseUrl'),
  priznanieStepUrl: readEnv('priznanieStepUrl'),
  odkladStepUrl: readEnv('odkladStepUrl'),
  informujteMaKedBudeLive: readEnv('informujteMaKedBudeLive'),
  plausibleDomain: readEnv('plausibleDomain'),
  odkladEmailTemplateId: readEnv('odkladEmailTemplateId'),
  priznanieEmailTemplateId: readEnv('priznanieEmailTemplateId'),
  autoformPublicToken:
    '61e4225378747a32f0e65ddd106a6fc18f5f82e81d58a539d86178a09128e47342ddc5d47ffe4073',
})

export const getPublicRuntimeConfig = (): PublicRuntimeConfig =>
  typeof window === 'undefined'
    ? readFromEnv()
    : (window.__PUBLIC_RUNTIME_CONFIG__ ?? readFromEnv())

// serialized for an inline <script>; `<` is escaped so values cannot close the script tag
export const serializePublicRuntimeConfig = (): string =>
  `window.__PUBLIC_RUNTIME_CONFIG__=${JSON.stringify(readFromEnv()).replace(
    /</g,
    '\\u003c',
  )}`

const getConfig = () => ({ publicRuntimeConfig: getPublicRuntimeConfig() })

export default getConfig
