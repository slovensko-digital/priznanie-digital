import React from 'react'
import Link from 'next/link'
import { Warning } from '../components/Warning'

export default ({ nextRoute }) => (
  <>
    <h1 className="govuk-heading-l govuk-!-margin-top-3">
      Vyplnenie daňového priznania
    </h1>

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

    <Link href={nextRoute}>
      <button
        type="button"
        className="govuk-button govuk-button--large govuk-button--start"
      >
        Pripraviť daňové priznanie
      </button>
    </Link>

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
    </div>

    <div className="govuk-grid-column-full">
      <Link href={nextPostponeRoute}>
        <button
          type="button"
          className="btn-secondary govuk-button govuk-button--large"
        >
          Odložiť daňové priznanie
        </button>
      </Link>
    </div> */}
  </>
)
