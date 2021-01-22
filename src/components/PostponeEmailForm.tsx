import React from 'react'
import * as Yup from 'yup'
import { Form, Formik } from 'formik'
import classNames from 'classnames'
import { CheckboxSmall, Input } from './FormComponents'
import { sendPostponeEmail } from '../lib/api'
import { EmailUserInput } from '../types/UserInput'
import { PostponeUserInput } from '../types/PostponeUserInput'
import { PrivacyPolicyLink } from './PrivacyPolicyLink'

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

export interface PostponeEmailFormProps {
  params: Record<string, any>
  postponeUserInput: PostponeUserInput
  saveForm: (email: string, newsletter: boolean) => void
}
export const PostponeEmailForm = ({
  params,
  postponeUserInput,
  saveForm,
}: PostponeEmailFormProps) => {
  const handleSubmit = async ({ email, newsletter }, { setFieldError }) => {
    const { messageId, code, message } = await sendPostponeEmail(
      email,
      { ...params, newsletter: !!newsletter } as any,
      postponeUserInput,
    )
    if (messageId) {
      saveForm(email, !!newsletter)
    } else {
      setFieldError('email', getErrorMessage(code, message))
    }
  }

  return (
    <Formik<EmailUserInput>
      validateOnChange={false}
      validateOnBlur={false}
      initialValues={{ email: '', newsletter: false }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <Input
            name="email"
            type="email"
            label="Pošleme vám XML súbor pre odklad daňového priznania na email?"
            hint="Nechajte nám email"
            placeholder="váš email"
          />
          <CheckboxSmall
            name="newsletter"
            label="Mám záujem o zasielanie informačného newslettera s praktickými radami pre živnostníkov"
          />
          <p>
            Oboznámil(a) som sa s informáciami v sekcii <PrivacyPolicyLink />
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

const validationSchema = Yup.object().shape({
  email: Yup.string().required('Zadajte email').email('Nesprávny formát'),
  newsletter: Yup.boolean(),
})
