import React, { useEffect } from 'react'
import Link from 'next/link'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { getPostponeRoutes } from '../../lib/routes'
import { PostponeUserInput } from '../../types/PostponeUserInput'
import { EmailForm } from '../../components/EmailForm'
import { setDate } from '../../lib/utils'

const { nextRoute, previousRoute } = getPostponeRoutes('/odklad/suhrn')

interface Props {
  postponeUserInput: PostponeUserInput
  setPostponeUserInput: (values: PostponeUserInput) => void
}
const Suhrn: NextPage<Props> = ({
  postponeUserInput,
  setPostponeUserInput,
}: Props) => {
  const router = useRouter()

  useEffect(() => {
    // if (!postponeUserInput.meno_priezvisko) {
    //   router.replace(previousRoute)
    // }
    router.prefetch(nextRoute)
  })
  const [firstName, ...lastNames] = postponeUserInput.meno_priezvisko
    .split(' ')
    .map((v) => v.trim())

  return (
    <>
      <Link href={previousRoute}>
        <a className="govuk-back-link" data-test="back">
          Späť
        </a>
      </Link>
      <h1 className="govuk-heading-l govuk-!-margin-top-3">
        Súhrn a kontrola vyplnených údajov
      </h1>
      <table className="govuk-table">
        <tbody className="govuk-table__body">
          <tr className="govuk-table__row">
            <td className="govuk-table__cell govuk-!-width-one-half">
              Príjmy zo zahraničia
            </td>
            <td className="govuk-table__cell govuk-!-width-one-half">
              {postponeUserInput.prijmy_zo_zahranicia ? 'Áno' : 'Nie'}
            </td>
          </tr>
          <tr className="govuk-table__row">
            <td className="govuk-table__cell govuk-!-width-one-half">
              Nový termín
            </td>
            <td className="govuk-table__cell govuk-!-width-one-half">
              {postponeUserInput.prijmy_zo_zahranicia
                ? '30. september 2020'
                : '30. jún 2020'}
            </td>
          </tr>
        </tbody>
      </table>

      <h2>Údaje o daňovníkovi</h2>
      <table className="govuk-table">
        <tbody className="govuk-table__body">
          <tr className="govuk-table__row">
            <td className="govuk-table__cell govuk-!-width-one-half">DIČ</td>
            <td className="govuk-table__cell govuk-!-width-one-half">
              {postponeUserInput.dic}
            </td>
          </tr>
          <tr className="govuk-table__row">
            <td className="govuk-table__cell govuk-!-width-one-half">Meno</td>
            <td className="govuk-table__cell govuk-!-width-one-half">
              {firstName}
            </td>
          </tr>
          <tr className="govuk-table__row">
            <td className="govuk-table__cell govuk-!-width-one-half">
              Priezvisko
            </td>
            <td className="govuk-table__cell govuk-!-width-one-half">
              {lastNames.join(' ')}
            </td>
          </tr>
        </tbody>
      </table>

      <h2>Adresa trvalého pobytu</h2>
      <table className="govuk-table">
        <tbody className="govuk-table__body">
          <tr className="govuk-table__row">
            <td className="govuk-table__cell govuk-!-width-one-half">
              Ulica a súpisné číslo
            </td>
            <td className="govuk-table__cell govuk-!-width-one-half">
              {postponeUserInput.ulica} {postponeUserInput.cislo}
            </td>
          </tr>
          <tr className="govuk-table__row">
            <td className="govuk-table__cell govuk-!-width-one-half">PSČ</td>
            <td className="govuk-table__cell govuk-!-width-one-half">
              {postponeUserInput.psc}
            </td>
          </tr>
          <tr className="govuk-table__row">
            <td className="govuk-table__cell govuk-!-width-one-half">Obec</td>
            <td className="govuk-table__cell govuk-!-width-one-half">
              {postponeUserInput.obec}
            </td>
          </tr>
        </tbody>
      </table>

      <div className="box">
        {postponeUserInput.email ? (
          <p>
            Váš email <strong>{postponeUserInput.email}</strong> sme úspešne
            zaregistrovali.
            <br />
            Pošleme vám notifikáciu pred novým termínom{' '}
            {postponeUserInput.prijmy_zo_zahranicia
              ? '(30. jún 2020)'
              : '(30. september 2020)'}
            .
            <br />
            {postponeUserInput.newsletter && ' Pošleme vám aj newsletter.'}
          </p>
        ) : (
          <EmailForm
            label="Chcete dostať upozornenie o novom termíne podania?"
            hint="Nechajte nám email a my vám včas pošleme notifikáciu"
            attachment={setDate(postponeUserInput)}
            saveForm={(email, newsletter) => {
              setPostponeUserInput({ ...postponeUserInput, email, newsletter })
            }}
            attributes={{
              form: 'postpone',
              firstname: firstName,
              lastname: lastNames.join(' '),
            }}
          />
        )}
      </div>

      <Link href={nextRoute}>
        <button className="govuk-button govuk-!-margin-top-4" type="button">
          Pokračovať
        </button>
      </Link>
    </>
  )
}

export default Suhrn
