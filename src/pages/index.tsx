import React from 'react'
import { Warning } from '../components/Warning'
import { ExternalLink } from '../components/ExternalLink'

const navodyUrl =
  'https://navody.digital/zivotne-situacie/elektronicke-podanie-danoveho-priznania'

const Index = () => (
  <>
    <h1 className="govuk-heading-l govuk-!-margin-top-3">
      Vyplnenie daňového priznania
      <br />
      (verzia pre rok 2020)
    </h1>

    <Warning>Na verzii pre rok 2020 aktuálne pracujeme.</Warning>

    <p>
      Viac informácii nájdete na{' '}
      <ExternalLink href={navodyUrl}>navody.digital</ExternalLink>, kde nám
      môžete zanechať svoj email a my sa postaráme, aby vám nič neuniklo.
    </p>

    <p>
      Dáme vám vedieť hneď, ako bude dostupná verzia aplikácie na tento rok.
      Nebojte sa, všetko v pohode stíhate :)
    </p>

    <p>
      <ExternalLink
        href={navodyUrl}
        className="govuk-button govuk-button--large"
      >
        Viac informácí
      </ExternalLink>
    </p>
  </>
)

export default Index
