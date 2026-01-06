import React, { useRef } from 'react'
import Link from 'next/link'
import { Form } from 'formik'
import { FormWrapper, Input } from '../components/FormComponents'
import {
  DvePercentaRodicomUserInput,
  FormErrors,
} from '../types/PageUserInputs'
import { formatCurrency } from '../lib/utils'
import {
  calculate,
  MIN_2_PERCENT_CALCULATED_DONATION,
  TAX_YEAR,
  RODNE_CISLO_DLZKA,
} from '../lib/calculation'
import { formatRodneCislo } from '../lib/utils'
import { ErrorSummary } from '../components/ErrorSummary'

import { Page } from '../components/Page'
import { Details } from '../components/Details'
import RadioGroup from '../components/radio/RadioGroup'
import Radio from '../components/radio/Radio'
import RadioConditional from '../components/radio/RadioConditional'
import Fieldset from '../components/fieldset/Fieldset'

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
                hint={`Môžete poukázať ${formatCurrency(calculatedTax.suma_2_percenta.toNumber())}, jednému alebo obidvom rodičom.`}
              >
                <RadioGroup
                  value={String(props.values.dve_percenta_rodicom ?? '')}
                  onChange={(value) => {
                    if (value === 'true') {
                      props.setValues({
                        ...props.values,
                        dve_percenta_rodicom: true,
                        dve_percenta_rodicA: {
                          meno: 'Rick',
                          priezvisko: 'Sanchez',
                          rodneCislo: '801203/1049',
                        },
                        dve_percenta_rodicB: {
                          meno: 'Beth',
                          priezvisko: 'Sanchez',
                          rodneCislo: '825412/9796',
                        },
                      })
                    } else if (value === 'false') {
                      props.setValues({
                        ...props.values,
                        dve_percenta_rodicom: false,
                      })
                    } else {
                      props.setValues({
                        ...props.values,
                        dve_percenta_rodicom: false,
                      })
                    }
                  }}
                >
                  <Radio
                    name="dve_percenta_rodicom-input-yes"
                    label="Áno"
                    value="true"
                  />
                  <RadioConditional forValue="true">
                    <div>
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
                            // preserve previous value if present
                            props.values.dve_percenta_rodicA?.rodneCislo || '',
                          )
                          const shouldValidate =
                            rodneCislo.length >= RODNE_CISLO_DLZKA
                          props.setFieldValue(
                            'dve_percenta_rodicA.rodneCislo',
                            rodneCislo,
                            shouldValidate,
                          )
                        }}
                      />

                      <h2 className="govuk-heading-m govuk-!-margin-top-6">Údaje o rodičovi B</h2>
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
                            props.values.dve_percenta_rodicB?.rodneCislo || '',
                          )
                          const shouldValidate =
                            rodneCislo.length >= RODNE_CISLO_DLZKA
                          props.setFieldValue(
                            'dve_percenta_rodicB.rodneCislo',
                            rodneCislo,
                            shouldValidate,
                          )
                        }}
                      />
                    </div>
                  </RadioConditional>

                  <Radio
                    name="dve_percenta_rodicom-input-no"
                    label="Nie"
                    value="false"
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

type Errors = Partial<FormErrors<DvePercentaRodicomUserInput>>
export const validate = (values: DvePercentaRodicomUserInput): Errors => {
  const errors: Errors = {}

  if (typeof values.dve_percenta_rodicom === 'undefined') {
    errors.dve_percenta_rodicom = 'Vyznačte odpoveď'
  }
  return errors
}

export default DvePercentaRodicom
