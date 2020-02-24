import React from "react";
import styles from "./vysledky.module.css";
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
    </>
  );
};

export default Vysledky;
