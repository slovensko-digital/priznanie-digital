import React from 'react'
import { formatCurrency } from '../lib/utils'
import { TaxFormUserInput } from '../types/TaxFormUserInput'
import { Page } from '../components/Page'
import { Warning } from '../components/Warning'
import Decimal from 'decimal.js'
import { BackLink } from '../components/BackLink'
import Link from 'next/link'
import { buildSummary } from '../lib/calculation'
import { countPreddavky } from '../lib/calculation'
import {
  TAX_YEAR,
  SPODNA_SADZBA_PRE_PREDDAVKY,
  VRCHNA_SADZBA_PRE_PREDDAVKY,
} from '../lib/calculation'


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
            <td className="govuk-table__cell govuk-table__cell--numeric" data-test={key}>
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
      title: 'Základ dane',
      value: summary.zakladDane,
      key: 'zakladDane',
    },
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
      title: 'Daňový bonus na vyplatenie',
      value: summary.danovyBonusNaVyplatenie,
      key: 'danovyBonusNaVyplatenie',
    },
    {
      title: 'Daňový bonus na vyplatenie úroky',
      value: summary.danovyBonysNaVyplatenieUroky,
      key: 'danovyBonysNaVyplatenieUroky'
    },
    {
      title: 'Daňový preplatok na vyplatenie',
      value: summary.danovyPreplatokNaVyplatenie,
      key: 'danovyPreplatokNaVyplatenie',
    },
    {
      title: 'Daň na úhradu',
      value: summary.danNaUhradu,
      key: 'danNaUhradu',
      fontSize: 30,
    }
  ]

  const monthlyPrepayment = taxForm.r135_dan_na_uhradu.greaterThan(new Decimal(VRCHNA_SADZBA_PRE_PREDDAVKY))

  const quarterlyPrepayment = taxForm.r135_dan_na_uhradu.greaterThan(new Decimal(SPODNA_SADZBA_PRE_PREDDAVKY))

  const prePayments = monthlyPrepayment || quarterlyPrepayment

  return (
    <>
      <BackLink href={previousRoute} />
      <h1 className="govuk-heading-l govuk-!-margin-top-3">
        {`Výpočet dane za rok ${TAX_YEAR}`}
      </h1>
      <h2 className="govuk-heading-m govuk-!-margin-top-3">Stručný prehľad</h2>
      <Summary rows={summaryRows} />

      {
        prePayments &&
        <Warning>
            <strong>
              Predpokladané {monthlyPrepayment ? 'mesačné' : 'kvartálne'} preddavky na daň z príjmov v roku {TAX_YEAR+1} budú {countPreddavky(taxForm)}€ (výpočet má informatívny charakter). Pre viac informácií navštívte web <a href="https://www.financnasprava.sk/sk/elektronicke-sluzby/verejne-sluzby/danove-kalkulacky/vypocet-preddavkov-fo-2023">Finančnej správy</a>.
            </strong>
        </Warning>
      }

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
