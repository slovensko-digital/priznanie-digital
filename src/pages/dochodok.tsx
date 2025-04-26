import React from 'react'
import Link from 'next/link'
import { Form } from 'formik'
import { FormWrapper, Input } from '../components/FormComponents'
import { FormErrors, PensionUserInput } from '../types/PageUserInputs'
import { numberInputRegexp, parseInputNumber } from '../lib/utils'
import { Page } from '../components/Page'
import { pensionInitialValues } from '../lib/initialValues'
import { ErrorSummary } from '../components/ErrorSummary'
import { TAX_YEAR } from '../lib/calculation'
import { Details } from '../components/Details'
import Fieldset from '../components/fieldset/Fieldset'
import RadioGroup from '../components/radio/RadioGroup'
import Radio from '../components/radio/Radio'
import RadioConditional from '../components/radio/RadioConditional'

const Dochodok: Page<PensionUserInput> = ({
  setTaxFormUserInput,
  taxFormUserInput,
  router,
  previousRoute,
  nextRoute,
}) => {
  return (
    <>
      <Link href={previousRoute} data-test="back" className="govuk-back-link">
        Späť
      </Link>
      <FormWrapper<PensionUserInput>
        initialValues={taxFormUserInput}
        validate={validate}
        onSubmit={(values) => {
          const userInput = values.platil_prispevky_na_dochodok
            ? values
            : {
                ...pensionInitialValues,
                platil_prispevky_na_dochodok: false,
              }
          setTaxFormUserInput(userInput)
          router.push(nextRoute)
        }}
      >
        {({ values, errors, setFieldValue }) => (
          <Form className="form" noValidate>
            <ErrorSummary<PensionUserInput> errors={errors} />
            <Fieldset
              title={`Platili ste v roku ${TAX_YEAR} príspevky na doplnkové dôchodkové poistenie (III. pilier)?`}
              error={errors.platil_prispevky_na_dochodok}
            >
              <RadioGroup
                value={String(values.platil_prispevky_na_dochodok)}
                onChange={(value) => {
                  setFieldValue(
                    'platil_prispevky_na_dochodok',
                    value === 'true',
                  )
                }}
              >
                <Radio
                  name="platil_prispevky_na_dochodok-input-yes"
                  label="Áno"
                  value="true"
                />
                <RadioConditional forValue="true">
                  <Input
                    name="zaplatene_prispevky_na_dochodok"
                    type="number"
                    label={`Výška zaplatených príspevkov za rok ${TAX_YEAR}`}
                    hint="Maximálne si môžete uplatniť príspevky na doplnkové dôchodkové sporenie do výšky 180 eur."
                  />
                </RadioConditional>

                <Radio
                  name="platil_prispevky_na_dochodok-input-no"
                  label="Nie"
                  value="false"
                />
              </RadioGroup>
            </Fieldset>
            <Details
              title={
                'Nezdaniteľnú časť základu dane na príspevky na doplnkové dôchodkové poistenie je možné uplatniť iba u daňovníka, ktorý spĺňa nasledovné podmienky:'
              }
            >
              <ul>
                <li>
                  príspevky na doplnkové dôchodkové sporenie zaplatil na základe
                  účastníckej zmluvy uzatvorenej po 31.12.2013, alebo na základe
                  zmeny účastníckej zmluvy, ktorej súčasťou je zrušenie
                  dávkového plánu
                </li>
                <br />
                <li>
                  daňovník nemá uzatvorenú inú účastnícku zmluvu podľa zákona o
                  doplnkovom dôchodkovom sporení, ktorá nespĺňa podmienky
                  stanovené novelou zákona o doplnkovom dôchodkom sporení
                </li>
              </ul>
            </Details>
            <button data-test="next" className="govuk-button" type="submit">
              Pokračovať
            </button>
          </Form>
        )}
      </FormWrapper>
    </>
  )
}

export const validate = (values: PensionUserInput) => {
  const errors: Partial<FormErrors<PensionUserInput>> = {}

  if (typeof values.platil_prispevky_na_dochodok === 'undefined') {
    errors.platil_prispevky_na_dochodok = 'Vyznačte odpoveď'
  }

  if (values.platil_prispevky_na_dochodok) {
    if (!values.zaplatene_prispevky_na_dochodok) {
      errors.zaplatene_prispevky_na_dochodok =
        'Zadajte výšku zaplatených príspevkov'
    } else if (
      !values.zaplatene_prispevky_na_dochodok.match(numberInputRegexp)
    ) {
      errors.zaplatene_prispevky_na_dochodok =
        'Zadajte výšku príspevkov vo formáte 123,45'
    } else if (parseInputNumber(values.zaplatene_prispevky_na_dochodok) > 180) {
      errors.zaplatene_prispevky_na_dochodok =
        'Výška príspevkov nesmie presiahnuť 180,00 eur'
    }
  }

  return errors
}

export default Dochodok
