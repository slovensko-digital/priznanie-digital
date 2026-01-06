import React, { useRef } from 'react'
import Link from 'next/link'
import { Form, useField } from 'formik'
import { FormWrapper, Input, Checkbox } from '../components/FormComponents'
import { DvePercentaRodicomUserInput } from '../types/PageUserInputs'
import { formatCurrency } from '../lib/utils'
import {
  calculate,
  MIN_2_PERCENT_CALCULATED_DONATION,
  TAX_YEAR,
  RODNE_CISLO_DLZKA,
} from '../lib/calculation'
import { formatRodneCislo, validateRodneCislo } from '../lib/utils'
import { ErrorSummary } from '../components/ErrorSummary'

import { Page } from '../components/Page'
import { Details } from '../components/Details'
import RadioGroup from '../components/radio/RadioGroup'
import Radio from '../components/radio/Radio'
import RadioConditional from '../components/radio/RadioConditional'
import Fieldset from '../components/fieldset/Fieldset'

interface AdoptionCheckboxProps {
  labelSingular?: boolean
}

const AdoptionCheckbox = ({ labelSingular = false }: AdoptionCheckboxProps) => {
  const [field] = useField('dve_percenta_rodicom_nahradna_starostlivost')
  const isChecked = field.value === true

  return (
    <div className="govuk-!-margin-top-6">
      <Checkbox
        name="dve_percenta_rodicom_nahradna_starostlivost"
        label={
          labelSingular
            ? 'Bol/a som osvojený/á rodičom'
            : 'Bol/a som osvojený/á rodičmi'
        }
      />
      {isChecked && (
        <p className="govuk-hint govuk-!-margin-top-2">
          K daňovému priznaniu je potrebné priložiť doklad preukazujúci
          osvojenie.
        </p>
      )}
    </div>
  )
}

