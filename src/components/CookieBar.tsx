import React, { useEffect, useState } from 'react'
import { parseCookies, setCookie } from 'nookies'

/**
 * Displays GDPR cookie consent message.
 *
 * Does not read cookies server-side in getInitialProps() to benefit from NextJS static HTML export.
 * https://nextjs.org/docs/advanced-features/static-html-export
 *
 * Hide the consent message by default to ensure server-side HTML is the same as client-side.
 * Display the consent message only client-side if it was not closed yet.
 */
export const CookieBar = () => {
  const [accepted, setAccepted] = useState(true)
  const { cookieConsent } = parseCookies()

  useEffect(() => {
    setAccepted(cookieConsent === 'accepted')
  }, [setAccepted, cookieConsent])

  if (accepted) {
    return null
  }

  const onAccept = () => {
    setCookie(null, 'cookieConsent', 'accepted', {
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
    })
    setAccepted(true)
  }

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="cookieconsent"
      className="cc-window cc-banner  cc-bottom cc-color-override-1352241038 "
    >
      <span id="cookieconsent:desc" className="cc-message">
        Tento web používa súbory cookie na poskytovanie služieb a analýzu webu.
        Používaním tohto webu vyjadrujete svoj súhlas s používaním súborov
        cookie.
      </span>
      <div className="cc-compliance">
        <button
          type="button"
          className="govuk-button govuk-!-margin-left-3 govuk-button--large"
          onClick={onAccept}
        >
          OK
        </button>
      </div>
      <style jsx>{`
        .cc-color-override-1352241038.cc-window {
          color: rgb(255, 255, 255);
          background-color: rgb(29, 30, 33);
        }
        .cc-banner.cc-bottom {
          left: 0;
          right: 0;
          bottom: 0;
        }
        .cc-window.cc-banner {
          -ms-flex-align: center;
          align-items: center;
        }
        .cc-window.cc-banner {
          padding: 1em 1.8em;
          width: 100%;
          flex-direction: row;
        }

        .cc-bottom {
          bottom: 1em;
        }
        .cc-revoke,
        .cc-window {
          position: fixed;
          overflow: hidden;
          box-sizing: border-box;
          font-family: Helvetica, Calibri, Arial, sans-serif;
          font-size: 16px;
          line-height: 1.5em;
          display: flex;
          flex-wrap: nowrap;
          z-index: 9999;
        }
        .cc-window {
          opacity: 1;
          transition: opacity 1s ease;
        }
      `}</style>
    </div>
  )
}
