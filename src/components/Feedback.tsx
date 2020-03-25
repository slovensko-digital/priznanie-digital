import React, { useState } from 'react'
import { Formik, Form } from 'formik'
import classNames from 'classnames'
import { TaxFormUserInput } from '../types/TaxFormUserInput'
import { PostponeUserInput } from '../types/PostponeUserInput'

interface Props {
  taxFormUserInput: TaxFormUserInput
  postponeUserInput: PostponeUserInput
}

export const Feedback: React.FC<Props> = ({
  taxFormUserInput,
  postponeUserInput,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isSubmittedSuccessfully, setIsSubmittedSuccessfully] = useState(
    undefined,
  )
  if (isOpen) {
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
              stránke. Neuvádzajte prosím svoje osobné údaje.
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
                setIsOpen(false)
              }}
            >
              zatvoriť
            </a>
          </div>
        </div>
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-two-thirds">
            {isSubmittedSuccessfully === true ? (
              <p className="govuk-body">Ďakujeme za feedback</p>
            ) : (
              <Formik
                initialValues={{
                  whatWereYouDoing: '',
                  whatWentWrong: '',
                  agree: false,
                }}
                onSubmit={async (values) => {
                  const response = await fetch('/api/feedback', {
                    method: 'POST',
                    body: JSON.stringify({
                      whatWereYouDoing: values.whatWereYouDoing,
                      whatWentWrong: values.whatWentWrong,
                      taxFormUserInput: values.agree ? taxFormUserInput : null, // TODO clean from USER INFO
                      postponeUserInput: values.agree
                        ? postponeUserInput
                        : null,
                      url: window.location.href,
                    }),
                  })

                  setIsSubmittedSuccessfully(response.status === 200)
                }}
              >
                {(formik) => (
                  <Form>
                    {isSubmittedSuccessfully === false && (
                      <span className="govuk-error-message">
                        Chyba pri odosielaní, skúste znovu
                      </span>
                    )}
                    <div className="govuk-form-group">
                      <label className="govuk-label" htmlFor="whatWereYouDoing">
                        Čo ste robili?
                      </label>
                      <input
                        type="text"
                        name="whatWereYouDoing"
                        data-test="whatWereYouDoing"
                        className="govuk-textarea"
                        {...formik.getFieldProps('whatWereYouDoing')}
                      />
                    </div>
                    <div className="govuk-form-group">
                      <label className="govuk-label" htmlFor="whatWentWrong">
                        Čo sa nepodarilo?
                      </label>
                      <textarea
                        name="whatWentWrong"
                        data-test="whatWentWrong"
                        className="govuk-textarea"
                        rows={3}
                        required
                        {...formik.getFieldProps('whatWentWrong')}
                      />
                    </div>
                    {/* <CheckboxSmall
                      name="agree"
                      label="Suhlasím s odoslaním dát ktoré som vyplnil (zatiaľ nie anonymne)"
                    /> */}
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
                    <p className="govuk-body feedback-submitted-feedback govuk-!-padding-left-4 govuk-!-padding-top-2 govuk-!-display-inline-block" />
                  </Form>
                )}
              </Formik>
            )}
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className="sdn-feedbackbar__container" id="sdn-feedbackbar-container">
      <div className="govuk-grid-column-one-third">
        <img src="/assets/images/icon-lock.svg" alt="" className="icon" />
        <span>Bezpečné SSL pripojenie</span>
      </div>
      <div className="govuk-grid-column-one-third">
        <img src="/assets/images/icon-correct.svg" alt="" className="icon" />
        <span>Overené certifikovaným účtovníkom</span>
      </div>
      <div className="sdn-feedbackbar__foundbug">
        <span>Našli ste na stránke chybu?&nbsp;</span>
        <span>
          <a
            href="#"
            className="sdn-feedbackbar__link"
            data-test="feedback"
            onClick={(e) => {
              e.preventDefault()
              setIsOpen(true)
            }}
          >
            Napíšte nám
          </a>
        </span>
      </div>
    </div>
  )
}