const DvePercentaRodicom: Page<DvePercentaRodicomUserInput> = ({
  setTaxFormUserInput,
  taxFormUserInput,
  router,
  previousRoute,
  nextRoute,
}) => {
  const submitButtonRef = useRef(null)
  const calculatedTax = calculate(taxFormUserInput)

  const previousPageLink = (
    <Link href={previousRoute} data-test="back" className="govuk-back-link">
      Späť
    </Link>
  )

  if (!calculatedTax.canDonateTwoPercentOfTax) {
    return (
      <>
        {previousPageLink}
        <h1 className="govuk-heading-l">
          Poukázanie 2% zaplatenej dane rodičom
        </h1>
        <p data-test="ineligible-message">
          Ľutujeme, nespĺňate podmienky na poukázanie čiastky dane, nakoľko by
          táto čiastka neprekočila{' '}
          {formatCurrency(MIN_2_PERCENT_CALCULATED_DONATION)}. Dôvodom je
          nepostačujúca výška zaplatenej dane.
        </p>
        <Link href={nextRoute} legacyBehavior>
          <button className="govuk-button govuk-!-margin-top-4" type="button">
            Pokračovať
          </button>
        </Link>
      </>
    )
  }

  return (
    <>
      {previousPageLink}
      <FormWrapper<DvePercentaRodicomUserInput>
        initialValues={taxFormUserInput}
        validate={validate}
        onSubmit={(values) => {
          setTaxFormUserInput(values)
          router.push(nextRoute)
        }}
      >
        {(props) => (
          <>
            <ErrorSummary<DvePercentaRodicomUserInput> errors={props.errors} />
            <Form className="form" noValidate>
              <Fieldset
                title={`Chcete poukázať 2% dane rodičom?`}
                error={props.errors.dve_percenta_rodicom}
                hint={`Môžete poukázať ${formatCurrency(calculatedTax.suma_2_percenta.toNumber())}, jednému alebo obidvom rodičom. Poukázanie 2% dane rodičom neovplyvňuje možnosť poukázať 2% alebo 3% dane neziskovej organizácii.`}
              >
                <RadioGroup
                  value={props.values.dve_percenta_rodicom ?? ''}
                  onChange={(value) => {
                    if (value === 'obidvom') {
                      props.setValues({
                        ...props.values,
                        dve_percenta_rodicom: 'obidvom',
                        dve_percenta_rodicA: {
                          meno: '',
                          priezvisko: '',
                          rodneCislo: '',
                        },
                        dve_percenta_rodicB: {
                          meno: '',
                          priezvisko: '',
                          rodneCislo: '',
                        },
                        dve_percenta_rodicom_nahradna_starostlivost: false,
                      })
                    } else if (value === 'jednemu') {
                      props.setValues({
                        ...props.values,
                        dve_percenta_rodicom: 'jednemu',
                        dve_percenta_rodicA: {
                          meno: '',
                          priezvisko: '',
                          rodneCislo: '',
                        },
                        dve_percenta_rodicB: undefined,
                        dve_percenta_rodicom_nahradna_starostlivost: false,
                      })
                    } else {
                      props.setValues({
                        ...props.values,
                        dve_percenta_rodicom: 'nie',
                        dve_percenta_rodicA: undefined,
                        dve_percenta_rodicB: undefined,
                        dve_percenta_rodicom_nahradna_starostlivost: false,
                      })
                    }
                  }}
                >
                  <Radio
                    name="dve_percenta_rodicom-input-obidvom"
                    label="Áno, obidvom rodičom"
                    value="obidvom"
                  />
                  <RadioConditional forValue="obidvom">
                    <p className="govuk-hint">
                      Každý rodič dostane{' '}
                      {formatCurrency(calculatedTax.suma_2_percenta.toNumber())}
                    </p>
                    <div className="govuk-grid-row">
                      <div className="govuk-grid-column-one-half">
                        <h2 className="govuk-heading-m">Údaje o rodičovi A</h2>
                        <Input
                          name="dve_percenta_rodicA.meno"
                          type="text"
                          label="Meno"
                        />
                        <Input
                          name="dve_percenta_rodicA.priezvisko"
                          type="text"
                          label="Priezvisko"
                        />
                        <Input
                          name="dve_percenta_rodicA.rodneCislo"
                          type="text"
                          label="Rodné číslo"
                          maxLength={RODNE_CISLO_DLZKA}
                          onChange={(event) => {
                            const rodneCislo = formatRodneCislo(
                              event.currentTarget.value,
                              props.values.dve_percenta_rodicA?.rodneCislo ||
                                '',
                            )
                            props.setFieldValue(
                              'dve_percenta_rodicA.rodneCislo',
                              rodneCislo,
                              false,
                            )
                          }}
                        />
                      </div>
                      <div className="govuk-grid-column-one-half">
                        <h2 className="govuk-heading-m">Údaje o rodičovi B</h2>
                        <Input
                          name="dve_percenta_rodicB.meno"
                          type="text"
                          label="Meno"
                        />
                        <Input
                          name="dve_percenta_rodicB.priezvisko"
                          type="text"
                          label="Priezvisko"
                        />
                        <Input
                          name="dve_percenta_rodicB.rodneCislo"
                          type="text"
                          label="Rodné číslo"
                          maxLength={RODNE_CISLO_DLZKA}
                          onChange={(event) => {
                            const rodneCislo = formatRodneCislo(
                              event.currentTarget.value,
                              props.values.dve_percenta_rodicB?.rodneCislo ||
                                '',
                            )
                            props.setFieldValue(
                              'dve_percenta_rodicB.rodneCislo',
                              rodneCislo,
                              false,
                            )
                          }}
                        />
                      </div>
                    </div>
                    <AdoptionCheckbox />
                  </RadioConditional>

                  <Radio
                    name="dve_percenta_rodicom-input-jednemu"
                    label="Áno, iba jednému rodičovi"
                    value="jednemu"
                  />
                  <RadioConditional forValue="jednemu">
                    <p className="govuk-hint">
                      Rodič dostane{' '}
                      {formatCurrency(calculatedTax.suma_2_percenta.toNumber())}
                    </p>
                    <div>
                      <h2 className="govuk-heading-m">Údaje o rodičovi</h2>
                      <Input
                        name="dve_percenta_rodicA.meno"
                        type="text"
                        label="Meno"
                      />
                      <Input
                        name="dve_percenta_rodicA.priezvisko"
                        type="text"
                        label="Priezvisko"
                      />
                      <Input
                        name="dve_percenta_rodicA.rodneCislo"
                        type="text"
                        label="Rodné číslo"
                        maxLength={RODNE_CISLO_DLZKA}
                        onChange={(event) => {
                          const rodneCislo = formatRodneCislo(
                            event.currentTarget.value,
                            props.values.dve_percenta_rodicA?.rodneCislo || '',
                          )
                          props.setFieldValue(
                            'dve_percenta_rodicA.rodneCislo',
                            rodneCislo,
                            false,
                          )
                        }}
                      />
                    </div>
                    <AdoptionCheckbox labelSingular />
                  </RadioConditional>

                  <Radio
                    name="dve_percenta_rodicom-input-nie"
                    label="Nie"
                    value="nie"
                  />
                </RadioGroup>
              </Fieldset>
              <Details title="Kto sa považuje za rodiča daňovníka?">
                <p className="govuk-hint">
                  Za rodiča daňovníka sa považuje osoba, ktorá bola najneskôr k
                  31.12.{TAX_YEAR}:
                  <ul>
                    <li>poberateľom starobného dôchodku,</li>
                    <li>
                      poberateľom invalidného dôchodku vyplácaného po dovŕšení
                      dôchodkového veku,
                    </li>
                    <li>
                      poberateľom výsluhového dôchodku vyplácaného po dovŕšení
                      dôchodkového veku,
                    </li>
                    <li>
                      poberateľom invalidného výsluhového dôchodku vyplácaného
                      po dovŕšení dôchodkového veku,
                    </li>
                  </ul>
                  pričom daňovník je vlastným alebo osvojeným dieťaťom tohto
                  rodiča.
                </p>
              </Details>
              <button
                data-test="next"
                className="govuk-button"
                type="submit"
                ref={submitButtonRef}
              >
                Pokračovať
              </button>
            </Form>
          </>
        )}
      </FormWrapper>
    </>
  )
}

