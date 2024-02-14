import React from 'react'
import { BooleanRadio, Checkbox, Input } from './FormComponents'
import { formatRodneCislo } from '../lib/utils'
import { RentFormProps } from './RentForm'
import { Details } from './Details'
import { TAX_YEAR } from '../lib/calculation'

export const ApplyForBonusQuestion = ({ disabled }) => (
  <>
    <BooleanRadio
      title={'Prenajímali ste v roku 2023 nehnuteľnosť (nie na základe živnostenského oprávnenia) nezaradenú do obchodného majetku?'}
      name="prenajimalSi"
      disabled={disabled}
    />
    <Details title="Kedy si môžem uplatniť zvýhodnenie?">
      <>
        <p>
          xxx
        </p>
      </>
    </Details>
  </>
)

export const IncomeQuestion = ({ disabled }) => {
  return (
    <>
      <Input
        name="vyskaPrijmovZPrenajmu"
        type="number"
        label={`Výška príjmov z prenájmu nehnuteľností dosiahnutá v roku ${TAX_YEAR}`}
        disabled={disabled}
      />
    </>
  )
}

export const OslobodenieQuestion = ({ disabled }) => (
  <BooleanRadio
    name="prijemZPrenajmuOslobodenieDane"
    title="Chcete pri príjmoch z prenájmu nehnuteľností uplatniť oslobodenie od dane max. do výšky 500 EUR?
    "
    disabled={disabled}
  />
)

export const OslobodenieVyskaQuestion = ({ disabled }) => (
  <BooleanRadio
    name="vyskaOslobodenia"
    title="Ak ste v danom roku dosiahli aj príjem z príležitostnej činnosti, oslobodenie od dane max. do výšky 500 EUR sa uplatňuje spolu na príjmy z prenájmu nehnuteľností a príjmy z príležitostnej činnosti."
    disabled={disabled}
    hint="xxxxx"
  />
)

export const VydavkyQuestion = ({ disabled }) => (
    <BooleanRadio
      name="prijemZPrenajmuVyskaOslobodenia"
      title={`Výška preukázateľných výdavkov spojených s príjmami z prenájmu nehnuteľností v roku ${TAX_YEAR}`}
      disabled={disabled}
      hint="xxxxx"
    />
  )

export const VydavkyFormaQuestion = ({ disabled }) => (
    <div className="govuk-form-group">
      <legend className="govuk-fieldset__legend govuk-fieldset__legend--l">
        <h1 className="govuk-fieldset__heading">
        Preukázateľné výdavky uplatňujem na základe.
        </h1>
      </legend>
      <Checkbox
        name="rent_podmienky.1"
        label="daňovej evidencie (najčastejší spôsob)"
        disabled={disabled}
      />
      <Checkbox
        name="rent_podmienky.2"
        label="jednoduchého účtovníctva"
        disabled={disabled}
      />
      <Checkbox
        name="rent_podmienky.3"
        label="podvojného účtovníctva"
        disabled={disabled}
      />
    </div>
  )

  export const EligiblePartnerForm = ({
    values,
    setFieldValue,
  }: RentFormProps) => (
    <>
      <h1 className="govuk-heading-l govuk-!-margin-top-3">
        Vybrané údaje o manželke / manželovi
      </h1>
      <Input
        name="r031_priezvisko_a_meno"
        type="text"
        label="Meno a priezvisko manželky / manžela"
      />
      <Input
        name="rent"
        type="text"
        label="Rodné číslo"
        maxLength={13}
        onChange={async (event) => {
          const pscValue = formatRodneCislo(
            event.currentTarget.value,
            values.rent,
          )
          setFieldValue('rent', pscValue)
        }}
      />

      <Input
        name="r032_partner_pocet_mesiacov"
        type="number"
        min={1}
        max={12}
        label="Počet mesiacov, v ktorých manželka / manžel spĺňal/a podmienky?"
        hint="Pozor! Ak sú splnené uvedené podmienky iba jeden alebo niekoľko kalendárnych mesiacov v zdaňovacom období, môže si daňovník znížiť základ dane o nezdaniteľnú časť základu dane na manželku zodpovedajúcu 1/12 sumy nezdaniteľnej časti za každý kalendárny mesiac, na začiatku ktorého boli splnené podmienky na uplatnenie tejto nezdaniteľnej časti základu dane."
      />
    </>
  )

  export const NotEligible = () => (
    <div data-test="ineligible-message">
      <h1 className="govuk-heading-l govuk-!-margin-top-3">
        Nemáte nárok na uplatnenie
      </h1>
      <p>Nespĺňate podmienky pre uplatnenie zvýhodnenia na manželku / manžela</p>
    </div>
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
