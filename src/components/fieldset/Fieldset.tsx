import React, { FC } from 'react'

interface Props {
  readonly title: string
  readonly hint?: string
  readonly error?: string
}

const Fieldset: FC<Props> = ({ title, hint, error, children }) => {
  return (
    <fieldset className="govuk-fieldset">
      <legend className="govuk-fieldset__legend govuk-fieldset__legend--l">
        <h1 className="govuk-fieldset__heading">{title}</h1>
      </legend>
      {hint && <span className="govuk-hint">{hint}</span>}
      {error && (
        <span data-test="error" className="govuk-error-message">
          <span className="govuk-visually-hidden">Chyba:</span> {error}
        </span>
      )}
      {children}
    </fieldset>
  )
}

export default Fieldset
