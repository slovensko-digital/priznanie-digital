import React from 'react'
import { BooleanRadio, Input } from './FormComponents'
import { Details } from './Details'
import {
  OSLOBODENIE_PRENAJOM_A_PRILZ_CINNOSTI,
  TAX_YEAR,
} from '../lib/calculation'
import { Warning } from './Warning'
import { useFormikContext } from 'formik'
import { RentUserInput } from '../types/PageUserInputs'
import { formatCurrency, parseInputNumber } from '../lib/utils'
import Decimal from 'decimal.js'
import { ExternalLink } from './ExternalLink'
export const ApplyForBonusQuestion = ({ disabled }) => (
  <>
    <BooleanRadio
      title={'Prenajímali ste v roku 2023 nehnuteľnosť?'}
      name="rent"
      hint="Nie na základe živnostenského oprávnenia, nezaradenú do obchodného majetku s výdavkami vedenými podľa daňovej evidencie "
      disabled={disabled}
    />
  </>
)

export const IncomeQuestion = ({ disabled }) => {
  return (
    <>
      <Input
        name="vyskaPrijmovZPrenajmu"
        type="number"
        label={`Výška príjmov z prenájmu nehnuteľností dosiahnutá v roku ${TAX_YEAR}.`}
        disabled={disabled}
      />
    </>
  )
}

export const OslobodenieQuestion = ({ disabled }) => (
  <>
    <BooleanRadio
      name="prenajomPrijemZPrilezitostnejCinnosti"
      title={`Dosiahli ste v roku ${TAX_YEAR} aj príjem z príležitostnej činnosti?`}
      disabled={disabled}
    />
    <p className="govuk-hint">
      Od dane z príjmov sú oslobodené:
      <ul>
        <li>príjmy z prenájmu nehnuteľností a</li>
        <li>príjmy z príležitostnej činnost</li>
      </ul>
      ak úhrn týchto príjmov nepresiahne v zdaňovacom období{' '}
      {formatCurrency(OSLOBODENIE_PRENAJOM_A_PRILZ_CINNOSTI)}, pričom ak takto
      vymedzené príjmy presiahnu túto sumu, do základu dane sa zahrnú len príjmy
      nad sumu {formatCurrency(OSLOBODENIE_PRENAJOM_A_PRILZ_CINNOSTI)}. Detailné
      informácie nájdete na stránke{' '}
      <ExternalLink href="https://podpora.financnasprava.sk/186937-Oslobodenie-pr%C3%ADjmov-z-pr%C3%ADle%C5%BEitostn%C3%BDch-%C4%8Dinnost%C3%AD">
        Finančnej správy SR
      </ExternalLink>
      .
    </p>
    <Details title="Čo je príjem z príležitostnej činnosti?">
      <>
        <p>
          Príjmom z príležitostnej činnosti je iba taký príjem, ktorý plynie
          fyzickej osobe bez zmluvne dohodnutých podmienok. Príležitostný príjem
          je zárobok, ktorý je občasný, je nepravidelný, to ale neznamená, že
          musí ísť o jednorazový príjem. Detailné informácie nájdete na stránke{' '}
          <ExternalLink href="https://podpora.financnasprava.sk/531581-Pr%C3%ADjmy-z-pr%C3%ADle%C5%BEitostn%C3%BDch-%C4%8Dinnost%C3%AD">
            Finančnej správy SR
          </ExternalLink>
          .
        </p>
        <ul>
          <li>pokosenie trávy susedovi</li>
          <li>prenájom automobilu</li>
          <li>príjem z prenájmu hnuteľných vecí</li>
          <li>
            predaj poľnohospodárskych produktov dopestovaných vo vlastnej
            záhrade napr. zelenina, ovocie,...
          </li>
          <li>...</li>
        </ul>
      </>
    </Details>
    <Warning>
      Príjem z príležitostnej činnosti nad{' '}
      {formatCurrency(OSLOBODENIE_PRENAJOM_A_PRILZ_CINNOSTI)} momentálne nie je
      podporovaný.
    </Warning>
  </>
)

