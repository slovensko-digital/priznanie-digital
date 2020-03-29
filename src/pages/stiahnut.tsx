import React, { useState } from 'react'
import Link from 'next/link'
import fileDownload from 'js-file-download'

import { NextPage } from 'next'
import { getRoutes } from '../lib/routes'
import { PostponeUserInput } from '../types/PostponeUserInput'
import { convertPostponeToXML } from '../lib/postpone/postponeConverter'
import { setDate } from '../lib/utils'

const { previousRoute } = getRoutes('/stiahnut')

interface Props {
  postponeUserInput: PostponeUserInput
}

const Stiahnut: NextPage<Props> = ({ postponeUserInput }: Props) => {
  const [didDownload, setDidDownload] = useState<boolean>(false)

  return (
    <>
      <Link href={previousRoute()}>
        <a className="govuk-back-link" data-test="back">
          Späť
        </a>
      </Link>
      <div className="box">
        <h1 className="govuk-heading-l govuk-!-margin-top-3">
          Dáta k podaniu daňového priznania sú pripravená
        </h1>
        <p>
          Stiahnite si súbor do počítača. Použijete ho neskôr na portáli
          Finančnej správy.
        </p>
        <button
          type="submit"
          className="btn-secondary govuk-button govuk-button--large"
          onClick={() => {
            const xml = convertPostponeToXML(setDate(postponeUserInput))
            fileDownload(xml, 'odklad_danoveho_priznania.xml')
            setDidDownload(true)
          }}
        >
          Stiahnuť dáta (XML)
        </button>
      </div>

      {!didDownload && (
        <div className="govuk-grid-column-full govuk-warning-text govuk-!-margin-top-9">
          <span className="govuk-warning-text__icon" aria-hidden="true">
            !
          </span>
          <strong className="govuk-warning-text__text">
            Pred pokračovaním si stiahnite XML súbor
          </strong>
        </div>
      )}

      <button
        className="govuk-button govuk-!-margin-top-9"
        disabled={!didDownload}
        type="button"
        onClick={() => {
          window.location.href =
            'https://staging.navody.digital/zivotne-situacie/elektronicke-podanie-danoveho-priznania'
        }}
      >
        Pokračovať na navody.digital
      </button>
    </>
  )
}

export default Stiahnut
