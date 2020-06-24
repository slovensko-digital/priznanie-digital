import React from 'react'
import { FormikErrors, FormikTouched } from 'formik'

interface Props<Values> {
  errors: FormikErrors<Values>
  touched: FormikTouched<Values>
}

export function ErrorSummary<Values>({ errors }: Props<Values>) {
  const errorEntries = Object.entries(errors)

  const shouldShowErrorSummary = errorEntries.length !== 0

  return shouldShowErrorSummary ? (
    <div
      className="govuk-error-summary"
      aria-labelledby="error-summary-title"
      role="alert"
      tabIndex={-1}
      data-module="govuk-error-summary"
    >
      <h2 className="govuk-error-summary__title" id="error-summary-title">
        Vyskytol sa problém
      </h2>
      <div className="govuk-error-summary__body">
        <ul className="govuk-list govuk-error-summary__list">
          {errorEntries
            .filter((values) => typeof values[1] === 'string')
            .map(([name, label]) => {
              return (
                <li key={name}>
                  <a href={`#${name}`}>{label}</a>
                </li>
              )
            })}
        </ul>
      </div>
    </div>
  ) : (
    <></>
  )
}
