import React from 'react'
import Link from 'next/link'
import { FieldArray, Form } from 'formik'
import styles from './deti.module.css'
import {
  BooleanRadio,
  Input,
  CheckboxSmall,
  FormWrapper,
  Select,
} from '../../_shared/forms/FormComponents'
import { ChildrenUserInput } from '../../_shared/pages/_types/PageUserInputs'
import { ChildInput } from '../../_shared/taxform/TaxFormUserInput'
import { monthNames } from './_types/monthNames'
import {
  childrenUserInputInitialValues,
  makeEmptyChild,
} from '../../_shared/calculation/initialValues'
import classnames from 'classnames'
import {
  formatCurrency,
  formatRodneCislo,
  validateRodneCislo,
} from '../../_shared/_utils/utils'
import { Page } from '../../_shared/pages/Page'
import { ErrorSummary } from '../../_shared/forms/ErrorSummary'
import { CHILD_RATE_OVER_SIX_UNTIL_JULY, TAX_YEAR } from '../../_shared/calculation/calculation'

const Deti: Page<ChildrenUserInput> = ({
  setTaxFormUserInput,
  taxFormUserInput,
  taxForm,
  router,
  previousRoute,
  nextRoute,
}) => {
  const previousPageLink = (
    <Link href={previousRoute} data-test="back" className="govuk-back-link">
      Späť
    </Link>
  )

  if (!taxForm.eligibleForChildrenBonus) {
    return (
      <>
        {previousPageLink}
        <h1 className="govuk-heading-l">
          Daňový bonus na dieťa do 16 rokov alebo študenta do 25 rokov, s ktorým
          žijete v spoločnej domácnosti
        </h1>
        <p data-test="ineligible-message">Nemáte nárok na daňový bonus.</p>
        <Link href={nextRoute} legacyBehavior>
          <button className="govuk-button govuk-!-margin-top-4" type="button">
            Pokračovať
          </button>
        </Link>
      </>
    )
  }

  return (
    <>
      {previousPageLink}
      <FormWrapper<ChildrenUserInput>
        initialValues={taxFormUserInput}
        validate={validate}
        onSubmit={(values) => {
          const userInput = values.hasChildren
            ? values
            : {
                ...childrenUserInputInitialValues,
                hasChildren: false,
              }
          setTaxFormUserInput(userInput)
          router.push(nextRoute)
        }}
      >
        {({ values, errors, setErrors, validateForm, setFieldValue }) => (
          <Form className="form">
            <ErrorSummary<ChildrenUserInput> errors={errors} />
            <BooleanRadio
              title={`Máte dieťa, s ktorým ste v roku ${TAX_YEAR} žili v spoločnej domácnosti a malo do 16 rokov alebo študenta do 25 rokov?`}
              name="hasChildren"
            />
            {values.hasChildren && (
              <>
                <p className="govuk-hint">
                  V prípade, že ste sa v roku {TAX_YEAR} starali o nezaopatrené
                  dieťa do 16 rokov, študenta do 25 rokov alebo o nezaopatrené
                  dieťa do 25 rokov, ktoré je dlhodobo choré, máte právo na
                  zľavu na dani vo výške{' '}
                  {formatCurrency(CHILD_RATE_OVER_SIX_UNTIL_JULY)} eur mesačne.
                  Ročný bonus na dieťa činí{' '}
                  {formatCurrency(CHILD_RATE_OVER_SIX_UNTIL_JULY * 12)}. Daňový
                  bonus na dieťa do 6 rokov je dvojnásobný.
                </p>
                <p className="govuk-hint">
                  Ak sa Vám v roku 2021 narodilo dieťa a toto je prvé daňové
                  priznanie, v ktorom naň žiadate daňový bonus, je potrebné
                  zahrnúť rodný list dieťaťa do prílohy k daňovému priznaniu.
                </p>
                <p className="govuk-hint">
                  Daňový bonus na dieťa si môže uplatniť iba jeden z rodičov.
                </p>

                <FieldArray name="children">
                  {(arrayHelpers) => (
                    <div className={styles.childrenInputGroup}>
                      {values.children.map((child, index) => (
                        <div key={child.id}>
                          {values.children.length > 1 && (
                            <h2
                              className={classnames(
                                'govuk-heading-m',
                                'govuk-!-margin-top-3',
                                styles.childHeadline,
                              )}
                            >
                              {index + 1}. dieťa
                              <button
                                className="govuk-button btn-secondary btn-warning"
                                type="button"
                                onClick={() => arrayHelpers.remove(index)}
                                data-test={`remove-child-${index}`}
                              >
                                Odstrániť {index + 1}. dieťa
                              </button>
                            </h2>
                          )}
                          <ChildForm
                            savedValues={child}
                            index={index}
                            setFieldValue={setFieldValue}
                          />
                        </div>
                      ))}
                      <button
                        className="btn-secondary govuk-button"
                        type="button"
                        onClick={async () => {
                          const errors = await validateForm()
                          setErrors(errors)
                          const hasErrors = Object.keys(errors).length > 0
                          if (!hasErrors) {
                            arrayHelpers.push(makeEmptyChild())
                          }
                        }}
                        data-test="add-child"
                      >
                        Pridať ďalšie dieťa
                      </button>
                    </div>
                  )}
                </FieldArray>
              </>
            )}

            <button className="govuk-button" type="submit">
              Pokračovať
            </button>
          </Form>
        )}
      </FormWrapper>
    </>
  )
}

