import React, { useEffect } from 'react'
import Link from 'next/link'
import { NextPage } from 'next'
import { TaxForm } from '../types/TaxForm'
import { getRoutes, validateRoute } from '../lib/routes'
import { formatCurrency } from '../lib/utils'
import { EmailForm } from '../components/EmailForm'
import { TaxFormUserInput } from '../types/TaxFormUserInput'
import { useRouter } from 'next/router'

const buildSummaryParams = (rows: SummaryRow[]) => {
  return rows.reduce(
    (obj, { key, value }) => ({
      ...obj,
      [key]: value > 0 ? formatCurrency(value) : '0,00 EUR',
    }),
    {},
  )
}

interface SummaryRow {
  key: string
  title: string
  description?: string
  value: number
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
              {value > 0 ? (
                <strong>{formatCurrency(value)}</strong>
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

interface Props {
  taxForm: TaxForm
  taxFormUserInput: TaxFormUserInput
  setTaxFormUserInput: (input: Partial<TaxFormUserInput>) => void
}
const Vysledky: NextPage<Props> = ({
  taxForm,
  taxFormUserInput,
  setTaxFormUserInput,
}: Props) => {
  const router = useRouter()

  const { previousRoute } = getRoutes('/vysledky')
  const { nextRoute } = getRoutes(
    taxForm.mozeZiadatVratitDanovyBonusAleboPreplatok ? '/vysledky' : '/iban',
  )

  useEffect(() => {
    router.prefetch(nextRoute())
    validateRoute(router, taxFormUserInput)
  }, [router, taxFormUserInput, nextRoute])

  const [firstName, ...lastNames] = taxFormUserInput.meno_priezvisko
    .split(' ')
    .map((v) => v.trim())

  const summaryRows = [
    { title: 'Príjmy', value: taxForm.t1r2_prijmy, key: 't1r2_prijmy' },
    {
      title: 'Zdravotné poistné',
      value: taxForm.priloha3_r13_zdravotne,
      key: 'priloha3_r13_zdravotne',
    },
    {
      title: 'Sociálne poistné',
      value: taxForm.priloha3_r11_socialne,
      key: 'priloha3_r11_socialne',
    },
    {
      title: 'Zaplatené poistné spolu',
      value: taxForm.priloha3_r08_poistne,
      key: 'priloha3_r08_poistne',
    },
    {
      title: 'Daňový bonus na manžela / manželku',
      value: taxForm.r074_znizenie_partner,
      key: 'r074_znizenie_partner',
    },
    {
      title:
        'Daňový bonus na dieťa do 16 rokov alebo študenta do 25 rokov s ktorým žijete v spoločnej domácnosti',
      value: taxForm.r106,
      key: 'r106',
    },
    {
      title: 'Príspevok na dôchodkové poistenie (III. pilier)',
      value: taxForm.r075_zaplatene_prispevky_na_dochodok,
      key: 'r075_zaplatene_prispevky_na_dochodok',
    },
    {
      title: 'Úhrady za kúpele spolu',
      value: taxForm.r076_kupele_spolu,
      key: 'r076_kupele_spolu',
    },
    {
      title: 'Základ dane',
      value: taxForm.r080_zaklad_dane_celkovo,
      key: 'r080_zaklad_dane_celkovo',
    },
    {
      title: 'Daňový preplatok',
      description: taxForm.mozeZiadatVratitDanovyBonusAleboPreplatok
        ? 'O vyplatenie daňového bonusu môžete požiadať v ďalšom kroku.'
        : '',
      value: taxForm.r110,
      key: 'r110',
    },
    {
      title: 'Daň na úhradu',
      value: taxForm.r125_dan_na_uhradu,
      key: 'r125_dan_na_uhradu',
      fontSize: 30,
    },
  ]

  return (
    <>
      <Link href={previousRoute()}>
        <a className="govuk-back-link" data-test="back">
          Späť
        </a>
      </Link>
      <h1 className="govuk-heading-l govuk-!-margin-top-3">
        Výpočet dane za rok 2019
      </h1>
      <h2 className="govuk-heading-m govuk-!-margin-top-3">Stručný prehľad</h2>
      <Summary rows={summaryRows} />
      <div className="box">
        {taxFormUserInput.email ? (
          <p>
            Na váš email <strong>{taxFormUserInput.email}</strong> sme odoslali
            XML súbor potrebný pre podanie daňového priznania a tiež PDF verziu
            daňového priznania.
            <br />
            {taxFormUserInput.newsletter && 'Pošleme vám aj newsletter.'}
          </p>
        ) : (
          <EmailForm
            label="Pošleme vám tento výpočet dane na email?"
            hint="Bude sa vám hodiť pri úhrade daní"
            taxForm={taxForm}
            saveForm={(email, newsletter) => {
              setTaxFormUserInput({ email, newsletter })
            }}
            params={{
              firstName,
              lastName: lastNames.join(' '),
              summary: buildSummaryParams(summaryRows),
            }}
          />
        )}
      </div>
      <Link href={nextRoute()}>
        <button
          data-test="next"
          className="govuk-button govuk-!-margin-top-3"
          type="button"
        >
          Pokračovať
        </button>
      </Link>
    </>
  )
}

export default Vysledky
