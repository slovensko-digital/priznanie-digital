import React from "react";
import styles from "./vysledky.module.css";
import Link from "next/link";

const backUrl = "/osobne-udaje";
export default ({ taxForm }) => (
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
    <button className="govuk-button">Stiahnut XML (TODO)</button>
  </>
);
