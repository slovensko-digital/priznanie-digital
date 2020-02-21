import React from "react";
import styles from "./vysledky.module.css";
import Link from "next/link";

export default ({ taxForm }) => (
  <>
    <h2>Vysledky</h2>
    <button>Stiahnut XML (TODO)</button>
    <div className={styles.summary}>
      <div>Základ dane: {taxForm.r080_zaklad_dane_celkovo} </div>
      <div>Daň: {taxForm.r105_dan}</div>
      <div>Daň na úhradu: {taxForm.r125_dan_na_uhradu}</div>
      <div>Daňový preplatok: {taxForm.r126_danovy_preplatok}</div>
    </div>
    <Link href="/osobne-udaje">
      <button>Back</button>
    </Link>
  </>
);
