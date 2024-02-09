import React from 'react'
import Link from 'next/link'
import { Form } from 'formik'
import { FormWrapper } from '../components/FormComponents'
import { FormErrors, UrokyUserInput } from '../types/PageUserInputs'
import { ErrorSummary } from '../components/ErrorSummary'
import { Page } from '../components/Page'
import { UrokyBonusForm } from '../components/UrokyBonusForm'

const Uroky: Page<UrokyUserInput> = ({
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
      <FormWrapper<UrokyUserInput>
        initialValues={taxFormUserInput}
        validate={validate}
        onSubmit={(values, { setFieldValue }) => {
          if (values.hypoteka_step === 0 && values.r037_uplatnuje_uroky === false) {
            router.push(nextRoute)
          } else {
            setFieldValue('hypoteka_step', values.hypoteka_step + 1)
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

  return errors
}

export default Uroky
