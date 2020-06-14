import React from 'react'
import { BooleanRadio, CheckboxSmall, Input } from './FormComponents'
import { formatRodneCislo } from '../lib/utils'
import { PartnerIncomeProps } from './PartnerIncome'
import { ErrorSummary } from './ErrorSummary'

export const IncomeQuestion = ({ errors, touched, disabled }) => {
  const r032hint = (
    <>
      <p className="govuk-hint">
        Vlastný príjem manželky/manžela je jej/jeho celkový ročný príjem mínus
        poistné a príspevky, ktoré bola/bol v roku 2019 z toho príjmu
        povinná/povinný zaplatiť.
      </p>
      <p className="govuk-hint">Do tohto príjmu patria napr.:</p>
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
          podiel na zisku (dividenda) vyplácaný zo zisku obchodnej spoločnosti
          alebo družstva
        </li>
        <li>príjmy z kapitálového majetku</li>
        <li>ostatné príjmy</li>
      </ul>
      <p className="govuk-hint">
        Do vlastného príjmu manželky/manžela nepatria:
      </p>
      <ul>
        <li>zamestnanecká prémia,</li>
        <li>daňový bonus na deti,</li>
        <li>zvýšenie dôchodku pre bezvládnosť,</li>
        <li>
          štátne sociálne dávky (rodičovský príspevok, prídavok na dieťa,
          príplatok k prídavku na dieťa, príspevok pri narodení dieťaťa, na viac
          súčasne narodených detí, príspevok na pohreb, vianočný príspevok
          dôchodcom, príplatok k dôchodku politických väzňov, príspevok
          športovému reprezentantovi),
        </li>
        <li>
          štipendium poskytované študentovi, ktorý sa sústavne pripravuje na
          budúce povolanie.
        </li>
      </ul>
    </>
  )

  return (
    <>
      {!disabled && <ErrorSummary errors={errors} touched={touched} />}
      <Input
        name="r032_partner_vlastne_prijmy"
        type="number"
        label="Vlastné príjmy manželky/manžela"
        hint={r032hint}
        disabled={disabled}
      />
    </>
  )
}

export const HouseholdQuestion = ({ disabled }) => (
  <BooleanRadio
    name="partner_spolocna_domacnost"
    title="Žije s vami manželka/manžel v spoločnej domácnosti?"
    disabled={disabled}
  />
)

export const AppliedQuestion = ({ disabled }) => (
  <BooleanRadio
    name="partner_bonus_uplatneny"
    title="Uplatnili ste si daňový bonus inou cestou?"
    hint="Daňový bonus na manželku/manžela si môžete uplatniť aj prostredníctvom zamestnávateľa pri ročnom zúčtovaní dane alebo vlastným daňovým priznaním."
    disabled={disabled}
  />
)

export const ConditionsQuestion = ({ disabled }) => (
  <div className="govuk-form-group">
    <legend className="govuk-fieldset__legend govuk-fieldset__legend--l">
      <h1 className="govuk-fieldset__heading">
        Spĺňa vaša manželka/manžel aspoň jednu z nasledovných podmienok?
      </h1>
    </legend>
    <CheckboxSmall
      name="partner_podmienky.1"
      label="Stará sa o dieťa do dovŕšenia 3 roka, resp. 6 rokov života (dieťa, na ktoré sa poskytuje rodičovský príspevok podľa zákona č. 571/2009 Z. z. o rodičovskom príspevku a o zmene a doplnení niektorých zákonov v znení neskorších predpisov)"
      disabled={disabled}
    />
    <CheckboxSmall
      name="partner_podmienky.2"
      label="Poberá príspevok na opatrovanie podľa zákona č. 447/2008 Z. z. o peňažných príspevkoch na kompenzáciu ťažkého zdravotného postihnutia a o zmene a doplnení niektorých zákonov,"
      disabled={disabled}
    />
    <CheckboxSmall
      name="partner_podmienky.3"
      label="Je evidovaná ako uchádzač o zamestnanie"
      disabled={disabled}
    />
    <CheckboxSmall
      name="partner_podmienky.4"
      label="Sa považuje za občana so zdravotným postihnutím"
      disabled={disabled}
    />
    <CheckboxSmall
      name="partner_podmienky.5"
      label="Sa považuje za občana s ťažkým zdravotným postihnutím"
      disabled={disabled}
    />
  </div>
)

export const NotElligible = () => (
  <div data-test="inelligible-message">
    <h1 className="govuk-heading-l govuk-!-margin-top-3">
      Nemáte nárok na uplatnenie
    </h1>
    <p>
      Nespĺňate podmienky pre uplatnenie daňového bonusu na manželku/manžela
    </p>
  </div>
)

export const EligiblePartnerForm = ({
  errors,
  touched,
  values,
  setFieldValue,
}: PartnerIncomeProps) => (
  <>
    <h1 className="govuk-heading-l govuk-!-margin-top-3">Super</h1>
    <p>Máte nárok na uplatnenie daňového bonusu na manželku/manžela</p>
    <ErrorSummary errors={errors} touched={touched} />
    <Input
      name="r031_priezvisko_a_meno"
      type="text"
      label="Meno a priezvisko manželky/manžela"
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
      label="Počet mesiacov, kedy manžel/manželka spĺňal/a podmienky?"
      hint="Pozor, ak sú splnené uvedené podmienky iba jeden alebo niekoľko kalendárnych mesiacov v zdaňovacom období, môže si daňovník znížiť základ dane o nezdaniteľnú časť základu dane na manželku zodpovedajúcu 1/12 sumy nezdaniteľnej časti za každý kalendárny mesiac, na začiatku ktorého boli splnené podmienky na uplatnenie tejto nezdaniteľnej časti základu dane."
    />
    {/* <Checkbox name="r033_partner_kupele" title="Partner kupele?" />
      {values.r033_partner_kupele && (
        <>
          <Input
            name="r033_partner_kupele_uhrady"
            type="number"
            label="Partner kupele uhrady"
          />
        </>
      )} */}
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
