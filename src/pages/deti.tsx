import React, { useEffect } from 'react'
import Link from 'next/link'
import { FieldArray, Form } from 'formik'
import styles from './deti.module.css'
import {
  BooleanRadio,
  Input,
  FormWrapper,
  Select
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
  maxChildAgeBonusMonth,
  minChildAgeBonusMonth,
} from '../lib/utils'
import { Page } from '../components/Page'
import { ErrorSummary } from '../components/ErrorSummary'
import {
  CHILD_RATE_FIFTEEN_AND_OLDER_FROM_JULY,
  CHILD_RATE_FIFTEEN_AND_YOUNGER_FROM_JULY,
  CHILD_RATE_OVER_SIX_UNTIL_JULY,
  CHILD_RATE_SIX_AND_YOUNGER_UNTIL_JULY,
  MAX_CHILD_AGE_BONUS,
  monthKeyValues,
  monthToKeyValue,
  TAX_YEAR,
} from '../lib/calculation'
import { Details } from '../components/Details'
import RadioGroup from "../components/radio/RadioGroup";
import Radio from "../components/radio/Radio";
import RadioConditional from "../components/radio/RadioConditional";
import Fieldset from "../components/fieldset/Fieldset";

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
              <Fieldset title={`Boli zdaniteľné príjmy, ktoré uvádzate, aspoň z časti dosiahnuté z výkonu činnosti už pred 1.7.${TAX_YEAR}?`}
                hint="Zdaniteľné príjmy, ktoré uvádzate v daňovom priznaní zo závislej činnosti alebo podnikateľskej alebo inej samostatnej zárobkovej činnosti."
                error={errors.prijmyPredJul22}
              >
                <RadioGroup value={String(values.prijmyPredJul22)} onChange={(value) => {
                  setFieldValue('prijmyPredJul22', value === 'true')
                }}>
                  <Radio name="prijmyPredJul22-input-yes" label="Áno" value="true" />

                  <Radio name="prijmyPredJul22-input-no" label="Nie" value="false" />
                  <RadioConditional forValue="false">
                    <div className="govuk-form-group">
                      <fieldset
                        className="govuk-fieldset"
                        role="group"
                        aria-describedby="zaciatok-prijmov-hint"
                      >
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
                  </RadioConditional>
                </RadioGroup>
              </Fieldset>
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
  setFieldValue: (name: string, value: string | boolean) => void
}
const ChildForm = ({ savedValues: { rodneCislo, wholeYear }, index, setFieldValue }: ChildFormProps) => {
  const monthNamesFrom = monthNames.filter(month => minChildAgeBonusMonth(rodneCislo, month))
  const monthNamesUntil = monthNames.filter(month => maxChildAgeBonusMonth(rodneCislo, month))
  const monthOptions = monthNamesUntil.filter(value => monthNamesFrom.includes(value));
  const bonusInPartOfYear = monthOptions.length < 12

  useEffect(() => {
    if (validateRodneCislo(rodneCislo)) {
      if (bonusInPartOfYear) {
        setFieldValue(`children[${index}].wholeYear`, false)
      } else {
        setFieldValue(`children[${index}].wholeYear`, true)
      }
      if (monthOptions.length) {
        const fromMonthValue = monthToKeyValue(monthOptions[0]).value.toString()
        const toMonthValue = monthToKeyValue(monthOptions[monthOptions.length - 1]).value.toString()
        setFieldValue(`children[${index}].monthFrom`, fromMonthValue)
        setFieldValue(`children[${index}].monthTo`, toMonthValue)
      }
    } else {
      setFieldValue(`children[${index}].wholeYear`, true)
    }
  }, [bonusInPartOfYear, rodneCislo])

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
            rodneCislo,
          )
          setFieldValue(`children[${index}].rodneCislo`, rodneCisloValue)
        }}
      />
      <RadioGroup value={wholeYear ? 'wholeYear' : 'partYear'} onChange={(value) => {
        setFieldValue(`children[${index}].wholeYear`, value === 'wholeYear')
      }}>
        <Radio name={`children[${index}]-bonus-interval-input-wholeyear`} label="Za celý kalendárny rok" value="wholeYear" disabled={!validateRodneCislo(rodneCislo) || bonusInPartOfYear} />
        <Radio name={`children[${index}]-bonus-interval-input-partyear`} label="V niektorých mesiacoch" value="partYear" disabled={!validateRodneCislo(rodneCislo) || monthOptions.length === 0} />
        <RadioConditional forValue="partYear">
          <legend className="govuk-fieldset__legend govuk-fieldset__legend--s">
            <h1 className="govuk-fieldset__heading">
              Daňový bonus si uplatňujem v mesiacoch
            </h1>
          </legend>
          <p className='govuk-hint'>Daňový bonus si môžete uplatniť v mesiacoch {monthOptions[0]} až {monthOptions[monthOptions.length - 1]}</p>
          <div
            className={classnames('govuk-form-group', styles.inlineFieldContainer)}
          >
            <Select
              name={`children[${index}].monthFrom`}
              label="Od"
              optionsWithValue={monthKeyValues(monthOptions)}
              disabled={wholeYear ? 0 : false}
            />
            <Select
              name={`children[${index}].monthTo`}
              label="Do"
              optionsWithValue={monthKeyValues(monthOptions)}
              disabled={wholeYear ? 11 : false}
            />
          </div>
        </RadioConditional>
      </RadioGroup>
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

  if (values.prijmyPredJul22 === false && values.hasChildren) {
    const date = new Date(`${values.zaciatokPrijmovRok}-${values.zaciatokPrijmovMesiac}-${values.zaciatokPrijmovDen}`);
    if (date.getDate() !== Number.parseInt(values.zaciatokPrijmovDen, 10)) {
      errors.zaciatokPrijmovDen = 'Zadajte deň v správnom tvare'
    }
    if ((date.getMonth() + 1) !== Number.parseInt(values.zaciatokPrijmovMesiac, 10)) {
      errors.zaciatokPrijmovMesiac = 'Zadajte mesiac v správnom tvare'
    }
    if ((date.getMonth() + 1) < 7) {
      errors.zaciatokPrijmovMesiac = 'Zadaný mesiac musí byť 7 alebo viac'
    }
  }

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
      } else if (!maxChildAgeBonusMonth(childValues.rodneCislo, 'Január',)) {
        childErrors.rodneCislo = `Dieťa malo v roku ${TAX_YEAR} rok viac ako ${MAX_CHILD_AGE_BONUS} rokov.`
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
        childErrors.monthTo = `Musí byť ${monthNames[childValues.monthFrom]
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
