import React from 'react'
import Link from 'next/link'
import styles from './domov.module.css'
import { Warning } from '../components/Warning'

const Home = ({ nextRoute, nextPostponeRoute }) => (
  <>
    <div className="govuk-grid-column-two-thirds">
      <TaxFormSection nextRoute={nextRoute} />
    </div>

    <div className="govuk-grid-column-one-third">
      <div className={styles.postponeBox}>
        <PostponeSection nextPostponeRoute={nextPostponeRoute} />
      </div>
    </div>
  </>
)

export default Home

const TaxFormSection = ({ nextRoute }) => (
  <>
    <h1 className="govuk-heading-l govuk-!-margin-top-3">
      Vyplnenie daňového priznania
      <br />
      (verzia pre rok 2020)
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
  </>
)

const PostponeSection = ({ nextPostponeRoute }) => (
  <>
    <h2 className="govuk-heading-m govuk-!-margin-top-3">
      Odklad daňového priznania
    </h2>
    <p>
      Riadny termín pre podanie daňového priznania a zaplatenie dane je 31.3.
    </p>
    <p>Termín si viete predĺžiť:</p>
    <ul className="govuk-list govuk-list--bullet">
      <li>do 30.6. ak ste mali príjmy len zo Slovenska, alebo</li>
      <li>do 30.9. ak ste mali príjmy aj zo zahraničia</li>
    </ul>

    <Link href={nextPostponeRoute}>
      <button
        type="button"
        className="btn-secondary govuk-button govuk-button--large"
      >
        Odložiť daňové priznanie
      </button>
    </Link>
  </>
)
