import React from 'react';
import Link from 'next/link';
import { NextPage } from 'next';
import { TaxForm } from '../types/TaxForm';

import { getRoutes } from '../lib/routes';
import { formatCurrency } from '../lib/utils';

const { previousRoute, nextRoute } = getRoutes('/vysledky');

interface SummaryRow {
  title: string;
  value: number;
  fontSize?: number;
}
interface SummaryProps {
  rows: SummaryRow[];
}
const Summary = ({ rows }: SummaryProps) => (
  <table className="govuk-table">
    <tbody className="govuk-table__body">
      {rows.map(({ title, value, fontSize }) => (
        <tr
          className="govuk-table__row"
          style={fontSize ? { fontSize } : undefined}
          key={title}
        >
          <td className="govuk-table__cell">{title}</td>
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
);

interface Props {
  taxForm: TaxForm;
}
const Vysledky: NextPage<Props> = ({ taxForm }: Props) => {
  return (
    <>
      <Link href={previousRoute}>
        <a className="govuk-back-link" data-test="back">
          Naspat
        </a>
      </Link>
      <h1 className="govuk-heading-l govuk-!-margin-top-3">
        Výpočet dane za rok 2019
      </h1>
      <h2 className="govuk-heading-l govuk-!-margin-top-3">Stručný prehľad</h2>
      <Summary
        rows={[
          { title: 'Príjmy', value: taxForm.t1r2_prijmy },
          {
            title: 'Zdravotné poistné',
            value: taxForm.priloha3_r13_zdravotne,
          },
          {
            title: 'Sociálne poistné',
            value: taxForm.priloha3_r11_socialne,
          },
          {
            title: 'Zaplatené poistné spolu',
            value: taxForm.priloha3_r08_poistne,
          },
          {
            title: 'Daňový bonus na manžela / manželku',
            value: taxForm.r074_znizenie_partner,
          },
          {
            title:
              'Daňový bonus na dieťa do 16 rokov alebo študenta do 25 rokov s ktorým žijete v spoločnej domácnosti',
            value: 0, // TODO: calculate this value
          },
          {
            title: 'Príspevok na dôchodkové poistenie (III. pilier)',
            value: taxForm.r030_vyska_dochodku,
          },
          { title: 'Základ dane', value: taxForm.r080_zaklad_dane_celkovo },
          { title: 'Daňový preplatok', value: taxForm.r126_danovy_preplatok },
          {
            title: 'Daň na úhradu',
            value: taxForm.r125_dan_na_uhradu,
            fontSize: 30,
          },
        ]}
      />
      <Link href={nextRoute}>
        <button data-test="next" className="govuk-button" type="button">
          Pokračovať
        </button>
      </Link>
    </>
  );
};

export default Vysledky;
