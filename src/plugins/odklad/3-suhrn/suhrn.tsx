import React from 'react'
import { NextPage } from 'next'
import { getPostponeRoutes } from '../../../lib/routes'
import { PostponeUserInput } from '../../_shared/types/PostponeUserInput'
import { BackLink } from '../../_shared/components/links/BackLink'
import Link from 'next/link'
import { TAX_YEAR } from '../../_shared/calculation/calculation'

const { nextRoute, previousRoute } = getPostponeRoutes('/odklad/suhrn')

interface Props {
  postponeUserInput: PostponeUserInput
  setPostponeUserInput: (values: PostponeUserInput) => void
}
const Suhrn: NextPage<Props> = ({ postponeUserInput }: Props) => {
  return (
    <>
      <BackLink href={previousRoute} />
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
                ? `30. september ${TAX_YEAR+1}`
                : `30. jún ${TAX_YEAR + 1}`}
            </td>
          </tr>
        </tbody>
      </table>

      <h2 className="govuk-heading-l">Údaje o daňovníkovi</h2>
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
              {postponeUserInput.meno}
            </td>
          </tr>
          <tr className="govuk-table__row">
            <td className="govuk-table__cell govuk-!-width-one-half">
              Priezvisko
            </td>
            <td className="govuk-table__cell govuk-!-width-one-half">
              {postponeUserInput.priezvisko}
            </td>
          </tr>
        </tbody>
      </table>

      <h2 className="govuk-heading-l">Adresa trvalého pobytu</h2>
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
          <tr className="govuk-table__row">
            <td className="govuk-table__cell govuk-!-width-one-half">Štát</td>
            <td className="govuk-table__cell govuk-!-width-one-half">
              {postponeUserInput.stat}
            </td>
          </tr>
        </tbody>
      </table>
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

export { Suhrn }
