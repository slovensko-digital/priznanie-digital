import React, { useEffect } from 'react';
import Link from 'next/link';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { getPostponeRoutes } from '../../lib/routes';
import { PostponeUserInput } from '../../types/PostponeUserInput';
import { EmailForm } from '../../components/EmailForm';

const { nextRoute, previousRoute } = getPostponeRoutes('/odklad/suhrn');

interface Props {
  postponeUserInput: PostponeUserInput;
  setPostponeUserInput: (values: PostponeUserInput) => void;
}
const Suhrn: NextPage<Props> = ({
  postponeUserInput,
  setPostponeUserInput,
}: Props) => {
  const router = useRouter();

  useEffect(() => {
    router.prefetch(nextRoute);
  });

  return (
    <>
      <Link href={previousRoute}>
        <a className="govuk-back-link" data-test="back">
          Naspat
        </a>
      </Link>
      <h1>Súhrn a kontrola vyplnených údajov</h1>

      <h2>Predĺžená lehota na podanie daňového priznania</h2>
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
              {postponeUserInput.meno_priezvisko}
            </td>
          </tr>
          <tr className="govuk-table__row">
            <td className="govuk-table__cell govuk-!-width-one-half">
              Priezvisko
            </td>
            <td className="govuk-table__cell govuk-!-width-one-half">
              {postponeUserInput.meno_priezvisko}
            </td>
          </tr>
        </tbody>
      </table>

      <h2>Adresa trvalého pobytu</h2>
      <table className="govuk-table">
        <tbody className="govuk-table__body">
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

      <EmailForm
        postponeUserInput={postponeUserInput}
        setPostponeUserInput={setPostponeUserInput}
        formName="postpone"
        applicantFullName={postponeUserInput.meno_priezvisko}
        deadline={
          postponeUserInput.prijmy_zo_zahranicia ? '2020-06-30' : '2020-09-30'
        }
      />

      <Link href={nextRoute}>
        <button className="govuk-button" type="button">
          Pokračovať
        </button>
      </Link>
    </>
  );
};

export default Suhrn;
