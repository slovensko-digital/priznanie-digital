import React from 'react'
import { formatCurrency } from '../lib/utils'
import { TaxFormUserInput } from '../types/TaxFormUserInput'
import { Page } from '../components/Page'
import Decimal from 'decimal.js'
import { BackLink } from '../components/BackLink'
import Link from 'next/link'
import { buildSummary } from '../lib/calculation'
import { TAX_YEAR } from '../lib/calculation'

interface SummaryRow {
  key: string
  title: string
  description?: string
  value: Decimal
  fontSize?: number
}
interface SummaryProps {
  rows: SummaryRow[]
}
const Summary = ({ rows }: SummaryProps) => (
  <div id="summary">
    <table className="govuk-table">
      <tbody className="govuk-table__body">
        {rows.map(({ key, title, description, value, fontSize }) => (
          <tr
            className="govuk-table__row"
            style={fontSize ? { fontSize } : undefined}
            key={key}
          >
            <td className="govuk-table__cell">
              {title}
              {description && (
                <div className="govuk-!-margin-top-1">
                  <small>{description}</small>
                </div>
              )}
            </td>
            <td className="govuk-table__cell govuk-table__cell--numeric">
              {value.gt(0) ? (
                <strong>{formatCurrency(value.toNumber())}</strong>
              ) : (
                <span>0,00 EUR</span>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

const Vysledky: Page<Partial<TaxFormUserInput>> = ({
  taxForm,
  previousRoute,
  nextRoute,
}) => {
  const summary = buildSummary(taxForm)

  const summaryRows = [
    {
      title: 'Príjmy',
      value: summary.prijmy,
      key: 'prijmy',
    },
    {
      title: 'Zdravotné poistné',
      value: summary.zdravotnePoistne,
      key: 'zdravotnePoistne',
    },
    {
      title: 'Sociálne poistné',
      value: summary.socialnePoistne,
      key: 'socialnePoistne',
    },
    {
      title: 'Zaplatené poistné spolu',
      value: summary.zaplatenePoistneSpolu,
      key: 'zaplatenePoistneSpolu',
    },
    {
      title: 'Zvýhodnenie na manželku / manžela',
      value: summary.zvyhodnenieNaManz,
      key: 'zvyhodnenieNaManz',
    },
    {
      title:
        'Daňový bonus na dieťa do 16 rokov alebo študenta do 25 rokov s ktorým žijete v spoločnej domácnosti',
      value: summary.danovyBonusNaDieta,
      key: 'danovyBonusNaDieta',
    },
    {
      title: 'Príspevok na dôchodkové poistenie (III. pilier)',
      value: summary.prispevokNaDochodkovePoist,
      key: 'prispevokNaDochodkovePoist',
    },
    {
      title: 'Základ dane',
      value: summary.zakladDane,
      key: 'zakladDane',
    },
    {
      title: 'Daňový preplatok / daňový bonus na vyplatenie',
      value: summary.danovyPreplatok,
      key: 'danovyPreplatok',
    },
    {
      title: 'Daň na úhradu',
      value: summary.danNaUhradu,
      key: 'danNaUhradu',
      fontSize: 30,
    },
  ]

  return (
    <>
      <BackLink href={previousRoute} />
      <h1 className="govuk-heading-l govuk-!-margin-top-3">
        {`Výpočet dane za rok ${TAX_YEAR}`}
      </h1>
      <h2 className="govuk-heading-m govuk-!-margin-top-3">Stručný prehľad</h2>
      <Summary rows={summaryRows} />
      <Link href={nextRoute}>
        <button
          data-test="next"
          className="govuk-button govuk-!-margin-top-3"
          type="submit"
        >
          Pokračovať
        </button>
      </Link>
    </>
  )
}

export default Vysledky
