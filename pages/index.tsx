import React from "react";
import Link from "next/link";
import styles from "./index.module.css";

export default () => (
  <>
    <div className="govuk-grid-column-two-thirds">
      <h1 className="govuk-heading-xl">
        Daňové priznanie pre živostníkov s paušálnymi výdavkami
      </h1>
      <p className="govuk-body-l">
        Vyplniť daňové priznanie online teraz zvládne naozaj každý živnostník
        (SZČO).
      </p>
      <p className="govuk-body-l">
        Prevedieme vás celým formulárom a nakonci poradíme ako daňové priznanie
        úspešne podať na finančnú správu.
      </p>

      <Link href="/prijmy-a-vydavky">
        <button className="govuk-button">Suhlasím a chcem začat</button>
      </Link>
    </div>
  </>
);
