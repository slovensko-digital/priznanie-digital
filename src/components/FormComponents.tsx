import React, { ReactNode } from 'react'
import {
  Formik,
  FormikProps,
  useField,
  FormikConfig,
  FormikValues,
} from 'formik'
import classnames from 'classnames'
import { UserInput } from '../types/UserInput'
import { numberInputRegexp } from '../lib/utils'

export type FormWrapperProps<FormikInput> = FormikConfig<FormikInput> & {
  children: (formikProps: FormikProps<FormikInput>) => ReactNode
}

export const FormWrapper = <FormikInput extends FormikValues>({
  children,
  ...formikProps
}: FormWrapperProps<FormikInput>) => {
  const validate = (values: FormikInput) => {
    if (!formikProps.validate) return {}
    const errors = formikProps.validate(values)
    const firstError = errors && Object.keys(errors)[0]
    if (firstError) {
      ;(document.querySelector(`#${firstError}`) as HTMLInputElement)?.focus()
    }
    return errors
  }

  return (
    <Formik<FormikInput>
      validateOnChange={false}
      validateOnBlur={false}
      {...formikProps}
      validate={validate}
    >
      {children}
    </Formik>
  )
}

interface InputProps<Name> {
  name: Name
  label: string
  hint?: string | ReactNode
  className?: string
  type: 'text' | 'number' | 'email'
  width?: 30 | 20 | 10 | 5 | 4 | 3 | 2 | 'auto'
}

export const Input = <Name extends keyof UserInput>({
  label,
  hint,
  width = 20,
  className,
  type,
  ...props
}: InputProps<Name> & React.HTMLProps<HTMLInputElement>) => {
  const [field, meta] = useField(props.name)

  const getNumberInputProps = () => {
    if (type === 'number') {
      return {
        pattern: numberInputRegexp,
        inputMode: 'numeric' as 'numeric',
        spellCheck: false,
      }
    }
    return {}
  }

  return (
    <div
      className={classnames([
        'govuk-form-group',
        className,
        meta.error && 'govuk-form-group--error',
      ])}
    >
      <label
        className="govuk-label govuk-!-font-weight-bold"
        htmlFor={props.name}
      >
        {label}
      </label>
      <span className="govuk-hint">{hint}</span>
      {meta.error ? (
        <span
          id={`${props.name}-error`}
          data-test="error"
          className="govuk-error-message"
        >
          <span className="govuk-visually-hidden">Chyba:</span> {meta.error}
        </span>
      ) : null}
      <input
        id={props.name}
        className={classnames('govuk-input', {
          [`govuk-input--width-${width}`]: width !== 'auto',
        })}
        data-test={`${field.name}-input`}
        {...(meta.error && {
          'aria-invalid': true,
          'aria-describedby': `${props.name}-error`,
        })}
        {...getNumberInputProps()}
        {...field}
        {...props}
        type="text"
      />
    </div>
  )
}

interface BooleanRadioProps<Name> {
  name: Name
  title: string
  hint?: string | ReactNode
  disabled?: boolean
}
export const BooleanRadio = <Name extends keyof UserInput>({
  title,
  hint,
  disabled = false,
  ...props
}: BooleanRadioProps<Name>) => {
  const [field, meta, helpers] = useField(props.name)

  return (
    <div
      className={classnames([
        'govuk-form-group',
        meta.error && 'govuk-form-group--error',
      ])}
    >
      <fieldset className="govuk-fieldset">
        <legend className="govuk-fieldset__legend govuk-fieldset__legend--l">
          <h1 className="govuk-fieldset__heading">{title}</h1>
        </legend>
        {hint ? <span className="govuk-hint">{hint}</span> : null}
        {meta.error ? (
          <span data-test="error" className="govuk-error-message">
            <span className="govuk-visually-hidden">Chyba:</span> {meta.error}
          </span>
        ) : null}
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
              onChange={() => {
                helpers.setValue(true)
                helpers.setError(undefined)
              }}
              disabled={disabled}
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
              onChange={() => {
                helpers.setValue(false)
                helpers.setError(undefined)
              }}
              disabled={disabled}
            />
            <label
              className="govuk-label govuk-radios__label"
              htmlFor={`${props.name}-input-no`}
            >
              Nie
            </label>
          </div>
        </div>
      </fieldset>
    </div>
  )
}

interface CheckboxProps<Name> {
  name: Name
  title: string
  label?: string
  hint?: string
}
export const Checkbox = <Name extends keyof UserInput>({
  title,
  hint,
  label,
  ...props
}: CheckboxProps<Name>) => {
  const [field, meta] = useField(props.name)
  return (
    <div className="govuk-form-group">
      <fieldset className="govuk-fieldset" aria-describedby="waste-hint">
        <legend className="govuk-fieldset__legend govuk-fieldset__legend--xl">
          <h1 className="govuk-fieldset__heading">{title}</h1>
        </legend>
        {hint ? <span className="govuk-hint">{hint}</span> : null}
        {meta.error ? (
          <span id={props.name} className="govuk-error-message">
            <span className="govuk-visually-hidden">Chyba:</span> {meta.error}
          </span>
        ) : null}
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
        </div>
      </fieldset>
    </div>
  )
}

interface CheckboxSmallProps {
  name: string
  className?: string
  disabled?: boolean
  label: string | React.ReactNode
}
export const CheckboxSmall = ({
  name,
  label,
  className,
  disabled = false,
  ...props
}: CheckboxSmallProps) => {
  const [field, meta] = useField(name)
  return (
    <div
      className={classnames([
        'govuk-form-group',
        meta.error && 'govuk-form-group--error',
      ])}
    >
      {meta.error ? (
        <span id={name} className="govuk-error-message">
          <span className="govuk-visually-hidden">Chyba:</span> {meta.error}
        </span>
      ) : null}
      <div className={classnames(['govuk-checkboxes__item', className])}>
        <input
          {...field}
          {...props}
          className="govuk-checkboxes__input"
          type="checkbox"
          data-test={`${field.name}-input`}
          id={name}
          checked={field.value === true}
          disabled={disabled}
        />
        <label className="govuk-label govuk-checkboxes__label" htmlFor={name}>
          {label}
        </label>
      </div>
    </div>
  )
}

interface SelectProps {
  name: string
  options: string[]
  className?: string
  hint?: string
  label: string | React.ReactNode

  /** boolean=true disables the <select> while keeping selected value
   *  number value temporarily selects a value while field is disabled */
  disabled?: boolean | number
}
export const Select = ({
  name,
  options,
  label,
  className,
  hint,
  disabled = false,
  ...props
}: SelectProps) => {
  const [field, meta] = useField(name)

  return (
    <div
      className={classnames([
        'govuk-form-group',
        className,
        meta.error && 'govuk-form-group--error',
      ])}
    >
      <label className="govuk-label govuk-!-font-weight-bold" htmlFor={name}>
        {label}
      </label>
      <span className="govuk-hint">{hint}</span>
      {meta.error ? (
        <span id={name} data-test="error" className="govuk-error-message">
          <span className="govuk-visually-hidden">Chyba:</span> {meta.error}
        </span>
      ) : null}
      <select
        className="govuk-select"
        style={{ width: '100%' }}
        id={name}
        {...props}
        {...field}
        disabled={disabled !== false}
        value={typeof disabled === 'number' ? disabled : field.value}
        data-test={`${name}-select`}
      >
        {options.map((name, key) => (
          <option key={key} value={key}>
            {name}
          </option>
        ))}
      </select>
    </div>
  )
}
