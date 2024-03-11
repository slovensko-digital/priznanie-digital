import React from 'react'
import Link from 'next/link'
import styles from './index.module.css'
import { Warning } from '../components/Warning'
import { TAX_YEAR } from '../lib/calculation'
import { ExternalLink } from '../components/ExternalLink'

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

const Home = ({ nextRoute, nextPostponeRoute, isDebug, isLive, isPostponeLive }) => (
  <>
    <div className="govuk-grid-column-two-thirds">
      <TaxFormSection nextRoute={nextRoute} isDebug={isDebug} isLive={isLive} />
    </div>

    <div className="govuk-grid-column-one-third">
      <div className={styles.postponeBox}>
        <PostponeSection nextPostponeRoute={nextPostponeRoute} now={new Date()} isPostponeLive={isPostponeLive} isDebug={isDebug} />
      </div>

      <ul className={styles.safeList}>
        <li>
          <IconLock />
          <p>Bezpečné SSL pripojenie</p>
        </li>
        <li>
          <IconCheck />
          <p>
            Pripravené v spolupráci s daňovými poradcami z{' '}
            <ExternalLink href="https://www.linkedin.com/company/avenias/">
              AVENIAS Tax & Legal
            </ExternalLink>
          </p>
        </li>
      </ul>
    </div>
  </>
)

export default Home

const TaxFormSection = ({ nextRoute, isDebug, isLive }) => {
  return (
    <>
      <h1 className="govuk-heading-l govuk-!-margin-top-3">
        Vyplnenie daňového priznania
        <br />
        {`(verzia pre rok ${TAX_YEAR})`}
      </h1>

      {!isLive && (
        <Warning className="govuk-!-font-weight-bold">
          Na aktuálnej verzii pracujeme.
        </Warning>
      )}
      <p className="govuk-body-l">
        {isLive
          ? `Vyplňte si daňové priznanie rýchlo a jednoducho.`
          : `Daňové priznanie si tak budete môcť aj v roku ${TAX_YEAR + 1} pripraviť
        rýchlo a jednoducho.`}
      </p>

      <p>
        Po zadaní základných údajov bude možné stiahnuť si pripravené daňové
        priznanie a následne vás prevedieme aj procesom jeho podania na
        stránkach Finančnej správy.
      </p>

      <p>
        Aplikácia je určená na podanie riadneho a opravného daňového priznania
        pre SZČO uplatňujúce si paušálne výdavky.
      </p>

      <p>
        Projekt vznikol spoluprácou skupiny dobrovoľníkov a daňových poradcov,
        ktorí každý rok pracujú na aktualizácii návodu aj aplikácie.
      </p>

      <Warning>
        <>
          <p>
            <strong>Tieto prípady zatiaľ nepodporujeme:</strong>
          </p>
          <ul className="govuk-list govuk-list--bullet">
            <li>Iné príjmy ako zo živnosti, zamestnania a z prenájmu nehnuteľností</li>
            <li>Príjem zo zahraničia (s výnimkou príjmov zo živnosti - poskytovanie služieb)</li>
            <li>Daňový bonus zo zvýšenia zaplatenej splátky úveru na bývanie</li>
            <li>Daňové straty</li>
            <li>SZČO starobní dôchodcovia</li>
            <li>Práca na dohodu</li>
            <li>Záväzky a pohľadávky (tabuľka 1b)</li>
            <li>
              <ExternalLink href="https://kros.sk/danove-priznania/">
                Pre nepodporované prípady môžete použiť aplikáciu KROS
              </ExternalLink>
          </li>
          </ul>
        </>
      </Warning>

      <p className="govuk-body-xs">
        Používaním tejto služby súhlasíte so spracovaním osobných údajov v
        rozsahu nevyhnutnom na vygenerovanie daňového priznania. Vaše údaje
        neukladáme, sú použité výlučne na spracovanie daňového priznania.
      </p>

      {(isLive || isDebug) && (
        <Link href={nextRoute} legacyBehavior>
          <button
            type="button"
            className="govuk-button govuk-button--large govuk-button--start govuk-!-margin-bottom-3"
          >
            Súhlasím a chcem pripraviť daňové priznanie
          </button>
        </Link>
      )}

      {!isLive && (
        <Link
          href="https://navody.digital/zivotne-situacie/elektronicke-podanie-danoveho-priznania-2023#aplikacia"
          legacyBehavior
        >
          <button
            type="button"
            className="govuk-button govuk-button--large govuk-button--start"
          >
            Informujte ma keď bude aplikácia pripravená
          </button>
        </Link>
      )}
    </>
  )
}

const PostponeSection = ({ nextPostponeRoute, now, isPostponeLive, isDebug }) => (
  <>
    <h2 className="govuk-heading-m govuk-!-margin-top-3">
      {`Odklad daňového priznania za rok ${TAX_YEAR}`}
    </h2>
    <PostponeText now={now}/>
    <ul className="govuk-list govuk-list--bullet">
      <li>{`do 30.6.${TAX_YEAR + 1} ak ste mali príjmy len zo Slovenska, alebo`}</li>
      <li>{`do 30.9.${TAX_YEAR + 1} ak ste mali príjmy aj zo zahraničia`}</li>
    </ul>

    {
      (isPostponeLive || isDebug) && (
        <>
          <p className="govuk-body-xs">
            Používaním tejto služby súhlasíte so spracovaním osobných údajov v rozsahu
            nevyhnutnom na vygenerovanie odkladu daňového priznania. Vaše údaje
            neukladáme, sú použité výlučne na spracovanie odkladu daňového priznania.
          </p>
          <PostponeButton now={now} nextPostponeRoute={nextPostponeRoute} />
        </>
      )
    }
  </>
)

const PostponeText = ({ now }: { now: Date}) => (
  <>
    {((now.getMonth() > 2) && (now.getFullYear() == TAX_YEAR+1)) && (
      <>
        <p>
          {`Riadny termín pre podanie daňového priznania a zaplatenie dane bol do
      31.3.${TAX_YEAR + 1}`}
        </p>
        <p>Termín ste si mohli predĺžiť:</p>
      </>)}
    {(now.getMonth() < 3 || now.getFullYear() == TAX_YEAR) && (
      <>
        <p>
          {`Riadny termín pre podanie daňového priznania a zaplatenie dane je
  31.3.${TAX_YEAR + 1}`}
        </p>
        <p>Termín si viete predĺžiť:</p>
      </>)}
  </>
)

const PostponeButton = ({ now, nextPostponeRoute }) => {
  const isPostponeTime = now.getMonth() < 3

  if (!isPostponeTime) {
    return (
      <button
        type="button"
        className="btn-secondary govuk-button govuk-button--large govuk-button--disabled"
        disabled
      >
        Termín na podanie odkladu DP vypršal
      </button>
    )
  }

  if (isPostponeTime) {
    return (
      <Link href={nextPostponeRoute} legacyBehavior>
        <button
          type="button"
          className="btn-secondary govuk-button govuk-button--large"
        >
          Súhlasím a chcem odložiť daňové priznanie
        </button>
      </Link>
    )
  }
}
