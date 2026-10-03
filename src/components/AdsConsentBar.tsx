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
      aria-labelledby="measurement-bar-desc"
      className="measurement-bar"
    >
      <p
        id="measurement-bar-desc"
        className="govuk-body measurement-bar__message"
      >
        Používame cookies na meranie reklamy v Google Ads. Súhlasíte s ich
        použitím?
      </p>
      <div className="govuk-button-group">
        <button
          type="button"
          className="govuk-button"
          data-test="measurement-accept"
          onClick={() => decide('granted')}
        >
          Súhlasím
        </button>
        <button
          type="button"
          className="govuk-button govuk-button--secondary"
          data-test="measurement-decline"
          onClick={() => decide('denied')}
        >
          Nesúhlasím
        </button>
      </div>
      <style jsx>{`
        .measurement-bar {
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
        .measurement-bar__message {
          flex: 1 1 30em;
        }
      `}</style>
    </div>
  )
}
