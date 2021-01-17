import React, { useState } from 'react'
import { Warning } from '../components/Warning'
import { sendNotReadyEmail } from '../lib/api'
import { Form, Formik } from 'formik'
import { EmailUserInput } from '../types/UserInput'
import { CheckboxSmall, Input } from '../components/FormComponents'
import classNames from 'classnames'
import * as Yup from 'yup'

const NotReadyEmailForm = () => {
  const [email, setEmail] = useState(null)
  const [newsletter, setNewsletter] = useState(false)

  if (email) {
    return (
      <div className="box">
        <p>
          Budeme vás informovať na email <strong>{email}</strong>.
          <br />
          {newsletter && 'Pošleme vám aj newsletter.'}
        </p>
      </div>
    )
  }

  const validationSchema = Yup.object().shape({
    email: Yup.string().required('Zadajte email').email('Nesprávny formát'),
    newsletter: Yup.boolean(),
  })

  const handleSubmit = async (values, { setFieldError }) => {
    const { messageId, message } = await sendNotReadyEmail(
      values.email,
      values.newsletter,
    )
    if (messageId) {
      setEmail(email)
      setNewsletter(newsletter)
    } else {
      setFieldError('email', `Chyba: ${message}`)
    }
  }

  return (
    <Formik<EmailUserInput>
      initialValues={{ email: '', newsletter: false }}
      validateOnChange={false}
      validateOnBlur={false}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <div className="box">
          <Form>
            <Input
              name="email"
              type="email"
              label="Zadajte email"
              hint="Dáme vám vedieť keď bude verzia pre rok 2020 pripravená"
            />
            <CheckboxSmall
              name="newsletter"
              label="Mám záujem o zasielanie informačného newslettera s praktickými radami pre živnostníkov"
            />
            <p>
              Oboznámil(a) som sa s informáciami v sekcii{' '}
              <a
                href="https://navody.digital/ochrana-osobnych-udajov"
                target="_blank"
                rel="noreferrer"
              >
                Ochrana osobných údajov
              </a>
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
              {isSubmitting ? 'Odosielam...' : 'Informujte ma'}
            </button>
          </Form>
        </div>
      )}
    </Formik>
  )
}

const Index = () => {
  return (
    <>
      <Warning>Na verzii pre rok 2020 aktuálne pracujeme.</Warning>

      <div className="govuk-clearfix" />

      <NotReadyEmailForm />
    </>
  )
}

export default Index
