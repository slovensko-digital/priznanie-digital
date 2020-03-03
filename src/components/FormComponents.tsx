import React from 'react';
import { useField } from 'formik';
import classnames from 'classnames';
import { TaxFormUserInput } from '../types/TaxFormUserInput';

interface InputProps<Name> {
  name: Name;
  label: string;
  small?: string;
  className?: string;
  type: 'text' | 'number';
}

export const Input = <Name extends keyof TaxFormUserInput>({
  label,
  small,
  className,
  ...props
}: InputProps<Name> & React.HTMLProps<HTMLInputElement>) => {
  const [field, meta] = useField(props.name);

  return (
    <div className={classnames(['govuk-form-group', className])}>
      <label className="govuk-label" htmlFor={props.name}>
        <div>{label}</div>
        <small>{small}</small>
      </label>
      <input
        className="govuk-input"
        data-test={`${field.name}-input`}
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <span id={props.name} className="govuk-error-message">
          <span className="govuk-visually-hidden">Error:</span> {meta.error}
        </span>
      ) : null}
      <style jsx>{`
        .govuk-form-group {
          height: 75px;
        }
      `}</style>
    </div>
  );
};

interface BooleanRadioProps<Name> {
  name: Name;
  title: string;
}
export const BooleanRadio = <Name extends keyof TaxFormUserInput>({
  title,
  ...props
}: BooleanRadioProps<Name>) => {
  const [field, meta, helpers] = useField(props.name);

  return (
    <div className="govuk-form-group">
      <fieldset className="govuk-fieldset">
        <legend className="govuk-fieldset__legend govuk-fieldset__legend--l">
          <h1 className="govuk-fieldset__heading">{title}</h1>
        </legend>
        <div className="govuk-radios">
          <div className="govuk-radios__item">
            <input
              {...field}
              {...props}
              className="govuk-radios__input"
              type="radio"
              data-test={`${field.name}-input-yes`}
              checked={field.value}
              onChange={() => helpers.setValue(true)}
            />
            <label
              className="govuk-label govuk-radios__label"
              htmlFor={props.name}
            >
              Áno
            </label>
          </div>
          <div className="govuk-radios__item">
            <input
              {...field}
              {...props}
              className="govuk-radios__input"
              data-test={`${field.name}-input-no`}
              type="radio"
              checked={field.value === undefined ? false : !field.value}
              onChange={() => helpers.setValue(false)}
            />
            <label
              className="govuk-label govuk-radios__label"
              htmlFor={props.name}
            >
              Nie
            </label>
          </div>
        </div>
        {meta.touched && meta.error ? (
          <span data-test="error" className="govuk-error-message">
            <span className="govuk-visually-hidden">Error:</span> {meta.error}
          </span>
        ) : null}
      </fieldset>
    </div>
  );
};

interface BooleanRadioProps<Name> {
  name: Name;
  title: string;
}
export const Checkbox = <Name extends keyof TaxFormUserInput>({
  title,
  ...props
}: BooleanRadioProps<Name>) => {
  const [field, meta] = useField(props.name);
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
              htmlFor={props.name}
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
};
