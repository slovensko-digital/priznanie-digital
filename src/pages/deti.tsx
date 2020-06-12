import React, { useEffect } from 'react'
import Link from 'next/link'
import { FieldArray, Form } from 'formik'
import { useRouter } from 'next/router'
import { NextPage } from 'next'
import styles from './deti.module.css'
import {
  BooleanRadio,
  Input,
  CheckboxSmall,
  FormWrapper,
  Select,
} from '../components/FormComponents'
import { ChildrenUserInput } from '../types/PageUserInputs'
import {
  ChildInput,
  monthNames,
  TaxFormUserInput,
} from '../types/TaxFormUserInput'
import { getRoutes } from '../lib/routes'
import { makeEmptyChild } from '../lib/initialValues'
import classnames from 'classnames'
import { formatRodneCislo, validateRodneCislo } from '../lib/utils'

const { nextRoute, previousRoute } = getRoutes('/deti')

interface Props {
  setTaxFormUserInput: (values: ChildrenUserInput) => void
  taxFormUserInput: TaxFormUserInput
}
const Deti: NextPage<Props> = ({
  setTaxFormUserInput,
  taxFormUserInput,
}: Props) => {
  const router = useRouter()
  useEffect(() => {
    router.prefetch(nextRoute())
  })

  return (
    <>
      <Link href={previousRoute()}>
        <a data-test="back" className="govuk-back-link">
          Späť
        </a>
      </Link>
      <FormWrapper<ChildrenUserInput>
        initialValues={taxFormUserInput}
        validate={validate}
        onSubmit={(values) => {
          setTaxFormUserInput(values)
          router.push(nextRoute())
        }}
      >
        {({ values, setErrors, validateForm, setFieldValue }) => (
          <Form className="form">
            <BooleanRadio
              title="Máte dieťa do 16 rokov alebo študenta do 25 rokov, s ktorým žijete v spoločnej domácnosti?"
              name="hasChildren"
            />
            <p>
              V prípade, že sa staráte o nezaopatrené dieťa do 16 rokov,
              študenta do 25 rokov alebo o nezaopatrené dieťa do 25 rokov, ktoré
              je dlhodobo choré, máte právo na zľavu na dani vo výške 21.56 €
              mesačne. Ročný bonus na dieťa činí 258.72 €. Daňový bonus na dieťa
              si môže uplatniť iba jeden z rodičov.
            </p>
            {values.hasChildren && (
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
                          key={index}
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
        width="auto"
      />
      <Input
        name={`children[${index}].rodneCislo` as any}
        type="text"
        label="Rodné číslo"
        width="auto"
        maxLength={13}
        onChange={async (event) => {
          const pscValue = formatRodneCislo(
            event.currentTarget.value,
            savedValues.rodneCislo,
          )
          setFieldValue(`children[${index}].rodneCislo`, pscValue)
        }}
      />
      <div className="govuk-form-group">
        <legend className="govuk-fieldset__legend govuk-fieldset__legend--s">
          <h1 className="govuk-fieldset__heading">
            Daňový bonus podľa § 33 zákona uplatňujem v mesiacoch
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
          className={styles.inlineField}
          options={monthNames}
          disabled={savedValues.wholeYear ? 0 : false}
        />
        <Select
          name={`children[${index}].monthTo`}
          label="Do"
          className={styles.inlineField}
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

export const validate = (values: ChildrenUserInput) => {
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
        parseInt(childValues.monthFrom, 10) > parseInt(childValues.monthTo, 10)
      ) {
        childErrors.monthTo = `Musí byť ${
          monthNames[childValues.monthFrom]
        } alebo neskôr`
      }

      return childErrors
    })

    if (
      childrenErrors.filter((err) => Object.keys(err).length > 0).length > 0
    ) {
      errors.children = childrenErrors
    }
  }

  return errors
}

export default Deti
