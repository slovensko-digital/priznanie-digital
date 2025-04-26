import React, { useState } from 'react'
import { Form } from 'formik'
import classNames from 'classnames'
import { ChildInput, TaxFormUserInput } from '../types/TaxFormUserInput'
import { FormWrapper, Input } from './FormComponents'
import { ErrorSummary } from './ErrorSummary'
import { FeedbackFormInput } from '../types/UserInput'
import { rodnecislo } from 'rodnecislo'

const anonymizeTaxForm = (taxFormUserInput: TaxFormUserInput) => {
  return {
    ...taxFormUserInput,
    r001_dic: 'anon',
    r003_nace: 'anon',
    r004_priezvisko: 'anon',
    r005_meno: 'anon',
    meno_priezvisko: 'anon',
    r007_ulica: 'anon',
    r008_cislo: 'anon',
    r009_psc: 'anon',
    r010_obec: 'anon',
    r011_stat: 'anon',
    r031_priezvisko_a_meno: 'anon',
    r031_rodne_cislo: 'anon',
    iban: 'anon',
    email: 'anon',
    children: taxFormUserInput.children.map(anoymizeChild),
  }
}

export const anoymizeChild = (child: ChildInput) => {
  const rCislo = rodnecislo(child.rodneCislo.replace(' / ', ''))
  return {
    ...child,
    rodneCislo: 'anon',
    rokNarodenia: rCislo.year(),
    mesiacNarodenia: rCislo.month() + 1,
    priezviskoMeno: 'anon',
  }
}

const sendFeedback = async ({
  whatWereYouDoing,
  whatWentWrong,
  email,
  taxFormUserInput,
}) => {
  const response = await fetch('/api/feedback', {
    method: 'POST',
    body: JSON.stringify({
      whatWereYouDoing,
      whatWentWrong,
      email,
      taxFormUserInput: anonymizeTaxForm(taxFormUserInput),
      url: window.location.href,
    }),
  })
  return response.status === 200
}

const validateFeedbackForm = (values) => {
  const errors: Record<string, string> = {}

  if (!values.whatWereYouDoing) {
    errors.whatWereYouDoing = 'Napíšte prosím čo ste robili keď nastala chyba'
  }

  if (!values.whatWentWrong) {
    errors.whatWentWrong = 'Napíšte prosím aká chyba nastala'
  }

  if (values.email && !values.email.match(/^.+@.+\.[a-z]+$/i)) {
    errors.email = 'Zadajte správny email, alebo nechajte pole prázdne'
  }

  return errors
}

interface FeedbackFormProps {
  taxFormUserInput: TaxFormUserInput
  close: () => void
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({
  taxFormUserInput,
  close,
}) => {
  const [isSubmittedSuccessfully, setIsSubmittedSuccessfully] =
    useState(undefined)

  return (
    <div
      id="sdn-feedbackbar-form-foundbug"
      className="sdn-feedbackbar__form govuk-!-padding-4"
    >
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds govuk-!-margin-bottom-4">
          <h3 className="govuk-heading-m">Nahlásenie chyby</h3>
          <p className="govuk-body">
            Pomocou tohto formuláru môžete nahlásiť chybu v návode, alebo na
            stránke. Neuvádzajte prosím svoje osobné údaje, chyby sú nám
            nahlasované anonymne. Všetky podnety starostlivo posudzujeme
          </p>
        </div>
        <div
          className="govuk-grid-column-one-third"
          style={{ textAlign: 'right' }}
        >
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault()
              close()
            }}
          >
            zatvoriť
          </a>
        </div>
      </div>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          {isSubmittedSuccessfully === true ? (
            <p className="govuk-body">Ďakujeme za feedback.</p>
          ) : (
            <FormWrapper<FeedbackFormInput>
              initialValues={{
                whatWereYouDoing: '',
                whatWentWrong: '',
                email: '',
              }}
              validate={validateFeedbackForm}
              onSubmit={async (values, { setErrors }) => {
                const success = await sendFeedback({
                  ...values,
                  taxFormUserInput,
                })
                setIsSubmittedSuccessfully(success)

                if (!success) {
                  setErrors({
                    saving: 'Chyba pri odosielaní, skúste znovu',
                  })
                }
              }}
            >
              {(formik) => (
                <Form noValidate>
                  <ErrorSummary errors={formik.errors} />
                  <Input
                    name="whatWereYouDoing"
                    label="Čo ste robili?"
                    type="text"
                    width="auto"
                  />
                  <Input
                    name="whatWentWrong"
                    label="Čo sa nepodarilo?"
                    type="textarea"
                  />
                  <Input
                    name="email"
                    label="Váš email"
                    type="email"
                    hint="Ak si želáte dostať odpoveď, informáciu o náprave, či zapracovaní nahlásenej chyby, prosím uveďte do textu napr. svoj email. Bude použitý iba na odpoveď."
                  />
                  <button
                    type="submit"
                    data-test="submit"
                    className={classNames(
                      'govuk-button',
                      'govuk-button--large',
                      'govuk-!-margin-top-4',
                      { 'govuk-button--disabled': formik.isSubmitting },
                    )}
                    disabled={formik.isSubmitting}
                  >
                    {formik.isSubmitting ? 'Odosielam...' : 'Odoslať'}
                  </button>
                </Form>
              )}
            </FormWrapper>
          )}
        </div>
      </div>
    </div>
  )
}

interface FeedbackProps {
  taxFormUserInput: TaxFormUserInput
}

export const Feedback: React.FC<FeedbackProps> = ({ taxFormUserInput }) => {
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false)

  if (isFeedbackOpen) {
    return (
      <FeedbackForm
        taxFormUserInput={taxFormUserInput}
        close={() => setIsFeedbackOpen(false)}
      />
    )
  }
  return (
    <div className="sdn-feedbackbar__container" id="sdn-feedbackbar-container">
      <div className="sdn-feedbackbar__useful" />

      <div className="sdn-feedbackbar__foundbug">
        <span>Našli ste na stránke chybu?&nbsp;</span>
        <span>
          <a
            href="#"
            className="sdn-feedbackbar__link"
            data-test="feedback"
            onClick={(e) => {
              e.preventDefault()
              setIsFeedbackOpen(true)
            }}
          >
            Napíšte nám
          </a>
        </span>
      </div>
    </div>
  )
}
