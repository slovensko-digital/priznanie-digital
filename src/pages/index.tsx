import React from 'react'
import { Warning } from '../components/Warning'

const Index = () => (
  <>
    <h1 className="govuk-heading-l govuk-!-margin-top-3">
      Vyplnenie daňového priznania
      <br />
      (verzia pre rok 2019)
    </h1>

    <Warning>Na verzii pre rok 2020 aktuálne pracujeme.</Warning>

    <p>Vyplňte si daňové priznanie rýchlo a jednoducho.</p>

    <p>
      Po zadaní základných údajov si môžete stiahnuť pripravené daňové priznanie
      a následne vás prevedieme procesom jeho podania na stránkach Finančnej
      správy.
    </p>

    <p>
      Aplikácia je určená na podanie riadneho a opravného daňového priznania pre
      SZČO uplatňujúce si paušálne výdavky.
    </p>

    <p>
      Projekt vznikol spoluprácou skupiny dobrovoľníkov a daňových poradcov.
    </p>

    <Warning>
      <>
        <p>
          <strong>Tieto prípady zatiaľ nepodporujeme:</strong>
        </p>
        <ul className="govuk-list govuk-list--bullet">
          <li>Iné príjmy ako zo živnosti a zamestnania</li>
          <li>Príjem zo zahraničia</li>
          <li>Daňový bonus na zaplatené úroky</li>
          <li>Daňové straty</li>
          <li>SZČO starobní dôchodcovia</li>
          <li>Práca na dohodu</li>
          <li>Záväzky a pohľadávky (tabuľka 1b)</li>
        </ul>
      </>
    </Warning>

    <button
      type="button"
      className="govuk-button govuk-button--large govuk-button--start govuk-button--disabled"
      disabled
    >
      Pripraviť daňové priznanie
    </button>
  </>
)

export default Index
