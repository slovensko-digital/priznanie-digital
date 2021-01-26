import React from 'react'
import { Warning } from '../components/Warning'
import { ExternalLink } from '../components/ExternalLink'
import styles from './domov.module.css'
import Link from 'next/link'

const Index = ({ nextPostponeRoute }) => (
  <>
    <div className="govuk-grid-column-two-thirds">
      <PostponeSection nextPostponeRoute={nextPostponeRoute} />
    </div>

    <div className="govuk-grid-column-one-third">
      <div className={styles.postponeBox}>
        <WorkInProgressSection />
      </div>
    </div>
  </>
)

export default Index

const PostponeSection = ({ nextPostponeRoute }) => (
  <>
    <h1 className="govuk-heading-l govuk-!-margin-top-8">
      Odklad daňového priznania
    </h1>
    <p>Vyplňte si odklad daňového priznania rýchlo a jednoducho.</p>
    <p>
      Riadny termín pre podanie daňového priznania a zaplatenie dane je 31.3.
    </p>
    <p>Termín si viete predĺžiť:</p>
    <ul className="govuk-list govuk-list--bullet">
      <li>do 30.6. ak ste mali príjmy len zo Slovenska, alebo</li>
      <li>do 30.9. ak ste mali príjmy aj zo zahraničia</li>
    </ul>
    <p>
      Po zadaní základných údajov si môžete stiahnuť pripravený odklad daňového
      priznania a následne vás prevedieme procesom jeho podania na stránkach
      Finančnej správy.
    </p>
    <p>
      Aplikácia je určená na podanie riadneho a opravného odkladu daňového
      priznania.
    </p>
    <p>
      Projekt vznikol spoluprácou skupiny dobrovoľníkov a daňových poradcov.
    </p>

    <Link href={nextPostponeRoute}>
      <button type="button" className="govuk-button govuk-button--large">
        Odložiť daňové priznanie
      </button>
    </Link>
  </>
)

const WorkInProgressSection = () => {
  const navodyUrl =
    'https://navody.digital/zivotne-situacie/elektronicke-podanie-danoveho-priznania'

  return (
    <>
      <h2 className="govuk-heading-s govuk-!-margin-top-3">
        Vyplnenie daňového priznania
        <br />
        (verzia pre rok 2020)
      </h2>

      <Warning>Na verzii aplikácie pre rok 2020 aktuálne pracujeme.</Warning>

      <p>
        Viac informácii nájdete na{' '}
        <ExternalLink href={navodyUrl}>navody.digital</ExternalLink>, kde nám
        môžete zanechať svoj email a my sa postaráme, aby vám nič neuniklo.
      </p>

      <p>
        Dáme vám vedieť hneď, ako bude dostupná verzia aplikácie na tento rok.
        Nebojte sa, všetko v pohode stíhate :)
      </p>

      <p>
        <ExternalLink
          href={navodyUrl}
          className="btn-secondary govuk-button govuk-button--large"
        >
          Viac informácí
        </ExternalLink>
      </p>
    </>
  )
}
