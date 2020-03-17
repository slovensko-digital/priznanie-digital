import React from 'react';
import { EmailFormInfo } from '../components/EmailFormInfo';

export default () => (
  <>
    <h1 className="govuk-heading-xl">
      Aktuálne otázky a odpovede k podávaniu daňových priznaní pre živnostníkov
      (SZČO)
    </h1>
    <h2 className="govuk-heading-m govuk-!-margin-top-7">
      Musím podať daňové priznanie do konca marca?
    </h2>
    <p>
      Nie. Lehotu na podanie daňového priznania si môžete predĺžiť bez sankcie
      do 30.6. Ak ste mali príjmy aj zo zahraničia, tak až do 30.9.
    </p>
    <p>
      Vzhľadom na aktuálnu situáciu ale vláda navrhuje niekoľko opatrení. Medzi
      nimi aj automatický odklad daňového priznania pre všetkých daňovníkov do
      30.6.
    </p>
    <h2 className="govuk-heading-m govuk-!-margin-top-7">
      Kedy sa dozviem, že nemusím podávať ani žiadosť o predĺženie lehoty na
      podanie daňového priznania za rok 2019?
    </h2>
    <p>
      V priebehu pár dní by to mala oficiálne schváliť vláda. Ak to chcete
      vedieť hneď, tak nám nižšie nechajte váš e-mail a budeme vás kontaktovať.
    </p>
    <h2 className="govuk-heading-m govuk-!-margin-top-7">
      Aké ďalšie opatrenia urobí vláda na podporu živnostníkov a podnikateľov?
    </h2>
    <p>
      Ministri financií a hospodárstva predstavili návrh prvých 13 opatrení. O
      ich schválení a všetkých detailoch vás budeme informovať.
    </p>

    <EmailFormInfo formName="info" />
    {/* <div className="govuk-grid-column-full govuk-warning-text govuk-!-margin-top-9">
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
    </div> */}
  </>
);
