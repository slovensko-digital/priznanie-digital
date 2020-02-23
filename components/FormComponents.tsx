import React from "react";
import { useField } from "formik";

interface InputProps {
  name: string;
  label: string;
  type: "text" | "number";
}

export function Input({
  label,
  ...props
}: InputProps & React.HTMLProps<HTMLInputElement>) {
  const [field, meta] = useField(props.name);

  return (
    <div className="govuk-form-group">
      <label className="govuk-label" htmlFor={props.name}>
        {label}
      </label>
      <input className="govuk-input" {...field} {...props} />
      {meta.touched && meta.error ? (
        <span id={props.name} className="govuk-error-message">
          <span className="govuk-visually-hidden">Error:</span> {meta.error}
        </span>
      ) : null}
    </div>
  );
}

interface BooleanRadioProps {
  name: string;
  title: string;
}
export function BooleanRadio({ title, ...props }: BooleanRadioProps) {
  const [field, meta, helpers] = useField(props.name);
  return (
    <div className="govuk-form-group">
      <fieldset className="govuk-fieldset">
        <legend className="govuk-fieldset__legend govuk-fieldset__legend--xl">
          <h1 className="govuk-fieldset__heading">{title}</h1>
        </legend>
        <div className="govuk-radios">
          <div className="govuk-radios__item">
            <input
              {...field}
              {...props}
              className="govuk-radios__input"
              type="radio"
              onChange={() => helpers.setValue(true)}
            />
            <label
              className="govuk-label govuk-radios__label"
              htmlFor="where-do-you-live"
            >
              Ano
            </label>
          </div>
          <div className="govuk-radios__item">
            <input
              {...field}
              {...props}
              className="govuk-radios__input"
              type="radio"
              onChange={() => helpers.setValue(false)}
            />
            <label
              className="govuk-label govuk-radios__label"
              htmlFor="where-do-you-live-2"
            >
              Nie
            </label>
          </div>
        </div>
        {meta.touched && meta.error ? (
          <span id={props.name} className="govuk-error-message">
            <span className="govuk-visually-hidden">Error:</span> {meta.error}
          </span>
        ) : null}
      </fieldset>
    </div>
  );
}

export function Checkbox({ title, ...props }) {
  const [field, meta, helpers] = useField(props.name);
  return (
    <div className="govuk-form-group">
      <fieldset className="govuk-fieldset" aria-describedby="waste-hint">
        <legend className="govuk-fieldset__legend govuk-fieldset__legend--xl">
          <h1 className="govuk-fieldset__heading">{title}</h1>
        </legend>
        <div className="govuk-checkboxes">
          <div className="govuk-checkboxes__item">
            <input
              {...field}
              {...props}
              className="govuk-checkboxes__input"
              type="checkbox"
            />
            <label
              className="govuk-label govuk-checkboxes__label"
              htmlFor="waste"
            >
              Ano
            </label>
          </div>
          {meta.touched && meta.error ? (
            <span id={props.name} className="govuk-error-message">
              <span className="govuk-visually-hidden">Error:</span> {meta.error}
            </span>
          ) : null}
        </div>
      </fieldset>
    </div>
  );
}
