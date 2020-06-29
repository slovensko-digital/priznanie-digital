import React from 'react'
import * as Yup from 'yup'
import { Form, Formik } from 'formik'
import classNames from 'classnames'
import { CheckboxSmall, Input } from './FormComponents'
import { sendEmailTemplate } from '../lib/api'
import { EmailUserInput } from '../types/UserInput'
import { TaxFormUserInput } from '../types/TaxFormUserInput'

const getErrorMessage = (code: string, message: string) => {
  switch (code) {
    case 'duplicate_parameter':
      return 'Tento email už v databáze existuje'
    case 'invalid_parameter':
      return 'Nesprávny formát emailovej adresy'
    default:
      return `Chyba: ${message}`
  }
}

export interface EmailFormProps {
  label: string
  hint?: string
  params: Record<string, any>
  taxFormUserInput: TaxFormUserInput
  saveForm: (email: string, newsletter: boolean) => void
}
export const EmailForm = ({
  label,
  hint,
  params,
  taxFormUserInput,
  saveForm,
}: EmailFormProps) => {
  const handleSubmit = async ({ email, newsletter }, { setFieldError }) => {
    const { messageId, code, message } = await sendEmailTemplate(
      email,
      { ...params, newsletter: !!newsletter } as any,
      taxFormUserInput,
    )
    if (messageId) {
      saveForm(email, !!newsletter)
    } else {
      setFieldError('email', getErrorMessage(code, message))
    }
  }

  return (
    <Formik<EmailUserInput>
      initialValues={{ email: '', newsletter: false }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <Input name="email" type="email" label={label} hint={hint} />
          <CheckboxSmall
            name="newsletter"
            label="Mám záujem o zasielanie informačného newslettera s praktickými radami pre živnostníkov"
          />
          <p>
            Oboznámil(a) som sa s informáciami v sekcii{' '}
            <a href="#gdpr">Ochrana osobných údajov</a>
          </p>
          <button
            type="submit"
            data-test="send-email"
            className={classNames(
              'btn-secondary',
              'govuk-button',
              'govuk-button--large',
              { 'govuk-button--disabled': isSubmitting },
            )}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Posielam...' : 'Poslať'}
          </button>
        </Form>
      )}
    </Formik>
  )
}

const validationSchema = Yup.object().shape<EmailUserInput>({
  email: Yup.string().required('Zadajte email').email('Nesprávny formát'),
  newsletter: Yup.boolean(),
})
