const GCLID = 'Cj0KCQiA_test-GCLID_1234567890'

// fresh module per test, it keeps the pending click ID in memory
const load = () => {
  let mod: typeof import('../src/lib/conversion')
  jest.isolateModules(() => {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    mod = require('../src/lib/conversion')
  })
  return mod
}

const sendBeacon = jest.fn(() => true)

beforeEach(() => {
  window.localStorage.clear()
  sendBeacon.mockClear()
  Object.defineProperty(navigator, 'sendBeacon', {
    value: sendBeacon,
    configurable: true,
  })
})

describe('conversion tracking', () => {
  it('should ask for consent when landing with gclid and store nothing before it', () => {
    const { captureClickId } = load()

    expect(captureClickId(`?gclid=${GCLID}`)).toBe(true)
    expect(window.localStorage.length).toBe(0)
  })

  it('should not ask without gclid or with an invalid one', () => {
    const { captureClickId } = load()

    expect(captureClickId('')).toBe(false)
    expect(captureClickId('?gclid=bad!value')).toBe(false)
  })

  it('should track a conversion once after consent is granted', () => {
    const { captureClickId, setAdsConsent, trackConversion } = load()

    captureClickId(`?gclid=${GCLID}`)
    setAdsConsent('granted')
    trackConversion('priznanie')
    trackConversion('priznanie')
    trackConversion('odklad')

    expect(sendBeacon).toHaveBeenCalledTimes(2)
    expect(sendBeacon).toHaveBeenCalledWith('/api/conversion', expect.any(Blob))
  })

  it('should not track when consent is denied', () => {
    const { captureClickId, setAdsConsent, trackConversion } = load()

    captureClickId(`?gclid=${GCLID}`)
    setAdsConsent('denied')
    trackConversion('priznanie')

    expect(sendBeacon).not.toHaveBeenCalled()
    expect(window.localStorage.getItem('adsClickId')).toBeNull()
  })

  it('should remember the decision and not ask again', () => {
    load().setAdsConsent('denied')

    expect(load().captureClickId(`?gclid=${GCLID}`)).toBe(false)
  })

  it('should store a new gclid directly when consent was granted before', () => {
    load().setAdsConsent('granted')
    const { captureClickId, trackConversion } = load()

    expect(captureClickId(`?gclid=${GCLID}`)).toBe(false)
    trackConversion('odklad')

    expect(sendBeacon).toHaveBeenCalledTimes(1)
  })

  it('should ignore click IDs older than 90 days', () => {
    const { setAdsConsent, trackConversion } = load()
    setAdsConsent('granted')
    window.localStorage.setItem(
      'adsClickId',
      JSON.stringify({
        gclid: GCLID,
        timestamp: Date.now() - 91 * 24 * 60 * 60 * 1000,
      }),
    )

    trackConversion('priznanie')

    expect(sendBeacon).not.toHaveBeenCalled()
  })
})
