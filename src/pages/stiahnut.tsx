import React, { useState } from 'react'
import Link from 'next/link'
import { Warning } from '../components/Warning'
import { Page } from '../components/Page'

const Stiahnut: Page<{}> = ({ taxForm, taxFormUserInput, previousRoute }) => {
  const [didDownload, setDidDownload] = useState<boolean>(false)

  function handleSubmit() {
    setDidDownload(true)
  }

  return (
    <>
      <Link href={previousRoute}>
        <a className="govuk-back-link" data-test="back">
          Späť
        </a>
      </Link>
      <div className="box">
        <h1 className="govuk-heading-l govuk-!-margin-top-3">
          Dáta k podaniu daňového priznania sú pripravené
        </h1>
        <p>
          Stiahnite si súbor do počítača. Použijete ho neskôr na portáli
          Finančnej správy.
        </p>
        <form
          action="/api/xml"
          method="post"
          target="_blank"
          onSubmit={handleSubmit}
        >
          <input
            type="hidden"
            name="taxFormUserInput"
            value={JSON.stringify(taxFormUserInput)}
          />
          <button
            type="submit"
            className="btn-secondary govuk-button govuk-button--large"
          >
            Stiahnuť dáta (XML)
          </button>
        </form>
        <p>&nbsp;</p>
        <p>Môžete si stiahnuť aj PDF súbor.</p>
        <form
          action="/api/pdf"
          method="post"
          target="_blank"
          onSubmit={handleSubmit}
        >
          <input
            type="hidden"
            name="taxFormUserInput"
            value={JSON.stringify(taxFormUserInput)}
          />
          <button
            type="submit"
            className="btn-secondary govuk-button govuk-button--large"
          >
            Stiahnuť dáta (PDF)
          </button>
        </form>
      </div>
      {!didDownload && (
        <Warning className="govuk-!-margin-top-3">
          <strong>Pred pokračovaním si stiahnite XML súbor</strong>
        </Warning>
      )}

      <p className="govuk-!-margin-top-6">
        Ďalším krokom v procese je samotné podanie daňového priznania. Je
        potrebné pripravený XML formulár nahrať na portál Finančnej správy.
        Postup ako podať daňové priznanie nájdete na Návody.Digital.
      </p>

      <button
        className="govuk-button govuk-button--large govuk-button--start govuk-!-margin-top-3"
        disabled={!didDownload}
        type="button"
        onClick={() => {
          window.location.href =
            'https://navody.digital/zivotne-situacie/elektronicke-podanie-danoveho-priznania'
        }}
      >
        Návod na podanie
      </button>
    </>
  )
}

export default Stiahnut
