import React from 'react'
import Link from 'next/link'
import { Form } from 'formik'
import { FormWrapper } from '../components/FormComponents'
import { FormErrors, UrokyUserInput } from '../types/PageUserInputs'
import { ErrorSummary } from '../components/ErrorSummary'
import { Page } from '../components/Page'
import { UrokyBonusForm } from '../components/UrokyBonusForm'
import { urokyInitialValues } from '../lib/initialValues'

const Uroky: Page<UrokyUserInput> = ({
  taxFormUserInput,
  setTaxFormUserInput,
  router,
  previousRoute,
  nextRoute,
}) => {
  return (
    <>
      <Link href={previousRoute} data-test="back" className="govuk-back-link">
        Späť
      </Link>
      <FormWrapper<UrokyUserInput>
        initialValues={taxFormUserInput}
        validate={validate}
        onSubmit={(values, { setFieldValue }) => {
          if (values.hypoteka_step === 0 && values.r035_uplatnuje_uroky === false) {
            router.push(nextRoute)
          } else {
            if (values.hypoteka_step === 6) {
              const userInput = values.r035_uplatnuje_uroky
                ? values
                : {
                  ...urokyInitialValues,
                  r035_uplatnuje_uroky: values.r035_uplatnuje_uroky,
                  r035_zaplatene_uroky: values.r035_zaplatene_uroky,
                }
              setTaxFormUserInput(userInput)
              router.push(nextRoute)
            } else {
              setFieldValue('hypoteka_step', values.hypoteka_step + 1)
            }
          }
        }}
      >
        {(props) => (
          <Form className="form" noValidate>
            <ErrorSummary errors={props.errors} />
            <UrokyBonusForm
              {...props}
              step={props.values.hypoteka_step}
              setStep={(value) => props.setFieldValue('hypoteka_step', value)}
            />
          </Form>
        )}
      </FormWrapper>
    </>
  )
}

export const validate = (values: UrokyUserInput) => {
  const errors: Partial<FormErrors<UrokyUserInput>> = {}
  console.log(values)

  return errors
}

export default Uroky
