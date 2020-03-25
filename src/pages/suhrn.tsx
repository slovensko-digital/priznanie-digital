import React, { useEffect } from 'react';
import Link from 'next/link';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { getRoutes } from '../lib/routes';
import { TaxFormUserInput } from '../types/TaxFormUserInput';
import { formatCurrency } from '../lib/utils';

const { nextRoute, previousRoute } = getRoutes('/suhrn');

interface SummaryRow {
  title: string;
  value?: string;
  currency?: boolean;
}
interface SummaryProps {
  title: string;
  rows: SummaryRow[];
}
const Summary = (props: SummaryProps) => (
  <>
    <h2>{props.title}</h2>
    <table className="govuk-table">
      <tbody className="govuk-table__body">
        {props.rows.map(({ title, value, currency }) => (
          <tr className="govuk-table__row" key={title}>
            {value ? (
              <>
                <td className="govuk-table__cell govuk-!-width-one-half">
                  {title}
                </td>
                <td className="govuk-table__cell govuk-!-width-one-half">
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
);

interface Props {
  taxFormUserInput: TaxFormUserInput;
}
const Suhrn: NextPage<Props> = ({ taxFormUserInput }: Props) => {
  const router = useRouter();

  useEffect(() => {
    router.prefetch(nextRoute);
  });
  const [firstName, ...lastNames] = taxFormUserInput.meno_priezvisko
    .split(' ')
    .map((v) => v.trim());

  return (
    <>
      <Link href={previousRoute}>
        <a className="govuk-back-link" data-test="back">
          Naspat
        </a>
      </Link>
      <h1 className="govuk-heading-l govuk-!-margin-top-3">
        Súhrn a kontrola vyplnených údajov
      </h1>

      <Summary
        title="Príjmy a odvody do sociálnej poisťovne"
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
        rows={
          taxFormUserInput.r032_uplatnujem_na_partnera
            ? [
                {
                  title: 'Meno a priezvisko manželky / manžela',
                  value: taxFormUserInput.r031_priezvisko_a_meno,
                },
                {
                  title: 'Rodné číslo',
                  value: taxFormUserInput.r031_rodne_cislo,
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
        rows={
          taxFormUserInput.children
            ? taxFormUserInput.r034
                .map((child) => [
                  { title: 'Meno a priezvisko', value: child.priezviskoMeno },
                  { title: 'Rodné číslo', value: child.rodneCislo },
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
        title="Údaje o daňovníkovi"
        rows={[
          { title: 'DIČ', value: taxFormUserInput.r001_dic },
          { title: 'Meno', value: firstName },
          { title: 'Priezvisko', value: lastNames.join(' ') },
        ]}
      />

      <Summary
        title="Adresa trvalého pobytu"
        rows={[
          {
            title: 'Ulica a súpisné číslo',
            value: `${taxFormUserInput.r007_ulica} ${taxFormUserInput.r008_cislo}`,
          },
          { title: 'PSČ', value: taxFormUserInput.psc },
          { title: 'Obec', value: taxFormUserInput.r010_obec },
        ]}
      />

      <Link href={nextRoute}>
        <button className="govuk-button govuk-!-margin-top-4" type="button">
          Pokračovať
        </button>
      </Link>
    </>
  );
};

export default Suhrn;
