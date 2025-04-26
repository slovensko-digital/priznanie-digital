import React from 'react'
import { formatCurrency } from '../lib/utils'
import { TaxFormUserInput } from '../types/TaxFormUserInput'
import { Page } from '../components/Page'
import { Warning } from '../components/Warning'
import Decimal from 'decimal.js'
import { BackLink } from '../components/BackLink'
import Link from 'next/link'
import { buildSummary } from '../lib/calculation'
import { TAX_YEAR } from '../lib/calculation'
import { ExternalLink } from '../components/ExternalLink'

interface SummaryRow {
  key: string
  title: string
  description?: string
  value: Decimal
  fontSize?: number
}
interface SummaryProps {
  rows: SummaryRow[]
  title?: string
}
const Summary = ({ rows, title }: SummaryProps) => (
  <div id="summary">
    <table className="govuk-table">
      {title && (
        <caption className="govuk-table__caption govuk-table__caption--l">
          {title}
        </caption>
      )}
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
            <td
              className="govuk-table__cell govuk-table__cell--numeric"
              data-test={key}
            >
              <strong>{formatCurrency(value.toNumber())}</strong>
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
      title: 'Príjmy spolu',
      value: summary.prijmy,
      key: 'prijmy',
    },
    {
      title: 'Paušálne výdavky',
      value: summary.pausalneVydavky,
      key: 'pausalneVydavky',
    },
    {
      title: 'Zaplatené poistné spolu',
      value: summary.zaplatenePoistneSpolu,
      key: 'zaplatenePoistneSpolu',
    },
    {
      title: 'Nezdaniteľná časť na vás',
      value: summary.nezdanitelnaCastNaSeba,
      key: 'nezdanitelnaCastNaSeba',
    },
    {
      title: 'Nezdaniteľná časť na manželku / manžela',
      value: summary.nezdanitelnaCastNaPartnera,
      key: 'nezdanitelnaCastNaPartnera',
    },
    {
      title: 'Príspevky na doplnkové dôchodkové poistenie',
      value: summary.prispevkyNaDochodkovePoistenie,
      key: 'prispevkyNaDochodkovePoistenie',
    },
    {
      title: 'Základ dane',
      value: summary.zakladDane,
      key: 'zakladDane',
      fontSize: 20,
    },
  ]

  const rentRows = [
    {
      title: 'Príjmy spolu',
      value: summary.prijemNehnutelnost,
      key: 'prijemNehnutelnost',
    },
    {
      title: 'Preukázateľné výdavky spolu',
      value: summary.vydavkyNehnutelnost,
      key: 'vydavkyNehnutelnost',
    },
    {
      title: 'Základ dane',
      value: summary.zakladDanZPrenajmu,
      key: 'zakladDanZPrenajmu',
      fontSize: 20,
    },
  ]

  const totalRows = [
    {
      title: 'Daň spolu',
      value: summary.danSpolu,
      key: 'danSpolu',
    },
    {
      title: 'Preddavky na daň',
      value: summary.preddavkyNaDan,
      key: 'preddavkyNaDan',
    },
    {
      title: 'Nárok na daňový bonus na deti',
      value: summary.danovyBonusNaDeti,
      key: 'danovyBonusNaDeti',
    },
    {
      title: 'Daňový bonus na zaplatené úroky',
      value: summary.danovyBonusNaUroky,
      key: 'danovyBonusNaUroky',
    },
    {
      title: 'Daňový bonus / preplatok na vyplatenie',
      value: summary.danovyBonusPreplatokNaVyplatenie,
      key: 'danovyBonusPreplatokNaVyplatenie',
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
      <Summary title="Príjmy zo zamestnania a živnosti" rows={summaryRows} />
      <Summary title="Príjmy z prenájmu nehnuteľností" rows={rentRows} />
      <Summary title="Daň na úhradu / daňový preplatok" rows={totalRows} />

      {taxForm.preddavkyNaDan.suma.greaterThan(0) && (
        <Warning>
          <strong>
            Predpokladané {taxForm.preddavkyNaDan.periodicita} preddavky na daň
            z príjmov v roku {TAX_YEAR + 1} budú{' '}
            {formatCurrency(taxForm.preddavkyNaDan.suma.toNumber())} (výpočet má
            informatívny charakter). Pre viac informácií navštívte web{' '}
            <ExternalLink href="https://www.financnasprava.sk/sk/elektronicke-sluzby/verejne-sluzby/danove-kalkulacky/vypocet-preddavkov-fo-2025">
              Finančnej správy
            </ExternalLink>
            .
          </strong>
        </Warning>
      )}

      <Link href={nextRoute} legacyBehavior>
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
