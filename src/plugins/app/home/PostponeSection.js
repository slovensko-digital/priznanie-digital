import Link from 'next/link'
import { TAX_YEAR } from '../../_shared/calculation/calculation'

export const PostponeSection = ({ nextPostponeRoute }) => (
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
  
      <Link href={nextPostponeRoute} legacyBehavior>
        <button
          type="button"
          className="btn-secondary govuk-button govuk-button--large"
        >
          Súhlasím a chcem odložiť daňové priznanie
        </button>
      </Link>
    </>
  )
  