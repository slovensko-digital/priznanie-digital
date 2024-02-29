import React from 'react'
import { Form } from 'formik'
import { FormWrapper } from '../components/FormComponents'
import { FormErrors, RentUserInput } from '../types/PageUserInputs'
import { RentForm } from '../components/RentForm'
import { Page } from '../components/Page'
import { rentUserInputInitialValues } from '../lib/initialValues'
import { BackLink } from '../components/BackLink'
import { ErrorSummary } from '../components/ErrorSummary'
import { OSLOBODENIE_PRENAJOM_A_PRILZ_CINNOSTI } from '../lib/calculation'
import { numberInputRegexp } from '../lib/utils'

const Rent: Page<RentUserInput> = ({
  setTaxFormUserInput,
  taxFormUserInput,
  router,
  previousRoute,
  nextRoute,
}) => {
  return (
    <>
      <BackLink href={previousRoute} />
      <FormWrapper<RentUserInput>
        initialValues={taxFormUserInput}
        validate={validate}
        onSubmit={(values, { setFieldValue }) => {
          if (
            values.rent === false ||
            values.rent_step === 4
          ) {
            const userInput = values.rent
              ? values
              : {
                  ...rentUserInputInitialValues,
                  rent: false,
                }
            setTaxFormUserInput(userInput)
            router.push(nextRoute)
          } else if (values.prenajomPrijemZPrilezitostnejCinnosti === false && values.rent_step === 2) {
            setFieldValue('vyskaOslobodenia', OSLOBODENIE_PRENAJOM_A_PRILZ_CINNOSTI.toString())
            setFieldValue('rent_step', values.rent_step + 2)
          } else {
            setFieldValue('rent_step', values.rent_step + 1)
          }
        }}
      >
        {(props) => (
          <Form className="form" noValidate>
            <ErrorSummary errors={props.errors} />
            <RentForm
              {...props}
              step={props.values.rent_step}
              setStep={(value) => props.setFieldValue('rent_step', value)}
            />
          </Form>
        )}
      </FormWrapper>
    </>
  )
}

export const validate = (values: RentUserInput) => {
  const errors: Partial<FormErrors<RentUserInput>> = {}

  if (typeof values.rent === 'undefined') {
    errors.rent = 'Vyznačte odpoveď'
  }

  if (
    values.rent_step === 1 &&
    typeof values.vyskaPrijmovZPrenajmu === 'undefined') {
      errors.vyskaPrijmovZPrenajmu = 'Vyznačte odpoveď [2]'
  } else if (
    values.rent_step === 1 &&
    !values.vyskaPrijmovZPrenajmu.match(numberInputRegexp) ||
    Number.parseInt(values.vyskaPrijmovZPrenajmu, 10) < 0
  ) {
    errors.vyskaPrijmovZPrenajmu =
      'Zadajte sumu - číslo'
  }

  if (
    values.rent_step === 2 &&
    typeof values.prenajomPrijemZPrilezitostnejCinnosti === 'undefined') {
      errors.prenajomPrijemZPrilezitostnejCinnosti = 'Vyznačte odpoveď'
  }

  if (
    values.rent_step === 3 &&
    typeof values.vyskaOslobodenia === 'undefined') {
      errors.vyskaOslobodenia = 'Vyznačte odpoveď'
  } else if (
    values.rent_step === 3 &&
    !values.vyskaOslobodenia.match(numberInputRegexp) ||
    Number.parseInt(values.vyskaOslobodenia, 10) < 0 ||
    Number.parseInt(values.vyskaOslobodenia, 10) > 500
  ) {
    errors.vyskaOslobodenia =
      'Zadajte sumu - číslo od 0 do 500'
  }

  if (
    values.rent_step === 4 &&
    typeof values.vydavkyZPrenajmu === 'undefined') {
      errors.vydavkyZPrenajmu = 'Vyznačte odpoveď'
  } else if (
    values.rent_step === 4 &&
    !values.vydavkyZPrenajmu.match(numberInputRegexp) ||
    Number.parseInt(values.vydavkyZPrenajmu, 10) < 0
  ) {
    errors.vydavkyZPrenajmu =
      'Zadajte sumu - číslo'
  }

  return errors
}

export default Rent