interface ChildFormProps {
  index: number
  savedValues: ChildInput
  setFieldValue: (name: string, value: string) => void
}
const ChildForm = ({ savedValues, index, setFieldValue }: ChildFormProps) => {
  return (
    <>
      <Input
        name={`children[${index}].priezviskoMeno` as any}
        type="text"
        label="Meno a priezvisko"
      />
      <Input
        name={`children[${index}].rodneCislo` as any}
        type="text"
        label="Rodné číslo"
        maxLength={13}
        onChange={async (event) => {
          const rodneCisloValue = formatRodneCislo(
            event.currentTarget.value,
            savedValues.rodneCislo,
          )
          setFieldValue(`children[${index}].rodneCislo`, rodneCisloValue)
        }}
      />
      <div className="govuk-form-group">
        <legend className="govuk-fieldset__legend govuk-fieldset__legend--s">
          <h1 className="govuk-fieldset__heading">
            Daňový bonus si uplatňujem v mesiacoch
          </h1>
        </legend>
        <div className="govuk-checkboxes">
          <CheckboxSmall
            name={`children[${index}].wholeYear`}
            label="Za celý kalendárny rok"
          />
        </div>
      </div>
      <div
        className={classnames('govuk-form-group', styles.inlineFieldContainer)}
      >
        <Select
          name={`children[${index}].monthFrom`}
          label="Od"
          options={monthNames}
          disabled={savedValues.wholeYear ? 0 : false}
        />
        <Select
          name={`children[${index}].monthTo`}
          label="Do"
          options={monthNames}
          disabled={savedValues.wholeYear ? 11 : false}
        />
      </div>
    </>
  )
}

interface ChildFormErrors {
  priezviskoMeno?: string
  rodneCislo?: string
  monthTo?: string
}
interface ChildrenFormErrors {
  hasChildren?: string
  children?: ChildFormErrors[]
}

const validate = (values: ChildrenUserInput) => {
  const errors: ChildrenFormErrors = {}

  if (typeof values.hasChildren === 'undefined') {
    errors.hasChildren = 'Vyznačte odpoveď'
  }

  if (values.hasChildren) {
    const childrenErrors = values.children.map((childValues, index) => {
      const childErrors: ChildFormErrors = {}

      if (childValues.priezviskoMeno.length === 0) {
        childErrors.priezviskoMeno = 'Zadajte meno a priezvisko dieťaťa'
      }
      if (!childValues.rodneCislo) {
        childErrors.rodneCislo = 'Zadajte rodné číslo dieťaťa'
      } else if (!validateRodneCislo(childValues.rodneCislo)) {
        childErrors.rodneCislo = 'Zadané rodné číslo nie je správne'
      } else if (
        values.children
          .slice(0, index)
          .find((v) => v.rodneCislo === childValues.rodneCislo)
      ) {
        childErrors.rodneCislo = 'Každé dieťa môže byť zadané iba 1 krát'
      }

      if (
        !childValues.wholeYear &&
        Number.parseInt(childValues.monthFrom, 10) >
          Number.parseInt(childValues.monthTo, 10)
      ) {
        childErrors.monthTo = `Musí byť ${
          monthNames[childValues.monthFrom]
        } alebo neskôr`
      }

      return childErrors
    })

    if (childrenErrors.some((err) => Object.keys(err).length > 0)) {
      errors.children = childrenErrors
    }
  }

  return errors
}

export { validate, Deti }