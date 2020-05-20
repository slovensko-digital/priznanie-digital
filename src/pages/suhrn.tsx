import React, { useEffect } from 'react'
import Link from 'next/link'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { getRoutes } from '../lib/routes'
import { TaxFormUserInput } from '../types/TaxFormUserInput'
import { formatCurrency, formatRodneCislo } from '../lib/utils'
import styles from './suhrn.module.css'
import classnames from 'classnames'
import { TaxForm } from '../types/TaxForm'

const { nextRoute, previousRoute } = getRoutes('/suhrn')

interface SummaryRow {
  title: string
  value?: string
  currency?: boolean
  testId?: string
}
interface SummaryProps {
  title: string
  rows: SummaryRow[]
  href?: string
}
const Summary = (props: SummaryProps) => (
  <>
    <h2
      className={classnames(
        'govuk-heading-m',
        'govuk-!-margin-top-3',
        styles.summaryTitle,
      )}
    >
      <span>{props.title}</span>
      {props.href && (
        <Link href={`${props.href}?edit`}>
          <a className={styles.editLink}>upraviť</a>
        </Link>
      )}
    </h2>
    <table className="govuk-table">
      <tbody className="govuk-table__body">
        {props.rows.map(({ title, value, currency, testId }) => (
          <tr className="govuk-table__row" key={title}>
            {value ? (
              <>
                <td className="govuk-table__cell govuk-!-width-one-half">
                  {title}
                </td>
                <td
                  className="govuk-table__cell govuk-!-width-one-half"
                  data-test={testId}
                >
                  {currency ? formatCurrency(parseFloat(value)) : value}
                </td>
              </>
            ) : (
              <td className="govuk-table__cell govuk-!-width-one-half">
                {title}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  </>
)

interface Props {
  taxFormUserInput: TaxFormUserInput
  taxForm: TaxForm
  setTaxFormUserInput: (input: Partial<TaxFormUserInput>) => void
}
const Suhrn: NextPage<Props> = ({ taxFormUserInput }: Props) => {
  const router = useRouter()

  useEffect(() => {
    router.prefetch(nextRoute())
  })
  const [firstName, ...lastNames] = taxFormUserInput.meno_priezvisko
    .split(' ')
    .map((v) => v.trim())

  return (
    <>
      <Link href={previousRoute()}>
        <a className="govuk-back-link" data-test="back">
          Späť
        </a>
      </Link>
      <h1 className="govuk-heading-l govuk-!-margin-top-3">
        Súhrn a kontrola vyplnených údajov
      </h1>
      <Summary
        title="Príjmy a odvody do sociálnej poisťovne"
        href={'/prijmy-a-vydavky'}
        rows={[
          {
            title: 'Príjmy',
            value: taxFormUserInput.t1r10_prijmy,
            currency: true,
          },
          {
            title: 'Sociálne poistenie',
            value: taxFormUserInput.priloha3_r11_socialne,
            currency: true,
          },
          {
            title: 'Zdravotné poistenie',
            value: taxFormUserInput.priloha3_r13_zdravotne,
            currency: true,
          },
        ]}
      />
      <Summary
        title="Zamestnanie v SR pre rok 2019"
        href={'/zamestnanie'}
        rows={
          taxFormUserInput.employed
            ? [
                {
                  title: 'Úhrn príjmov od všetkých zamestnávateľov',
                  value: taxFormUserInput.r038,
                  currency: true,
                },
                {
                  title: 'Úhrn povinného poistného',
                  value: taxFormUserInput.r039,
                  currency: true,
                },
              ]
            : [
                {
                  title: 'V roku 2019 som nebol zamestnaný',
                },
              ]
        }
      />
      <Summary
        title="Daňový bonus na manželku / manžela"
        href={'/partner'}
        rows={
          taxFormUserInput.r032_uplatnujem_na_partnera
            ? [
                {
                  title: 'Meno a priezvisko manželky / manžela',
                  value: taxFormUserInput.r031_priezvisko_a_meno,
                },
                {
                  title: 'Rodné číslo',
                  value: formatRodneCislo(taxFormUserInput.r031_rodne_cislo),
                },
                {
                  title: 'Vlastné príjmy manželky / menžela',
                  value: taxFormUserInput.r032_partner_vlastne_prijmy,
                  currency: true,
                },
                {
                  title: 'Počet mesiacov kedy mala manželka / manžel príjmy',
                  value: taxFormUserInput.r032_partner_pocet_mesiacov,
                },
              ]
            : [
                {
                  title: 'Neplatňujem si daňový bonus na manželku / manžela',
                },
              ]
        }
      />
      <Summary
        title="Dieťa do 16 rokov alebo študent do 25 rokov, v spoločnej domácnosti"
        href={'/deti'}
        rows={
          taxFormUserInput.hasChildren
            ? taxFormUserInput.children
                .map((child) => [
                  { title: 'Meno a priezvisko', value: child.priezviskoMeno },
                  {
                    title: 'Rodné číslo',
                    value: formatRodneCislo(child.rodneCislo),
                  },
                ])
                .reduce((result, value) => [...result, ...value], [])
            : [
                {
                  title: 'Nemám alebo neuplatňujem si',
                },
              ]
        }
      />
      <Summary
        title="Príspevky na doplnkové dôchodkové poistenie (III. pilier)"
        href={'/dochodok'}
        rows={
          taxFormUserInput.r029_poberal_dochodok
            ? [
                {
                  title: 'Výška zaplatených príspevkov',
                  value: taxFormUserInput.r030_vyska_dochodku,
                  currency: true,
                },
              ]
            : [{ title: 'Neplatil som' }]
        }
      />
      <Summary
        title="Zaplatené úroky z hypotéky"
        href={'/hypoteka'}
        rows={
          taxFormUserInput.r037_uplatnuje_uroky
            ? [
                {
                  title: 'Zaplatené úroky',
                  value: taxFormUserInput.r037_zaplatene_uroky,
                  currency: true,
                },
                {
                  title: 'Počet mesiacov',
                  value: taxFormUserInput.r037_pocetMesiacov,
                },
              ]
            : [{ title: 'Neplatil som' }]
        }
      />
      <Summary
        title="Kúpele"
        href={'/kupele'}
        rows={
          taxFormUserInput.kupele
            ? [
                {
                  title: 'Kúpelné úhrady za seba',
                  value: taxFormUserInput.danovnikInSpa
                    ? taxFormUserInput.r076a_kupele_danovnik
                    : 'Neuplatňuje',
                  currency: Boolean(taxFormUserInput.danovnikInSpa),
                  testId: 'r076a_kupele_danovnik',
                },
                {
                  title: 'Kúpelné úhrady za manžela/manželku',
                  value: taxFormUserInput.r033_partner_kupele
                    ? taxFormUserInput.r033_partner_kupele_uhrady
                    : 'Neuplatňuje',
                  currency: Boolean(taxFormUserInput.r033_partner_kupele),
                  testId: 'r033_partner_kupele_uhrady',
                },
                {
                  title: 'Kúpelné úhrady za deti',
                  value: taxFormUserInput.childrenInSpa
                    ? taxFormUserInput.r036_deti_kupele
                    : 'Neuplatňuje',
                  currency: Boolean(taxFormUserInput.childrenInSpa),
                  testId: 'r036_deti_kupele',
                },
              ]
            : [{ title: 'Nenavštívil' }]
        }
      />
      <Summary
        title="Údaje o daňovníkovi"
        href={'/osobne-udaje'}
        rows={[
          { title: 'DIČ', value: taxFormUserInput.r001_dic },
          { title: 'Meno', value: firstName },
          { title: 'Priezvisko', value: lastNames.join(' ') },
        ]}
      />
      <Summary
        title="Adresa trvalého pobytu"
        href={'/osobne-udaje'}
        rows={[
          {
            title: 'Ulica a súpisné číslo',
            value: `${taxFormUserInput.r007_ulica} ${taxFormUserInput.r008_cislo}`,
          },
          { title: 'PSČ', value: taxFormUserInput.r009_psc },
          { title: 'Obec', value: taxFormUserInput.r010_obec },
        ]}
      />
      <Link href={nextRoute()}>
        <button className="govuk-button govuk-!-margin-top-4" type="button">
          Pokračovať
        </button>
      </Link>
    </>
  )
}

export default Suhrn