export const OslobodenieVyskaQuestion = ({ disabled }) => {
  const { values } = useFormikContext<RentUserInput>()
  const {
    prenajomPrijemZPrilezitostnejCinnosti,
    vyskaPrijmovZPrenajmu,
    vyskaOslobodenia,
  } = values
  let priznanyPrijem = null
  const oslobodenie = parseInputNumber(vyskaOslobodenia)
  if (oslobodenie > 0) {
    priznanyPrijem = Decimal.max(
      new Decimal(parseInputNumber(vyskaPrijmovZPrenajmu)).minus(
        new Decimal(oslobodenie),
      ),
      0,
    )
  }
  const hint =
    prenajomPrijemZPrilezitostnejCinnosti === true
      ? `Na príjem z prenájmu už môžete využiť iba zvyšok oslobodenia po odpočítani príjmu z príležitostnej činnosti. Teda ${formatCurrency(
          OSLOBODENIE_PRENAJOM_A_PRILZ_CINNOSTI,
        )} mínus príjem z príležitostnej činnosti.`
      : `Keďže ste nemali príjem z príležitostnej činnosti, môžete si uplatniť oslobodenie v maximálnej výške ${formatCurrency(
          OSLOBODENIE_PRENAJOM_A_PRILZ_CINNOSTI,
        )}.`
  return (
    <>
      <Input
        name="vyskaOslobodenia"
        type="number"
        label="Akú výšku oslobodenia od dane si uplatňujete na príjem z prenájmu?"
        hint={hint}
        disabled={disabled}
        min={1}
        max={500}
      />
      {priznanyPrijem && (
        <p>
          Váš priznaný príjem z prenájmu nehnuteľností bude{' '}
          {formatCurrency(priznanyPrijem.toNumber())}.
        </p>
      )}
    </>
  )
}

export const VydavkyQuestion = ({ disabled }) => (
  <>
    <Input
      name="vydavkyZPrenajmu"
      type="number"
      label={`Výška preukázateľných výdavkov spojených s príjmami z prenájmu nehnuteľností v roku ${TAX_YEAR}`}
      disabled={disabled}
      min={1}
      max={500}
    />
    <Details title="Čo sú preukázateľné výdavky">
      <>
        <p>
          V prípade nehnuteľnosti nezaradenej v obchodnom majetku je možné
          uplatniť nasledovné preukázateľné výdavky:
        </p>
        <ol>
          <li>
            Výdavky za spotrebu energií (vody, plynu, tepla, elektrickej
            energie)
          </li>
          <li>Zaplatené preddavky do fondu prevádzky, opráv a údržby;</li>
          <li>Výdavky za služby v prenajatej nehnuteľnosti, ako napr:</li>
          <ul>
            <li>
              odvádzane odpadovej vody z domácností, osvetlenie spoločných
              priestorov bytového domu
            </li>
            <li>
              používanie a servis výťahu, používanie domovej práčovne, kontrola
              a čistenie komínov, čistenie žúmp
            </li>
            <li>poplatky za TV a rozhlas vrátane koncesionárskych poplatkov</li>
            <li>poplatky za pripojenie na internet</li>
            <li>
              poplatky za povinnú správu bytového domu, službu vrátnika,
              recepcie, výdavky na strážnu službu, upratovanie spoločných
              priestorov bytového domu
            </li>
            <li>
              výdavky za odvoz smetí, okrem miestneho poplatku za odvoz
              komunálneho odpadu
            </li>
            <li>
              úhrady vlastníka bytu a nebytového priestoru za výkon činnosti
              zástupcu vlastníkov bytov a nebytových priestorov
            </li>
          </ul>
        </ol>
      </>
    </Details>
  </>
)

export const PreviousButton = ({ onClick }) => (
  <button
    className="govuk-button btn-secondary"
    type="button"
    onClick={onClick}
  >
    Späť
  </button>
)

export const SubmitButton = () => (
  <button className="govuk-button" type="submit">
    Pokračovať
  </button>
)
