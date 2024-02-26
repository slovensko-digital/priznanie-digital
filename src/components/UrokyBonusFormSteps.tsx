import React from 'react'
import { BooleanRadio, Checkbox, Input } from './FormComponents'
import { formatCurrency, formatRodneCislo } from '../lib/utils'
import { PartnerBonusFormProps } from './PartnerBonusForm'
import { Details } from './Details'
import { TAX_YEAR } from '../lib/calculation'
import Fieldset from './fieldset/Fieldset'
import RadioGroup from './radio/RadioGroup'
import Radio from './radio/Radio'
import RadioConditional from './radio/RadioConditional'
import Decimal from 'decimal.js'
import { Warning } from './Warning'

export const ApplyForBonusQuestion = ({ disabled }) => (
  <>
    <BooleanRadio
      title={`Boli ste v roku ${TAX_YEAR} dlžníkom z úveru na bývanie?`}
      name="r035_uplatnuje_uroky"
      disabled={disabled}
    />
    <Details title="Kedy si môžem uplatniť zvýhodnenie?">
      <>
        <p>
          Daňový bonus na zaplatené úroky si môžete uplatniť na úver ktorý
        </p>
        <ul>
          <li>má dobu splatnosti najmenej 5 rokov a najviac 30 rokov</li>
          <li>je zabezpečený záložným právom k tuzemskej nehnuteľnosti</li>
        </ul>
      </>
    </Details>
  </>
)

export const ZaplateneUrokyQuestion = ({ disabled }) => (
  <>
    <Input
      name="r035_zaplatene_uroky"
      type="number"
      label={`Aká bola výška zaplatených úrokov v roku ${TAX_YEAR} na základe potvrdenia vydaného bankou?`}
      disabled={disabled}
    />
    <Warning>
      Potvrdenie vydané veriteľom (bankou) je potrebné priložiť ako prílohu k daňovému priznaniu.
    </Warning>
  </>
)


export const ZaciatokUveruQuestion = ({ disabled }) => (
  <div className="govuk-form-group">
    <legend className="govuk-fieldset__legend govuk-fieldset__legend--l">
      <h1 className="govuk-fieldset__heading">
        Ak si chcete uplatniť daňový bonus na zaplatené úroky z úveru na bývanie uveďte:
      </h1>
    </legend>
    <p className='govuk-hint'>
      Daňovník si môže uplatniť daňový bonus na zaplatené úroky počas piatich
      bezprostredne po sebe nasledujúcich rokov počnúc mesiacom,
      v ktorom začalo úročenie úveru na bývanie.
    </p>
    <Input
      name="uroky_rok_uzatvorenia"
      type="number"
      label="Rok uzatvorenia zmluvy o úvere na bývanie"
      disabled={disabled}
    />
    <label
      className="govuk-label govuk-!-font-weight-bold"
    >
      Dátum začatia úročenia úveru
    </label>
    <div className="govuk-form-group">
      <fieldset
        className="govuk-fieldset"
        role="group"
        aria-describedby="zaciatok-urocenia-hint"
      >
        <div id="zaciatok-urocenia-hint" className="govuk-hint">
          Zadajte datum začatia úročenia úveru napríklad
          <br />
          27 8 {TAX_YEAR - 3}
        </div>
        <div className="govuk-date-input" id="zaciatok-prijmov">
          <div className="govuk-date-input__item">
            <div className="govuk-form-group">
              <Input
                name="uroky_zaciatok_urocenia_den"
                label="Deň"
                type="number"
                width={2}
                disabled={disabled}
              />
            </div>
          </div>
          <div className="govuk-date-input__item">
            <div className="govuk-form-group">
              <Input
                name="uroky_zaciatok_urocenia_mesiac"
                label="Mesiac"
                type="number"
                width={2}
                disabled={disabled}
              />
            </div>
          </div>
          <div className="govuk-date-input__item">
            <div className="govuk-form-group">
              <Input
                name="uroky_zaciatok_urocenia_rok"
                type="number"
                label="Rok"
                width={4}
                disabled={disabled}
              />
            </div>
          </div>
        </div>
      </fieldset>
    </div>
  </div>
)

