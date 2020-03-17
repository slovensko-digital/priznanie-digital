import React from 'react';
import { useField } from 'formik';
import classnames from 'classnames';
import { UserInput } from '../types/UserInput';

interface InputProps<Name> {
  name: Name;
  label: string;
  hint?: string;
  className?: string;
  type: 'text' | 'number' | 'email';
  width?: 30 | 20 | 10 | 5 | 4 | 3 | 2 | 'auto';
}

export const numberInputRegexp = '^[0-9][0-9,\\.]+$';

export const Input = <Name extends keyof UserInput>({
  label,
  hint,
  width = 20,
  className,
  type,
  ...props
}: InputProps<Name> & React.HTMLProps<HTMLInputElement>) => {
  const [field, meta] = useField(props.name);

  const getNumberInputProps = () => {
    if (type === 'number') {
      return {
        pattern: numberInputRegexp,
        inputMode: 'numeric' as 'numeric',
        spellCheck: false,
        placeholder: 'Suma v EUR, napríklad 123,45',
      };
    }
    return {};
  };

  return (
    <div
      className={classnames([
        'govuk-form-group',
        className,
        meta.touched && meta.error && 'govuk-form-group--error',
      ])}
    >
      <label
        className="govuk-label govuk-!-font-weight-bold"
        htmlFor={props.name}
      >
        {label}
      </label>
      <span className="govuk-hint">{hint}</span>
      <input
        id={props.name}
        className={classnames('govuk-input', {
          [`govuk-input--width-${width}`]: width !== 'auto',
        })}
        data-test={`${field.name}-input`}
        {...getNumberInputProps()}
        {...field}
        {...props}
        type="text"
      />
      {meta.touched && meta.error ? (
        <span
          id={props.name}
          data-test="error"
          className="govuk-error-message govuk-!-margin-top-2 govuk-!-margin-bottom-0"
        >
          <span className="govuk-visually-hidden">Error:</span> {meta.error}
        </span>
      ) : null}
    </div>
  );
};

interface BooleanRadioProps<Name> {
  name: Name;
  title: string;
}
export const BooleanRadio = <Name extends keyof UserInput>({
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
              id={`${field.name}-input-yes`}
              checked={field.value === true}
              onChange={() => helpers.setValue(true)}
            />
            <label
              className="govuk-label govuk-radios__label"
              htmlFor={`${props.name}-input-yes`}
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
              id={`${field.name}-input-no`}
              type="radio"
              checked={field.value === false}
              onChange={() => helpers.setValue(false)}
            />
            <label
              className="govuk-label govuk-radios__label"
              htmlFor={`${props.name}-input-no`}
            >
              Nie
            </label>
          </div>
        </div>
        {meta.touched && meta.error ? (
          <span
            data-test="error"
            className="govuk-error-message govuk-!-margin-top-3"
          >
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
  label?: string;
  hint?: string;
}
export const Checkbox = <Name extends keyof UserInput>({
  title,
  hint,
  label,
  ...props
}: BooleanRadioProps<Name>) => {
  const [field, meta] = useField(props.name);
  return (
    <div className="govuk-form-group">
      <fieldset className="govuk-fieldset" aria-describedby="waste-hint">
        <legend className="govuk-fieldset__legend govuk-fieldset__legend--xl">
          <h1 className="govuk-fieldset__heading">{title}</h1>
        </legend>
        {hint ? <span className="govuk-hint">{hint}</span> : null}
        <div className="govuk-checkboxes">
          <div className="govuk-checkboxes__item">
            <input
              {...field}
              {...props}
              id={props.name}
              className="govuk-checkboxes__input"
              type="checkbox"
            />
            <label
              className="govuk-label govuk-checkboxes__label"
              htmlFor={props.name}
            >
              {label ?? 'Ano'}
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

interface CheckboxSmallProps {
  name: string;
  label: string | React.ReactNode;
}
export const CheckboxSmall = ({
  name,
  label,
  ...props
}: CheckboxSmallProps) => {
  const [field, meta] = useField(name);
  return (
    <div className="govuk-checkboxes__item">
      <input
        {...field}
        {...props}
        className="govuk-checkboxes__input"
        type="checkbox"
        data-test={`${field.name}-input`}
        id={name}
      />
      <label className="govuk-label govuk-checkboxes__label" htmlFor={name}>
        {label}
      </label>
      {meta.touched && meta.error ? (
        <span id={name} className="govuk-error-message">
          <span className="govuk-visually-hidden">Error:</span> {meta.error}
        </span>
      ) : null}
    </div>
  );
};
