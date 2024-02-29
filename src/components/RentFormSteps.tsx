import React from 'react'
import { BooleanRadio, Input } from './FormComponents'
import { Details } from './Details'
import { TAX_YEAR } from '../lib/calculation'
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
  <BooleanRadio
    name="prenajomPrijemZPrilezitostnejCinnosti"
    title={`Dosiahli ste v roku ${TAX_YEAR} aj príjem z príležitostnej činnosti?`}
    hint="Maximálne do výšky 500 EUR"
    disabled={disabled}
  />
)

export const OslobodenieVyskaQuestion = ({ disabled }) => {
  return (
    <>
      <Input
        name="vyskaOslobodenia"
        type="number"
        label="Ak áno oslobodenie od dane max. do výšky 500 EUR sa uplatňuje spolu na príjmy z prenájmu nehnuteľností a príjmy z príležitostnej činnosti."
        hint="Akú výšku oslobodenia od dane si uplatňujete?"
        disabled={disabled}
        min={1}
        max={500}
      />
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
        V prípade nehnuteľnosti nezaradenej v obchodnom majetku je možné uplatniť nasledovné preukázateľné výdavky:
        </p>
        <ol>
        <li>Výdavky za spotrebu energií (vody, plynu, tepla, elektrickej energie)</li>
        <li>Zaplatené preddavky do fondu prevádzky, opráv a údržby;</li>
        <li>Výdavky za služby v prenajatej nehnuteľnosti, ako napr:</li>
        <ul>
          <li>odvádzane odpadovej vody z domácností, osvetlenie spoločných priestorov bytového domu</li>
          <li>používanie a servis výťahu, používanie domovej práčovne, kontrola a čistenie komínov, čistenie žúmp</li>
          <li>poplatky za TV a rozhlas vrátane koncesionárskych poplatkov</li>
          <li>poplatky za pripojenie na internet</li>
          <li>poplatky za povinnú správu bytového domu, službu vrátnika, recepcie, výdavky na strážnu službu, upratovanie spoločných priestorov bytového domu</li>
          <li>výdavky za odvoz smetí, okrem miestneho poplatku za odvoz komunálneho odpadu</li>
          <li>úhrady vlastníka bytu a nebytového priestoru za výkon činnosti zástupcu vlastníkov bytov a nebytových priestorov</li>
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
