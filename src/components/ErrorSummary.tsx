import React from 'react';
import { FormikErrors, FormikTouched } from 'formik';

interface Props<Values> {
  errors: FormikErrors<Values>;
  touched: FormikTouched<Values>;
}

export function ErrorSummary<Values>({ errors, touched }: Props<Values>) {
  const errorEntries = Object.entries(errors);

  /** Check if we have at least one error and touched intersection */
  const shouldShowErrorSummary =
    errorEntries.length !== 0 &&
    Object.entries(errors).some(([error]) => Boolean(touched[error]));

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
          {errorEntries.map(([name, label]) => {
            return (
              touched[name] && (
                <li key={name}>
                  <a href={`#${name}`}>{label}</a>
                </li>
              )
            );
          })}
        </ul>
      </div>
    </div>
  ) : null;
}
