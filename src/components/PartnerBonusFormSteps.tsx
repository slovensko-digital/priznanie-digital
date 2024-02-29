import React from 'react'
import { BooleanRadio, Checkbox, Input } from './FormComponents'
import { formatRodneCislo } from '../lib/utils'
import { PartnerBonusFormProps } from './PartnerBonusForm'
import { Details } from './Details'
import { TAX_YEAR } from '../lib/calculation'

export const ApplyForBonusQuestion = ({ disabled }) => (
  <>
    <BooleanRadio
      title={'Chcete si uplatniť zvýhodnenie na manželku / manžela?'}
      name="r032_uplatnujem_na_partnera"
      disabled={disabled}
    />
    <Details title="Kedy si môžem uplatniť zvýhodnenie?">
      <>
        <p>
          Zvýhodnenie si môžete uplatniť, ak manželka / manžel spĺňa aspoň jednu
          z týchto podmienok:
        </p>
        <ol>
          <li>
            staral/-a sa o vyživované maloleté dieťa, ktoré s vami žije v
            domácnosti;
          </li>
          <li>poberal/-a peňažný príspevok na opatrovanie;</li>
          <li>bol/-a na úrade práce v evidencii uchádzačov o zamestnanie;</li>
          <li>
            je občanom so zdravotným postihnutím alebo s ťažkým zdravotným
            postihnutím (držiteľom prekazu ŤZP).
          </li>
        </ol>
      </>
    </Details>
  </>
)

export const IncomeQuestion = ({ disabled }) => {
  return (
    <>
      <Input
        name="r032_partner_vlastne_prijmy"
        type="number"
        label={`Vlastné príjmy manželky / manžela za zdaňovacie obdobie ${TAX_YEAR}`}
        disabled={disabled}
      />
      <Details title="Ako vypočítať vlastný príjem?">
        <>
          <p>Do vlastného príjmu manželky / manžela patria napr.:</p>
          <ul>
            <li>materské,</li>
            <li>príjem zo zamestnania (znížený o poistné),</li>
            <li>príjmy z podnikania (v plnej výške),</li>
            <li>podpora v nezamestnanosti,</li>
            <li>sociálne dávky,</li>
            <li>dávky a príspevky v hmotnej núdzi,</li>
            <li>nemocenské a úrazové dávky,</li>
            <li>peňažný príspevok na opatrovanie</li>
            <li>dôchodok (invalidný, starobný, výsluhový, vdovský)</li>
            <li>dávky z garančného poistenia,</li>
            <li>príjmy z prenájmu,</li>
            <li>úroky z vkladov,</li>
            <li>výhry,</li>
            <li>
              podiel na zisku (dividenda) vyplácaný zo zisku obchodnej
              spoločnosti alebo družstva
            </li>
            <li>príjmy z kapitálového majetku</li>
            <li>ostatné príjmy</li>
          </ul>
          <p>
            Vlastný príjem manželky (manžela) sa znižuje o zaplatené poistné a
            príspevky na zdravotné a sociálne poistenie, ktoré bola manželka
            (manžel) povinná zaplatiť.
          </p>
          <p>Do vlastného príjmu manželky / manžela nepatria:</p>
          <ul>
            <li>zamestnanecká prémia,</li>
            <li>daňový bonus na deti,</li>
            <li>zvýšenie dôchodku pre bezvládnosť,</li>
            <li>
              štátne sociálne dávky (rodičovský príspevok, prídavok na dieťa,
              príplatok k prídavku na dieťa, príspevok pri narodení dieťaťa, na
              viac súčasne narodených detí, príspevok na pohreb, vianočný
              príspevok dôchodcom, príplatok k dôchodku politických väzňov,
              príspevok športovému reprezentantovi),
            </li>
            <li>
              štipendium poskytované študentovi, ktorý sa sústavne pripravuje na
              budúce povolanie.
            </li>
          </ul>
        </>
      </Details>
    </>
  )
}

export const HouseholdQuestion = ({ disabled }) => (
  <BooleanRadio
    name="partner_spolocna_domacnost"
    title="Žije s vami manželka / manžel v spoločnej domácnosti?"
    disabled={disabled}
  />
)

export const ConditionsQuestion = ({ disabled }) => (
  <div className="govuk-form-group">
    <legend className="govuk-fieldset__legend govuk-fieldset__legend--l">
      <h1 className="govuk-fieldset__heading">
        Spĺňa vaša manželka / manžel aspoň jednu z podmienok?
      </h1>
    </legend>
    <Checkbox
      name="partner_podmienky.1"
      label="Staral/a sa o dieťa do 3 rokov"
      disabled={disabled}
    />
    <Checkbox
      name="partner_podmienky.2"
      label="Staral/a sa o dieťa do  6 rokov s nepriaznivým zdravotným stavom"
      disabled={disabled}
    />
    <Checkbox
      name="partner_podmienky.3"
      label="Poberal/a príspevok na opatrovanie ťažko zdravotne postihnutého"
      disabled={disabled}
    />
    <Checkbox
      name="partner_podmienky.4"
      label="Bol/a evidovaný/á ako uchádzač o zamestnanie"
      disabled={disabled}
    />
    <Checkbox
      name="partner_podmienky.5"
      label="Považuje sa za občana so zdravotným postihnutím alebo s ťažkým zdravotným postihnutím"
      disabled={disabled}
    />
  </div>
)

export const NotEligible = () => (
  <div data-test="ineligible-message">
    <h1 className="govuk-heading-l govuk-!-margin-top-3">
      Nemáte nárok na uplatnenie
    </h1>
    <p>Nespĺňate podmienky pre uplatnenie zvýhodnenia na manželku / manžela</p>
  </div>
)

export const EligiblePartnerForm = ({
  values,
  setFieldValue,
}: PartnerBonusFormProps) => (
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
      name="r031_rodne_cislo"
      type="text"
      label="Rodné číslo"
      maxLength={13}
      onChange={async (event) => {
        const pscValue = formatRodneCislo(
          event.currentTarget.value,
          values.r031_rodne_cislo,
        )
        setFieldValue('r031_rodne_cislo', pscValue)
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
