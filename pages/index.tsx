import React from 'react';
import Link from 'next/link';

export default () => (
  <>
    <div className="govuk-grid-column-full">
      <h1 className="govuk-heading-l">
        Návod na vyplnenie daňového priznania pre SZČO
      </h1>
      <p>
        Daňové priznanie je jeden z najväčších byrokratických strašiakov
        podnikateľov. A pritom pri zadaní pár jednoduchých údajov si ho môže
        vyplniť ktokoľvek za pár minút bez väčších problémov. Chceme takto
        malými krokmi uľahčiť život státisicom živnostníkov.
      </p>

      <p>
        Ak ste SZČO (živnostník) a uplatňujete si paušálne výdavky, tak vám
        pomôžeme vyplniť daňové priznanie (k dani z príjmov fyzickej osoby, typ
        B) a tiež vás detailne prevedieme aj procesom podania na stránkach
        Finančnej správy.
      </p>

      <Link href="/prijmy-a-vydavky">
        <button
          type="button"
          className="govuk-button govuk-button--large govuk-button--start"
        >
          Pripraviť daňové priznanie
        </button>
      </Link>
    </div>

    <div className="govuk-grid-column-full govuk-warning-text govuk-!-margin-top-9">
      <span className="govuk-warning-text__icon" aria-hidden="true">
        !
      </span>
      <strong className="govuk-warning-text__text">
        <span className="govuk-warning-text__assistive">Upozornenie</span>
        Riadny termín pre podanie daňového priznania a zaplatenie dane je 31.3.
        <br />
        Termín si viete predĺžiť až do 30.6. (ak ste mali príjmy len
        zo&nbsp;Slovenska) alebo&nbsp;do&nbsp;30.9. (ak&nbsp;ste mali príjmy aj
        zo zahraničia).
      </strong>
    </div>

    <div className="govuk-grid-column-full">
      <Link href="/prijmy-a-vydavky">
        <button type="button" className="btn-secondary govuk-button">
          Odložiť daňové priznanie
        </button>
      </Link>
    </div>
  </>
);
