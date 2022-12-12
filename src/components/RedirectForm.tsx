import React, { useEffect, useRef } from 'react'
import getConfig from 'next/config'
import fileDownload from 'js-file-download'
import { ErrorSummary } from './ErrorSummary'
import Link from 'next/link'
import { checkCookie } from '../lib/cookie'

const {
  publicRuntimeConfig: { navodyBaseUrl },
} = getConfig()

export interface RedirectField {
  name: string
  value: string
}

interface RedirectFormProps {
  fields: RedirectField[]
  canContinue: boolean
  debugDownload?: string
}

export const RedirectForm: React.FC<RedirectFormProps> = ({
  fields,
  canContinue,
  debugDownload,
}) => {
  const withDebug = checkCookie('you-shall', 'not-pass')

  const form = useRef(null)
  useEffect(() => {
    if (!withDebug && form.current) {
      form.current.submit()
    }
  }, [form, withDebug])

  if (!canContinue && !withDebug) {
    return (
      <div className="govuk-!-margin-top-6">
        <ErrorSummary
          errors={{
            session: 'Vaša session vypršala',
          }}
        />
        <Link href="/" legacyBehavior>
          <button className="govuk-button">Začnite znovu</button>
        </Link>
      </div>
    )
  }

  const action = `${navodyBaseUrl}/podania/nove`
  return (
    <>
      <p className="govuk-!-margin-top-6">
        Presmerujeme Vás na Návody.Digital. Čakajte prosím.
      </p>
      <form action={action} ref={form} method="post">
        {fields.map(({ name, value }, index) => (
          <input
            key={`${name}-${index}`}
            type="hidden"
            name={name}
            defaultValue={value}
            size={100}
          />
        ))}
        {withDebug && (
          <Debug canContinue={canContinue} download={debugDownload} />
        )}
      </form>
    </>
  )
}

const Debug = ({ canContinue, download }) => (
  <div style={{ opacity: 0.4 }}>
    <p>
      V <em>debug</em> móde sa nepresmeruje automaticky.
    </p>
    {!canContinue && (
      <p>
        <strong>Session expirovala.</strong> Ale v <em>debug</em> móde nás to
        netrápi.
      </p>
    )}
    <button className="govuk-button" type="submit" data-test="debug-continue">
      DEBUG: Pokračovať na Návody.Digital
    </button>
    <br />
    {download && (
      <button
        type="button"
        className="govuk-button"
        data-test="debug-download"
        onClick={() => {
          fileDownload(download, 'file.xml')
        }}
      >
        DEBUG: Stiahnuť XML
      </button>
    )}
  </div>
)
