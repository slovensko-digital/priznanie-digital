import { useEffect, useRef, useState } from 'react'
import { AdsConsent, captureClickId, setAdsConsent } from '../lib/conversion'

type State = 'hidden' | 'question' | AdsConsent

/**
 * Asks for consent to measure Google Ads conversions.
 *
 * Shown only to visitors who came from an ad click (URL contains `gclid`)
 * and have not decided yet. Rendered client-side only so server HTML matches.
 *
 * Follows the GOV.UK cookie banner (https://design-system.service.gov.uk/components/cookie-banner/)
 * but with own class names, ad blockers hide `.govuk-cookie-banner`.
 */
export const AdsConsentBar = () => {
  const [state, setState] = useState<State>('hidden')
  const confirmation = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setState(captureClickId(window.location.search) ? 'question' : 'hidden')
  }, [])

  useEffect(() => {
    if (state === 'granted' || state === 'denied') {
      confirmation.current?.focus()
    }
  }, [state])

  if (state === 'hidden') {
    return null
  }

  const decide = (consent: AdsConsent) => {
    setAdsConsent(consent)
    setState(consent)
  }

  return (
    <div
      className="measurement-bar"
      role="region"
      aria-label="Cookies na priznanie.digital"
    >
      {state === 'question' ? (
        <div className="measurement-bar__message govuk-width-container">
          <div className="govuk-grid-row">
            <div className="govuk-grid-column-two-thirds">
              <p className="govuk-body">
                Používame cookies na meranie reklamy v Google Ads. Súhlasíte s
                ich použitím?
              </p>
            </div>
          </div>
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
              className="govuk-button"
              data-test="measurement-decline"
              onClick={() => decide('denied')}
            >
              Nesúhlasím
            </button>
          </div>
        </div>
      ) : (
        <div
          className="measurement-bar__message govuk-width-container"
          role="alert"
          tabIndex={-1}
          ref={confirmation}
        >
          <div className="govuk-grid-row">
            <div className="govuk-grid-column-two-thirds">
              <p className="govuk-body">
                {state === 'granted'
                  ? 'Súhlasili ste s použitím cookies na meranie reklamy.'
                  : 'Nesúhlasili ste s použitím cookies na meranie reklamy.'}
              </p>
            </div>
          </div>
          <div className="govuk-button-group">
            <button
              type="button"
              className="govuk-button"
              data-test="measurement-hide"
              onClick={() => setState('hidden')}
            >
              Skryť správu
            </button>
          </div>
        </div>
      )}
      <style jsx>{`
        .measurement-bar {
          padding-top: 20px;
          border-bottom: 10px solid transparent;
          background-color: #f3f2f1;
        }
        .measurement-bar__message {
          margin-bottom: -10px;
        }
        .measurement-bar__message:focus {
          outline: none;
        }
      `}</style>
    </div>
  )
}
