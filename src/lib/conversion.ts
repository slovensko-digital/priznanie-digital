/**
 * First-party Google Ads conversion tracking.
 *
 * Instead of loading a third-party tag, we remember the `gclid` from the ad
 * click (only with the user's consent) and report the conversion to our own
 * API, which appends it to a CSV that Google Ads imports on a schedule.
 * https://support.google.com/google-ads/answer/10702932
 */

export type ConversionType = 'priznanie' | 'odklad'
export type AdsConsent = 'granted' | 'denied'

interface StoredClickId {
  gclid: string
  timestamp: number
}

const CONSENT_KEY = 'adsConsent'
const CLICK_ID_KEY = 'adsClickId'
const REPORTED_KEY = 'adsReportedConversions'

// Google Ads accepts conversions up to 90 days after the click
const CLICK_ID_MAX_AGE = 90 * 24 * 60 * 60 * 1000

// Click ID from the landing URL, kept in memory until the user decides on consent
let pendingClickId: string | null = null

export const isValidClickId = (value: unknown): value is string =>
  typeof value === 'string' && /^[A-Za-z0-9_-]{10,512}$/.test(value)

const read = (key: string): string | null => {
  try {
    return window.localStorage.getItem(key)
  } catch (_error) {
    return null
  }
}

const write = (key: string, value: string) => {
  try {
    window.localStorage.setItem(key, value)
  } catch (_error) {
    // storage unavailable (private mode, blocked), tracking is best-effort
  }
}

export const getAdsConsent = (): AdsConsent | null => {
  const value = read(CONSENT_KEY)
  return value === 'granted' || value === 'denied' ? value : null
}

const storeClickId = (gclid: string) =>
  write(
    CLICK_ID_KEY,
    JSON.stringify({ gclid, timestamp: Date.now() } as StoredClickId),
  )

const getStoredClickId = (): string | null => {
  try {
    const { gclid, timestamp } = JSON.parse(read(CLICK_ID_KEY)) as StoredClickId
    if (isValidClickId(gclid) && Date.now() - timestamp < CLICK_ID_MAX_AGE) {
      return gclid
    }
  } catch (_error) {
    // missing or malformed
  }
  return null
}

/**
 * Picks up `gclid` from the landing URL.
 * Returns true when the user still has to be asked for consent.
 */
export const captureClickId = (search: string): boolean => {
  const gclid = new URLSearchParams(search).get('gclid')
  if (!isValidClickId(gclid)) {
    return false
  }

  const consent = getAdsConsent()
  if (consent === 'granted') {
    storeClickId(gclid)
    return false
  }
  if (consent === 'denied') {
    return false
  }

  pendingClickId = gclid
  return true
}

export const setAdsConsent = (consent: AdsConsent) => {
  write(CONSENT_KEY, consent)
  if (consent === 'granted' && pendingClickId) {
    storeClickId(pendingClickId)
  }
  pendingClickId = null
}

const getReportedConversions = (): string[] => {
  try {
    const value = JSON.parse(read(REPORTED_KEY))
    return Array.isArray(value) ? value : []
  } catch (_error) {
    return []
  }
}

export const trackConversion = (type: ConversionType) => {
  if (getAdsConsent() !== 'granted') {
    return
  }
  const gclid = getStoredClickId()
  if (!gclid) {
    return
  }

  const reportedKey = `${gclid}:${type}`
  const reported = getReportedConversions()
  if (reported.includes(reportedKey)) {
    return
  }

  const body = JSON.stringify({ gclid, type })
  // sendBeacon survives the redirect to Návody.Digital that follows right after
  const sent =
    typeof navigator.sendBeacon === 'function' &&
    navigator.sendBeacon(
      '/api/conversion',
      new Blob([body], { type: 'application/json' }),
    )
  if (!sent) {
    fetch('/api/conversion', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
      keepalive: true,
    }).catch(() => {})
  }

  write(REPORTED_KEY, JSON.stringify([...reported, reportedKey]))
}
