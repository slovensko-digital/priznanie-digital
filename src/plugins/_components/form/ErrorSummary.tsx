import React from 'react'
import { FormikErrors } from 'formik'

interface ErrorItemProps {
  name: string
  label: string
}

const ErrorItem = ({ name, label }: ErrorItemProps) => {
  return (
    <li key={name}>
      <a href={`#${name}`}>{label}</a>
    </li>
  )
}

interface ErrorSummaryProps<Values> {
  errors: FormikErrors<Values>
}

export function ErrorSummary<Values>({ errors }: ErrorSummaryProps<Values>) {
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
          {errorEntries.map(([name, labelOrSubErrors]) => {
            if (typeof labelOrSubErrors === 'string') {
              return (
                <ErrorItem key={name} name={name} label={labelOrSubErrors} />
              )
            } else if (Array.isArray(labelOrSubErrors)) {
              return labelOrSubErrors.map((errorObject, index) => {
                const errorObjectEntries = Object.entries(errorObject)
                return errorObjectEntries.map(([subname, sublabel]) => (
                  <ErrorItem
                    key={`${name}[${index}].${subname}`}
                    name={`${name}[${index}].${subname}`}
                    label={`${sublabel}`}
                  />
                ))
              })
            }
            return null
          })}
        </ul>
      </div>
    </div>
  ) : (
    <></>
  )
}
