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
    <div className={styles.summary}>
      <div>Základ dane: {taxForm.r080_zaklad_dane_celkovo} </div>
      <div>Daň: {taxForm.r105_dan}</div>
      <div>Daň na úhradu: {taxForm.r125_dan_na_uhradu}</div>
      <div>Daňový preplatok: {taxForm.r126_danovy_preplatok}</div>
    </div>
    <button className="govuk-button">Stiahnut XML (TODO)</button>
  </>
);
