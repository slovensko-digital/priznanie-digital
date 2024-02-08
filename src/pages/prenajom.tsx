import React from 'react'
import { Form } from 'formik'
import { FormWrapper } from '../components/FormComponents'
import { FormErrors, RentUserInput } from '../types/PageUserInputs'
import { numberInputRegexp, validateRodneCislo } from '../lib/utils'
import { RentForm } from '../components/RentForm'
import { validateRentForm } from '../lib/validateRentForm'
import { Page } from '../components/Page'
import { rentUserInputInitialValues } from '../lib/initialValues'
import { BackLink } from '../components/BackLink'
import { ErrorSummary } from '../components/ErrorSummary'

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
            validateRentForm(values, values.rent_step) === false ||
            values.rent_step === 5
          ) {
            const userInput = values.rent
              ? values
              : {
                  ...rentUserInputInitialValues,
                  rent: false,
                }

            if (!validateRentForm(values, values.rent_step)) {
              true
            }

            setTaxFormUserInput(userInput)
            router.push(nextRoute)
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

  return errors
}

export default Rent
