import Link from 'next/link'
import { Warning } from '../../_components/form/Warning'
import { TAX_YEAR } from '../../summary/calculation/calculation'

export const TaxFormSection = ({ nextRoute, isDebug }) => {
    return (
      <>
        <h1 className="govuk-heading-l govuk-!-margin-top-3">
          Vyplnenie daňového priznania
          <br />
          {/* {`(verzia pre rok ${TAX_YEAR})`} */}
        </h1>
  
        <Warning className="govuk-!-font-weight-bold">
          Na aktuálnej verzii pracujeme.
        </Warning>
        <p className="govuk-body-l">
          {/* Vyplňte si daňové priznanie rýchlo a jednoducho. */}
          Daňové priznanie si tak budete môcť aj v roku {TAX_YEAR + 1} pripraviť
          rýchlo a jednoducho.
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
  
        {/* <Warning>
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
        </Warning> */}
  
        {/* <p className="govuk-body-xs">
          Používaním tejto služby súhlasíte so spracovaním osobných údajov v rozsahu
          nevyhnutnom na vygenerovanie daňového priznania. Vaše údaje neukladáme, sú
          použité výlučne na spracovanie daňového priznania.
        </p> */}
  
        {isDebug && (
          <Link href={nextRoute} legacyBehavior>
            <button
              type="button"
              className="govuk-button govuk-button--large govuk-button--start btn-secondary govuk-!-margin-bottom-3"
            >
              Súhlasím a chcem pripraviť daňové priznanie
            </button>
          </Link>
        )}
  
        <Link
          href="https://navody.digital/zivotne-situacie/elektronicke-podanie-danoveho-priznania"
          legacyBehavior
        >
          <button
            type="button"
            className="govuk-button govuk-button--large govuk-button--start"
          >
            Informujte ma keď bude aplikácia pripravená
          </button>
        </Link>
      </>
    )
  }