export const DalsiDlzniciQuestion = ({ values, errors, setFieldValue, disabled }) => (
  <Fieldset title={`Ste dlžníkom zo zmluvy o úvere na bývanie spolu s inými dlžníkmi?`}
    hint="Nárok na daňový bonus na zaplatené úroky má možnosť uplatniť len jeden z dlžníkov."
    error={errors.uroky_dalsi_dlznik}
  >
    <RadioGroup value={String(values.uroky_dalsi_dlznik)} onChange={(value) => {
      setFieldValue('uroky_dalsi_dlznik', value === 'true')
    }}>
      <Radio name="uroky_dalsi_dlznik-input-yes" label="Áno" value="true" disabled={disabled} />
      <RadioConditional forValue="true">
        <Input
          name="uroky_pocet_dlznikov"
          type="number"
          label="Počet dlžníkov zo zmluvy o úvere"
          hint="Uveďte počet dlžníkov spolu s vami"
          width={4}
          disabled={disabled}
        />
      </RadioConditional>

      <Radio name="uroky_dalsi_dlznik-input-no" label="Nie" value="false" disabled={disabled} />
    </RadioGroup>
  </Fieldset>
)

export const DalsiUverQuestion = ({ disabled }) => (
  <BooleanRadio
    name="uroky_dalsi_uver_uplatnuje"
    title="Ste dlžníkom / spoludlžníkom aj v inej zmluve o úvere na bývanie, na ktorú sa uplatňuje nárok na daňový bonus na zaplatené úroky?"
    disabled={disabled}
  />
)

export const VekQuestion = ({ disabled, values: { uroky_dalsi_dlznik } }) => (
  <BooleanRadio
    name="uroky_splnam_vek_kriteria"
    title={`Mali ste ku dňu podania žiadosti o úver ${uroky_dalsi_dlznik ? '(aj všetci spoludlžníci) ' : ''}najmenej 18 a najviac 35 rokov?`}
    disabled={disabled}
  />
)

const maxPrijem = ({uroky_rok_uzatvorenia: rok, uroky_pocet_dlznikov, uroky_dalsi_dlznik}): Decimal => {
  const pocet_dlznikov = uroky_dalsi_dlznik ? new Decimal(parseInt(uroky_pocet_dlznikov)) : new Decimal(1)
  switch (rok) {
    case '2018':
      return new Decimal(1240.20).mul(pocet_dlznikov)
    case '2019':
      return new Decimal(1316.90).mul(pocet_dlznikov)
    case '2020':
      return new Decimal(1419.60).mul(pocet_dlznikov)
    case '2021':
      return new Decimal(1472.90).mul(pocet_dlznikov)
    case '2022':
      return new Decimal(1574.30).mul(pocet_dlznikov)
    case '2023':
      return new Decimal(1695.20).mul(pocet_dlznikov)
    default:
      return new Decimal(0)
  }
}

export const PrijemQuestion = ({ disabled, values: { uroky_dalsi_dlznik, uroky_rok_uzatvorenia, uroky_pocet_dlznikov } }) => {
  const prijem = formatCurrency(maxPrijem({uroky_rok_uzatvorenia, uroky_pocet_dlznikov, uroky_dalsi_dlznik}).toNumber())

  return (
    <BooleanRadio
      name="uroky_splnam_prijem"
      title={`Bol váš priemerný mesačný príjem ${uroky_dalsi_dlznik ? '(spolu so spoludlžníkmi) ' : ''}za kalendárny rok ${parseInt(uroky_rok_uzatvorenia)-1} max. vo výške ${prijem}?`}
      disabled={disabled}
    />
  )
}

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
      label="Poberá príspevok na opatrovanie ťažko zdravotne postihnutého"
      disabled={disabled}
    />
    <Checkbox
      name="partner_podmienky.4"
      label="Poberal/a príspevok na opatrovanie ťažko zdravotne postihnutého"
      disabled={disabled}
    />
    <Checkbox
      name="partner_podmienky.5"
      label="Bol/a evidovaný/á ako uchádzač o zamestnanie"
      disabled={disabled}
    />
    <Checkbox
      name="partner_podmienky.6"
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
    <p>Nespĺňate podmienky pre uplatnenie daňového bonusu na zaplatené úroky.</p>
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
