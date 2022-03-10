import React from 'react'
import Link from 'next/link'
import styles from './index.module.css'
import { Warning } from '../components/Warning'
import { ExternalLink } from '../components/ExternalLink'
import { TAX_YEAR } from '../lib/calculation'

const IconCheck = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="24"
    viewBox="0 0 24 24"
    width="24"
  >
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
  </svg>
)

const IconLock = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="24"
    viewBox="0 0 24 24"
    width="24"
  >
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
  </svg>
)

const Home = ({ nextRoute, nextPostponeRoute }) => (
  <>
    <div className="govuk-grid-column-two-thirds">
      <TaxFormSection nextRoute={nextRoute} />
    </div>

    <div className="govuk-grid-column-one-third">
      <div className={styles.postponeBox}>
        <PostponeSection nextPostponeRoute={nextPostponeRoute} />
      </div>

      <ul className={styles.safeList}>
        <li>
          <IconLock />
          <p>Bezpečné SSL pripojenie</p>
        </li>
        <li>
          <IconCheck />
          <p>Pripravené v spolupráci s daňovými poradcami</p>
        </li>
      </ul>
    </div>
  </>
)

export default Home

const TaxFormSection = ({ nextRoute }) => (
  <>
    <h1 className="govuk-heading-l govuk-!-margin-top-3">
      Vyplnenie daňového priznania
      <br />
      {`(verzia pre rok ${TAX_YEAR})`}
    </h1>

    <p className="govuk-body-l">
      Vyplňte si daňové priznanie rýchlo a jednoducho.
    </p>

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
          <li>Príspevky z prvej pomoci</li>
        </ul>
      </>
    </Warning>

    <p className="govuk-body-xs">
      Používaním tejto služby súhlasíte so spracovaním osobných údajov v rozsahu
      nevyhnutnom na vygenerovanie daňového priznania. Vaše údaje neukladáme, sú
      použité výlučne na spracovanie daňového priznania.
    </p>

    <Link href={nextRoute}>
      <button
        type="button"
        className="govuk-button govuk-button--large govuk-button--start"
      >
        Súhlasím a chcem pripraviť daňové priznanie
      </button>
    </Link>
  </>
)

const PostponeSection = ({ nextPostponeRoute }) => (
  <>
    <h2 className="govuk-heading-m govuk-!-margin-top-3">
      {`Odklad daňového priznania za rok ${TAX_YEAR}`}
    </h2>
    <p>
      {`Riadny termín pre podanie daňového priznania a zaplatenie dane je
      31.3.${TAX_YEAR + 1}`}
    </p>
    <p>Termín si viete predĺžiť:</p>
    <ul className="govuk-list govuk-list--bullet">
      <li>{`do 30.6.${
        TAX_YEAR + 1
      } ak ste mali príjmy len zo Slovenska, alebo`}</li>
      <li>{`do 30.9.${TAX_YEAR + 1} ak ste mali príjmy aj zo zahraničia`}</li>
    </ul>

    <p className="govuk-body-xs">
      Používaním tejto služby súhlasíte so spracovaním osobných údajov v rozsahu
      nevyhnutnom na vygenerovanie odkladu daňového priznania. Vaše údaje
      neukladáme, sú použité výlučne na spracovanie odkladu daňového priznania.
    </p>

    <Link href={nextPostponeRoute}>
      <button
        type="button"
        className="btn-secondary govuk-button govuk-button--large"
      >
        Súhlasím a chcem odložiť daňové priznanie
      </button>
    </Link>
  </>
)
