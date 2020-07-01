import React, { useState } from 'react'
import { Form } from 'formik'
import classNames from 'classnames'
import { TaxFormUserInput } from '../types/TaxFormUserInput'
import { PostponeUserInput } from '../types/PostponeUserInput'
import { FormWrapper } from './FormComponents'
import { ErrorSummary } from './ErrorSummary'

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
    children: taxFormUserInput.children.map((child) => {
      return {
        ...child,
        rodneCislo: 'anon',
        priezviskoMeno: 'anon',
      }
    }),
  }
}

interface Props {
  taxFormUserInput: TaxFormUserInput
  postponeUserInput: PostponeUserInput
}

export const Feedback: React.FC<Props> = ({ taxFormUserInput }: Props) => {
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false)
  // const [isUsefulSubmitted, setIsUsefulSubmitted] = useState(false)
  const [isSubmittedSuccessfully, setIsSubmittedSuccessfully] = useState(
    undefined,
  )

  // const usefulOnClick = () => {
  //   /** TODO make actually do something */
  //   // fetch(
  //   //   'https://navody.digital/spatna-vazba?current_path=priznanie-digital-info-test&amp;feedback_type=Useful',
  //   //   { method: 'POST' },
  //   // );
  //   setIsUsefulSubmitted(true)
  // }

  if (isFeedbackOpen) {
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
                setIsFeedbackOpen(false)
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
              <FormWrapper
                initialValues={{
                  whatWereYouDoing: '',
                  whatWentWrong: '',
                  agree: false,
                }}
                validate={(values) => {
                  const errors: any = {}

                  if (!values.whatWereYouDoing) {
                    errors.whatWereYouDoing =
                      'Napíšte prosím čo ste robili keď nastala chyba'
                  }

                  if (!values.whatWentWrong) {
                    errors.whatWentWrong = 'Napíšte prosím aká chyba nastala'
                  }

                  return errors
                }}
                onSubmit={async (values, { setErrors }) => {
                  const response = await fetch('/api/feedback', {
                    method: 'POST',
                    body: JSON.stringify({
                      whatWereYouDoing: values.whatWereYouDoing,
                      whatWentWrong: values.whatWentWrong,
                      taxFormUserInput: anonymizeTaxForm(taxFormUserInput),

                      // postponeUserInput: values.agree
                      //   ? postponeUserInput
                      //   : null,
                      url: window.location.href,
                    }),
                  })

                  const success = response.status === 200
                  setIsSubmittedSuccessfully(success)

                  if (!success) {
                    setErrors({
                      saving: 'Chyba pri odosielaní, skúste znovu',
                    } as any)
                  }
                }}
              >
                {(formik) => (
                  <Form noValidate>
                    <ErrorSummary
                      errors={formik.errors}
                      touched={formik.touched}
                    />
                    <div
                      className={classNames('govuk-form-group', {
                        'govuk-form-group--error':
                          formik.errors.whatWereYouDoing,
                      })}
                    >
                      <label className="govuk-label" htmlFor="whatWereYouDoing">
                        Čo ste robili?
                      </label>
                      {formik.errors.whatWereYouDoing && (
                        <span data-test="error" className="govuk-error-message">
                          <span className="govuk-visually-hidden">Chyba:</span>{' '}
                          {formik.errors.whatWereYouDoing}
                        </span>
                      )}
                      <input
                        type="text"
                        name="whatWereYouDoing"
                        data-test="whatWereYouDoing"
                        className="govuk-textarea"
                        {...formik.getFieldProps('whatWereYouDoing')}
                      />
                    </div>
                    <div
                      className={classNames('govuk-form-group', {
                        'govuk-form-group--error': formik.errors.whatWentWrong,
                      })}
                    >
                      <label className="govuk-label" htmlFor="whatWentWrong">
                        Čo sa nepodarilo?
                      </label>
                      {formik.errors.whatWentWrong && (
                        <span data-test="error" className="govuk-error-message">
                          <span className="govuk-visually-hidden">Chyba:</span>{' '}
                          {formik.errors.whatWentWrong}
                        </span>
                      )}
                      <textarea
                        name="whatWentWrong"
                        data-test="whatWentWrong"
                        className="govuk-textarea"
                        rows={3}
                        required
                        {...formik.getFieldProps('whatWentWrong')}
                      />
                    </div>
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
              </FormWrapper>
            )}
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className="sdn-feedbackbar__container" id="sdn-feedbackbar-container">
      <div className="sdn-feedbackbar__useful">
        {/* {!isUsefulSubmitted ? (
          <>
            <span className="sdn-feedbackbar__useful-question">
              Boli tieto informácie pre vás užitočné?
            </span>
            <span className="govuk-!-display-inline-block">
              <span className="sdn-feedbackbar__yes">
                <a
                  className="sdn-feedbackbar__link"
                  rel="nofollow"
                  href="#"
                  onClick={usefulOnClick}
                >
                  Áno
                </a>
              </span>
              <span className="sdn-feedbackbar__no">
                <a
                  href="#"
                  className="sdn-feedbackbar__link"
                  onClick={(e) => {
                    e.preventDefault()
                    setIsFeedbackOpen(true)
                  }}
                >
                  Nie
                </a>
              </span>
            </span>
          </>
        ) : (
          <div id="sdn-feedbackbar-thanks">
            <span>Ďakujeme za odozvu!&nbsp;</span>
          </div>
        )} */}
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