type ParentErrors = {
  [K in keyof NonNullable<
    DvePercentaRodicomUserInput['dve_percenta_rodicA']
  >]?: string
}

type Errors = {
  [K in keyof DvePercentaRodicomUserInput]?: K extends
    | 'dve_percenta_rodicA'
    | 'dve_percenta_rodicB'
    ? ParentErrors
    : string
}

export const validate = (values: DvePercentaRodicomUserInput): Errors => {
  const errors: Errors = {}

  if (!values.dve_percenta_rodicom) {
    errors.dve_percenta_rodicom = 'Vyznačte odpoveď'
  }

  if (
    values.dve_percenta_rodicom === 'obidvom' ||
    values.dve_percenta_rodicom === 'jednemu'
  ) {
    const rodicAErrors: ParentErrors = {}

    if (!values.dve_percenta_rodicA?.meno) {
      rodicAErrors.meno = 'Zadajte meno rodiča'
    }
    if (!values.dve_percenta_rodicA?.priezvisko) {
      rodicAErrors.priezvisko = 'Zadajte priezvisko rodiča'
    }
    if (!values.dve_percenta_rodicA?.rodneCislo) {
      rodicAErrors.rodneCislo = 'Zadajte rodné číslo rodiča'
    } else if (!validateRodneCislo(values.dve_percenta_rodicA.rodneCislo)) {
      rodicAErrors.rodneCislo = 'Zadané rodné číslo nie je správne'
    }

    if (Object.keys(rodicAErrors).length > 0) {
      errors.dve_percenta_rodicA = rodicAErrors
    }
  }

  if (values.dve_percenta_rodicom === 'obidvom') {
    const rodicBErrors: ParentErrors = {}

    if (!values.dve_percenta_rodicB?.meno) {
      rodicBErrors.meno = 'Zadajte meno rodiča'
    }
    if (!values.dve_percenta_rodicB?.priezvisko) {
      rodicBErrors.priezvisko = 'Zadajte priezvisko rodiča'
    }
    if (!values.dve_percenta_rodicB?.rodneCislo) {
      rodicBErrors.rodneCislo = 'Zadajte rodné číslo rodiča'
    } else if (!validateRodneCislo(values.dve_percenta_rodicB.rodneCislo)) {
      rodicBErrors.rodneCislo = 'Zadané rodné číslo nie je správne'
    }

    if (Object.keys(rodicBErrors).length > 0) {
      errors.dve_percenta_rodicB = rodicBErrors
    }
  }

  return errors
}

export default DvePercentaRodicom
