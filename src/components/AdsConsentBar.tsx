import { useEffect, useState } from 'react'
import { AdsConsent, captureClickId, setAdsConsent } from '../lib/conversion'

/**
 * Asks for consent to measure Google Ads conversions.
 *
 * Shown only to visitors who came from an ad click (URL contains `gclid`)
 * and have not decided yet. Rendered client-side only so server HTML matches.
 */
export const AdsConsentBar = () => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setVisible(captureClickId(window.location.search))
  }, [])

  if (!visible) {
    return null
  }

  const decide = (consent: AdsConsent) => {
    setAdsConsent(consent)
    setVisible(false)
  }

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-labelledby="ads-consent-desc"
      className="ads-consent"
    >
      <p id="ads-consent-desc" className="govuk-body ads-consent__message">
        Prišli ste k nám cez reklamu Google. Súhlasíte, aby sme si vo Vašom
        prehliadači zapamätali identifikátor kliknutia na reklamu a po dokončení
        formulára ho odoslali do Google Ads? Pomôže nám to merať účinnosť
        reklamy. Nepoužívame žiadne skripty tretích strán ani ďalšie údaje o
        Vás.
      </p>
      <div className="govuk-button-group">
        <button
          type="button"
          className="govuk-button"
          data-test="ads-consent-accept"
          onClick={() => decide('granted')}
        >
          Súhlasím
        </button>
        <button
          type="button"
          className="govuk-button govuk-button--secondary"
          data-test="ads-consent-decline"
          onClick={() => decide('denied')}
        >
          Nesúhlasím
        </button>
      </div>
      <style jsx>{`
        .ads-consent {
          position: fixed;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 9999;
          box-sizing: border-box;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 0 2em;
          padding: 1em 1.8em 0;
          background-color: #f3f2f1;
          border-top: 5px solid #1d70b8;
        }
        .ads-consent__message {
          flex: 1 1 30em;
        }
      `}</style>
    </div>
  )
}
