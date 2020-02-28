import React from "react";
import Link from "next/link";
import fileDownload from "js-file-download";
import { convertToXML } from "../lib/xml/xmlConverter";

const backUrl = "/osobne-udaje";
const Vysledky = ({ taxForm }) => {
  const onExport = () => {
    const xml = convertToXML(taxForm);
    fileDownload(xml, "priznanie.xml");
  };
  return (
    <>
      <Link href={backUrl}>
        <a className="govuk-back-link">Naspat</a>
      </Link>
      <h2>Vysledky</h2>
      <dl className="govuk-summary-list">
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">Základ dane</dt>
          <dd className="govuk-summary-list__value">
            {taxForm.r080_zaklad_dane_celkovo}
          </dd>
        </div>
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">Daň</dt>
          <dd className="govuk-summary-list__value">{taxForm.r105_dan}</dd>
        </div>
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">Daň na úhradu</dt>
          <dd className="govuk-summary-list__value">
            {taxForm.r125_dan_na_uhradu}
          </dd>
        </div>
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">Daňový preplatok</dt>
          <dd className="govuk-summary-list__value">
            {taxForm.r126_danovy_preplatok}
          </dd>
        </div>
      </dl>
      <button className="govuk-button" onClick={onExport}>
        Stiahnut XML
      </button>
      <div>
        <ol className="govuk-list govuk-list--number">
          <li>
            Prihláste sa na portál Finančnej správy - buď pomocou Identifikátora
            a hesla, Kvalifikovaného elektronického podpisu (KEP) alebo
            Občianskym preukazom s elektronickým čipom (eID)
          </li>
          <img src="/assets/images/1xml.png" />
          <img src="/assets/images/2xml.png" />

          <li>Kliknite na Katálog formulárov.</li>
          <img src="/assets/images/3xml.png" />

          <li>
            Nájdite kolonku “Daň z príjmov fyzickej osoby” (vyznačená modrou) a
            kliknite.
          </li>

          <li>
            Kliknite na kolonku “Ďanové priznanie k dani z príjmov fyzickej
            osoby (typ B) a kliknite.
          </li>
          <img src="/assets/images/4xml.png" />

          <li>
            Kliknite na ikonku “zošita s ceruzkou” pri kolonke “Daňové priznanie
            k dani z príjmov FO (typ B) za obdobie 2019.
          </li>
          <img src="/assets/images/5xml.png" />

          <li>Kliknite na kolonku “Načítať zo súboru” vľavo nižšie. </li>
          <img src="/assets/images/6xml.png" />

          <li>Potvrďte “Áno”.</li>
          <img src="/assets/images/7xml.png" />

          <li>
            Vyhľadajte súbor XML (pravdepodobne v adresári “Stiahnuté”) a
            označte ho.
          </li>

          <li>
            Kliknite na kolonku “Podpísať KEP-om” a následne “Podať podpísane
            KEP-om” alebo “Podpísať a podať EZ-ou”, ak ste na príhlasenie
            použili identifikátor a heslo.
          </li>
          <img src="/assets/images/7xml.png" />

          <li>
            Vráťte sa na Hlavnú stránku a v sekcii “História komunikácie”
            skontrolujte v “Odoslané dokumenty”, že ste daňové priznanie úspešne
            podali. V “Stave spracovania” by ste mali mať napísané “Prijaté a
            potvrdené”.
          </li>
          <img src="/assets/images/8xml.png" />
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
