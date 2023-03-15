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
} from '../components/FormComponents'
import { ChildrenUserInput } from '../types/PageUserInputs'
import { ChildInput, monthNames } from '../types/TaxFormUserInput'
import {
  childrenUserInputInitialValues,
  makeEmptyChild,
} from '../lib/initialValues'
import classnames from 'classnames'
import {
  formatCurrency,
  formatRodneCislo,
  validateRodneCislo,
} from '../lib/utils'
import { Page } from '../components/Page'
import { ErrorSummary } from '../components/ErrorSummary'
import {
  CHILD_RATE_FIFTEEN_AND_OLDER_FROM_JULY,
  CHILD_RATE_FIFTEEN_AND_YOUNGER_FROM_JULY,
  CHILD_RATE_OVER_SIX_UNTIL_JULY,
  CHILD_RATE_SIX_AND_YOUNGER_UNTIL_JULY,
  TAX_YEAR,
} from '../lib/calculation'
import { Details } from '../components/Details'

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
          let userInput = values.hasChildren
            ? values
            : {
                ...childrenUserInputInitialValues,
                hasChildren: false,
              }
          userInput = values.prijmyPredJul22
            ? userInput
            : {
                ...userInput,
                r034a: `${values.zaciatokPrijmovDen}.${values.zaciatokPrijmovMesiac}.${values.zaciatokPrijmovRok}`,
              }
          setTaxFormUserInput(userInput)
          router.push(nextRoute)
        }}
      >
        {({ values, errors, setErrors, validateForm, setFieldValue }) => (
          <Form className="form">
            <ErrorSummary<ChildrenUserInput> errors={errors} />
            <BooleanRadio
              title={`Chcete si uplatniť daňový bonus na dieťa, s ktorým ste počas roku ${TAX_YEAR} žili v spoločnej domácnosti?`}
              name="hasChildren"
            />
            {values.hasChildren && (
              <BooleanRadio
                title={`Boli zdaniteľné príjmy, ktoré uvádzate, aspoň z časti dosiahnuté z výkonu činnosti už pred 1.7.${TAX_YEAR}?`}
                name="prijmyPredJul22"
                hint="Zdaniteľné príjmy, ktoré uvádzate v daňovom priznaní zo závislej činnosti alebo podnikateľskej alebo inej samostatnej zárobkovej činnosti."
              />
            )}
            {values.hasChildren && values.prijmyPredJul22 === false && (
              <>
                <div className="govuk-form-group">
                  <fieldset
                    className="govuk-fieldset"
                    role="group"
                    aria-describedby="zaciatok-prijmov-hint"
                  >
                    <legend className="govuk-fieldset__legend govuk-fieldset__legend--l">
                      <h1 className="govuk-fieldset__heading">
                        Uveďte presný dátum
                      </h1>
                    </legend>
                    <div id="zaciatok-prijmov-hint" className="govuk-hint">
                      Dátum od kedy ste v roku {TAX_YEAR} začali vykonávať
                      závislú činnosť alebo podnikateľskú alebo inú samostatnú
                      zárobkovú činnosť, z ktorej ste dosiahli zdaniteľné prímy
                      uvedené v daňovom priznaní.
                      <br />
                      Napríklad 27 8 2022
                    </div>
                    <div className="govuk-date-input" id="zaciatok-prijmov">
                      <div className="govuk-date-input__item">
                        <div className="govuk-form-group">
                          <Input
                            name="zaciatokPrijmovDen"
                            label="Deň"
                            type="number"
                            width={2}
                          />
                        </div>
                      </div>
                      <div className="govuk-date-input__item">
                        <div className="govuk-form-group">
                          <Input
                            name="zaciatokPrijmovMesiac"
                            label="Mesiac"
                            type="number"
                            width={2}
                          />
                        </div>
                      </div>
                      <div className="govuk-date-input__item">
                        <div className="govuk-form-group">
                          <Input
                            name="zaciatokPrijmovRok"
                            type="number"
                            label="Rok"
                            width={4}
                            disabled
                          />
                        </div>
                      </div>
                    </div>
                  </fieldset>
                </div>
              </>
            )}
            {values.hasChildren &&
              [true, false].includes(values.prijmyPredJul22) && (
                <>
                  <h1 className="govuk-heading-l">Informácie o deťoch</h1>
                  <p className="govuk-hint">
                    V prípade, že ste sa v roku {TAX_YEAR} starali o
                    nezaopatrené dieťa do 16 rokov, študenta do 25 rokov alebo o
                    nezaopatrené dieťa do 25 rokov, ktoré je dlhodobo choré,
                    máte právo na zľavu na dani.
                  </p>
                  <Details title="Aká je výška daňového bonusu?">
                    <p className="govuk-hint">
                      <b>
                        Daňový bonus na vyživované dieťa od 1.1.2022 do
                        30.6.2022:
                      </b>
                      <ul>
                        <li>
                          na dieťa do 6 rokov veku sumu{' '}
                          {formatCurrency(
                            CHILD_RATE_SIX_AND_YOUNGER_UNTIL_JULY,
                          )}{' '}
                          mesačne.
                        </li>
                        <li>
                          na dieťa nad 6 rokov veku do 15 rokov veku sumu{' '}
                          {formatCurrency(CHILD_RATE_OVER_SIX_UNTIL_JULY)}{' '}
                          mesačne.
                        </li>
                        <li>
                          na dieťa nad 15 rokov veku sumu{' '}
                          {formatCurrency(
                            CHILD_RATE_SIX_AND_YOUNGER_UNTIL_JULY,
                          )}{' '}
                          mesačne.
                        </li>
                      </ul>
                      <b>
                        Daňový bonus na vyživované dieťa od 1.7.2022 do
                        31.12.2022:
                      </b>
                      <ul>
                        <li>
                          na dieťa do 16 rokov veku sumu{' '}
                          {formatCurrency(
                            CHILD_RATE_FIFTEEN_AND_YOUNGER_FROM_JULY,
                          )}{' '}
                          mesačne.
                        </li>
                        <li>
                          na dieťa nad 15 rokov veku sumu{' '}
                          {formatCurrency(
                            CHILD_RATE_FIFTEEN_AND_OLDER_FROM_JULY,
                          )}{' '}
                          mesačne.
                        </li>
                      </ul>
                      <p className="govuk-hint">
                        Nárok na daňový bonus v 2. polroku je ale možné uplatniť
                        najviac do výšky ustanoveného percenta z polovice
                        základu dane v rozmedzí od 20 % v prípade daňového
                        bonusu na 1 dieťa až do 55 % v prípade daňového bonusu
                        na 6 a viac detí.
                      </p>
                      <p className="govuk-hint">
                        Daňovník, ktorý začal vykonávať závislú činnosť, z
                        ktorej dosahuje príjmy od 1.7.2022, môže uplatniť daňový
                        bonus najviac do výšky čiastkového základu dane z
                        príjmov.
                      </p>
                    </p>
                  </Details>
                  <p className="govuk-hint">
                    Ak si uplatňujete daňový bonus na dieťa po prvýkrát alebo
                    ide o dieťa narodené v priebehu roka 2022, je potrebné
                    zahrnúť kópiu rodného listu dieťaťa do príloh k daňovému
                    priznaniu.
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
        width={10}
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
  zaciatokPrijmovDen?: string,
  zaciatokPrijmovMesiac?: string,
}

export const validate = (values: ChildrenUserInput) => {
  const errors: ChildrenFormErrors = {}

  if(values.prijmyPredJul22 === false && values.hasChildren) {
    const date = new Date(`${values.zaciatokPrijmovRok}-${values.zaciatokPrijmovMesiac}-${values.zaciatokPrijmovDen}`);
    if (date.getDate() !== Number.parseInt(values.zaciatokPrijmovDen, 10)) {
      errors.zaciatokPrijmovDen = 'Zadajte deň v správnom tvare'
    }
    if ((date.getMonth() + 1) !== Number.parseInt(values.zaciatokPrijmovMesiac, 10)) {
      errors.zaciatokPrijmovMesiac = 'Zadajte mesiac v správnom tvare'
    }
    if ((date.getMonth() + 1) < 7){
      errors.zaciatokPrijmovMesiac = 'Zadaný mesiac musí byť 7 alebo viac'
    }
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

export default Deti
