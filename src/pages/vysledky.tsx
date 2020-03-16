import React from 'react';
import Link from 'next/link';
import fileDownload from 'js-file-download';
import { NextPage } from 'next';
import { convertToXML } from '../lib/xml/xmlConverter';
import { TaxForm } from '../types/TaxForm';

import { getRoutes } from '../lib/routes';
import { formatCurrency } from '../lib/utils';

const { previousRoute } = getRoutes('/vysledky');

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
  const onExport = () => {
    const xml = convertToXML(taxForm);
    fileDownload(xml, 'priznanie.xml');
  };

  return (
    <>
      <Link href={previousRoute}>
        <a className="govuk-back-link" data-test="back">
          Naspat
        </a>
      </Link>
      <h1 className="govuk-heading-l">Výpočet dane za rok 2019</h1>
      <h2 className="govuk-heading-l">Stručný prehľad</h2>
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
      <button className="govuk-button" type="button" onClick={onExport}>
        Stiahnut XML
      </button>
      <div>
        <ol className="govuk-list govuk-list--number">
          <li>
            Prihláste sa na portál Finančnej správy - buď pomocou Identifikátora
            a hesla, Kvalifikovaného elektronického podpisu (KEP) alebo
            Občianskym preukazom s elektronickým čipom (eID)
            <br />
            <img alt="Krok 1" src="/assets/images/1xml.png" />
            <br />
            <img alt="Krok 2" src="/assets/images/2xml.png" />
          </li>

          <li>
            Kliknite na Katálog formulárov.
            <br />
            <img alt="Krok 3" src="/assets/images/3xml.png" />
          </li>

          <li>
            Nájdite kolonku “Daň z príjmov fyzickej osoby” (vyznačená modrou) a
            kliknite.
          </li>

          <li>
            Kliknite na kolonku “Ďanové priznanie k dani z príjmov fyzickej
            osoby (typ B) a kliknite.
            <br />
            <img alt="Krok 4" src="/assets/images/4xml.png" />
          </li>

          <li>
            Kliknite na ikonku “zošita s ceruzkou” pri kolonke “Daňové priznanie
            k dani z príjmov FO (typ B) za obdobie 2019.
            <br />
            <img alt="Krok 5" src="/assets/images/5xml.png" />
          </li>

          <li>
            Kliknite na kolonku “Načítať zo súboru” vľavo nižšie.
            <br />
            <img alt="Krok 6" src="/assets/images/6xml.png" />
          </li>

          <li>Potvrďte “Áno”.</li>

          <li>
            Vyhľadajte súbor XML (pravdepodobne v adresári “Stiahnuté”) a
            označte ho.
          </li>

          <li>
            Kliknite na kolonku “Podpísať KEP-om” a následne “Podať podpísane
            KEP-om” alebo “Podpísať a podať EZ-ou”, ak ste na príhlasenie
            použili identifikátor a heslo.
            <br />
            <img alt="Krok 1" src="/assets/images/7xml.png" />
          </li>

          <li>
            Vráťte sa na Hlavnú stránku a v sekcii “História komunikácie”
            skontrolujte v “Odoslané dokumenty”, že ste daňové priznanie úspešne
            podali. V “Stave spracovania” by ste mali mať napísané “Prijaté a
            potvrdené”.
            <br />
            <img alt="Krok 1" src="/assets/images/8xml.png" />
          </li>
        </ol>
      </div>
      <style jsx>{`
        li {
          margin-top: 8px;
        }
        img {
          margin-top: 8px;
          width: 100%;
        }
      `}</style>
    </>
  );
};

export default Vysledky;
