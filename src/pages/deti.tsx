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
  numberInputRegexp,
} from '../lib/utils'
import { Page } from '../components/Page'
import { ErrorSummary } from '../components/ErrorSummary'
import {
  calculate,
  CHILD_RATE_EIGHTEEN_AND_OLDER,
  CHILD_RATE_EIGHTEEN_AND_YOUNGER,
  MAX_CHILD_AGE_BONUS,
  monthKeyValues,
  monthToKeyValue,
  TAX_YEAR,
} from '../lib/calculation'
import { Details } from '../components/Details'
import RadioGroup from "../components/radio/RadioGroup";
import Radio from "../components/radio/Radio";
import RadioConditional from "../components/radio/RadioConditional";
import Decimal from 'decimal.js'
import { Warning } from '../components/Warning'

const Deti: Page<ChildrenUserInput> = ({
  setTaxFormUserInput,
  taxForm,
  taxFormUserInput,
  router,
  previousRoute,
  nextRoute
}) => {
  const previousPageLink = (
    <Link href={previousRoute} data-test="back" className="govuk-back-link">
      Späť
    </Link>
  )

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
          const { danovyBonusNaDieta } = calculate({ ...taxFormUserInput, ...userInput })
          setTaxFormUserInput(userInput)
          if (values.hasChildren) {
            if (danovyBonusNaDieta.nevyuzityDanovyBonus.equals(new Decimal(0))) {
              router.push(nextRoute)
            } else {
              if (values.partner_bonus_na_deti === false) {
                router.push(nextRoute)
              } else if (values.partner_bonus_na_deti === true) {
                const errors = validate(values)
                if (Object.keys(errors).length === 0) {
                  router.push(nextRoute)
                }
              }
            }
          } else {
            router.push(nextRoute)
          }
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
                <>
                  <h1 className="govuk-heading-l">Informácie o deťoch</h1>
                  <p className="govuk-hint">
                    V prípade, že ste sa v roku {TAX_YEAR} starali o
                    nezaopatrené dieťa do 18 rokov, študenta do 25 rokov alebo o
                    nezaopatrené dieťa do 25 rokov, ktoré je dlhodobo choré,
                    máte právo na zľavu na dani.
                  </p>
                  <Details title="Aká je výška daňového bonusu?">
                    <p className="govuk-hint">
                      <b>
                        Daňový bonus na vyživované dieťa:
                      </b>
                      <ul>
                        <li>
                          do 18 rokov veku sumou{' '}
                          {formatCurrency(
                            CHILD_RATE_EIGHTEEN_AND_YOUNGER,
                          )}{' '}
                          mesačne.
                        </li>
                        <li>
                          nad 18 rokov veku sumou{' '}
                          {formatCurrency(
                            CHILD_RATE_EIGHTEEN_AND_OLDER,
                          )}{' '}
                          mesačne.
                        </li>
                      </ul>
                    </p>
                  </Details>
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

                  {(taxForm.danovyBonusNaDieta.nevyuzityDanovyBonus.greaterThan(new Decimal(0)) || values.partner_bonus_na_deti === true) && (
                    <>
                      <p>
                        Podľa vaších príjmov a počtu detí máte nárok na daňový bonus na vyživované dieťa vo výške {formatCurrency(taxForm.danovyBonusNaDieta.danovyBonus.toNumber())}. Ešte máte nevyužitý daňový bonus vo výške <b>{formatCurrency(taxForm.danovyBonusNaDieta.nevyuzityDanovyBonus.toNumber())}</b>.
                      </p>
                      <BooleanRadio
                        title={`Spĺňa nárok na daňový bonus aj druhá oprávnená osoba?`}
                        name="partner_bonus_na_deti"
                      />

                      {values.partner_bonus_na_deti && (
                        <>
                          <h1 className="govuk-heading-l govuk-!-margin-top-3">
                            Údaje o oprávnenej osobe
                          </h1>
                          <Input
                            name="r034_priezvisko_a_meno"
                            type="text"
                            label="Meno a priezvisko druhej oprávnenej osoby"
                          />
                          <Input
                            name="r034_rodne_cislo"
                            type="text"
                            label="Rodné číslo"
                            maxLength={13}
                            onChange={async (event) => {
                              const rodneCislo = formatRodneCislo(
                                event.currentTarget.value,
                                values.r034_rodne_cislo,
                              )
                              setFieldValue('r034_rodne_cislo', rodneCislo)
                            }}
                          />

                          <h2 className='govuk-heading-m'>Na začiatku ktorých mesiacov spĺňala druhá oprávnená osoba podmienky na daňový bonus na vyživované dieťa?</h2>
                            <div
                              className={classnames('govuk-form-group', styles.inlineFieldContainer)}
                            >
                          <Select
                            name={`partner_bonus_na_deti_od`}
                            label="Od"
                            optionsWithValue={[...monthKeyValues(monthNames), { name: '', value: '' }]}
                          />
                          <Select
                            name={`partner_bonus_na_deti_do`}
                            label="Do"
                            optionsWithValue={[...monthKeyValues(monthNames), { name: '', value: '' }]}
                          />
                        </div>
                        <h2 className="govuk-heading-m">Akým spôsobom vysporiada/la svoje zdaniteľné príjmy druhá oprávnená osoba za rok 2023?</h2>
                          <Select
                          name='partner_bonus_na_deti_typ_prijmu'
                          label="Vyberte spôsob vysporiadania príjmov"
                          optionsWithValue={[
                            { name: '', value: "0" },
                            { name: 'Podaním daňového priznania k dani z príjmov fyzickej osoby typ: A', value: "1" },
                            { name: 'Podaním daňového priznania k dani z príjmov fyzickej osoby typ: B', value: "2" },
                            { name: 'Vykonaním ročného zúčtovania preddavkov na daň z príjmov zamestnávateľom', value: "3" },
                            { name: 'Nemala povinnosť podať daňového priznanie / nebolo jej vykonané ročné zúčtovanie', value: "4" }
                          ]}
                        />

                          <Input
                            name="r034a"
                            type="number"
                            label="Prijem"
                            hint={getIncomeHint(values.partner_bonus_na_deti_typ_prijmu)}
                          />

                          <AttachmentWarning prijem={values.partner_bonus_na_deti_typ_prijmu} />
                        </>
                      )}
                    </>
                  )}
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

const AttachmentWarning = ({ prijem }) => {
  if (prijem === "3") {
    return (
      <Warning>
        Ako prílohu k vášmu daňovému priznaniu je potrebné priložiť kópiu dokladu o vykonanom ročnom zúčtovaní preddavkov druhej oprávnenej osoby.
      </Warning>
    )
  }
  if (prijem === "4") {
    return (
      <Warning>
        Ako prílohu k vášmu daňovému priznani je potrebné priložiť kópiu dokladu preukazujúceho výšku základu dane druhej oprávnenej osoby.
      </Warning>
    )
  }
  return null
}

const getIncomeHint = (value: string): string => {
  switch (value) {
    case "0":
      return ''
    case "1":
      return 'Výšku príjmov zistíte z formuláru daňového priznania FO typ A riadok 39'
    case "2":
      return 'Výšku príjmov zistíte z formuláru daňového priznania FO typ B riadok 72'
    case "3":
      return 'Výšku príjmov zistíte z ročného zúčtovania preddavkov na daň riadok 3.'
    default:
      break;
  }
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
    if (validateRodneCislo(rodneCislo) && maxChildAgeBonusMonth(rodneCislo, 'Január')) {
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
      <h3 className="govuk-heading-s">
        Daňový bonus si uplatňujem
      </h3>
      <RadioGroup value={wholeYear ? 'wholeYear' : 'partYear'} onChange={(value) => {
        setFieldValue(`children[${index}].wholeYear`, value === 'wholeYear')
      }}>
        <Radio name={`children[${index}]-bonus-interval-input-wholeyear`} label="Za celý kalendárny rok" value="wholeYear" disabled={!validateRodneCislo(rodneCislo) || bonusInPartOfYear} />
        <Radio name={`children[${index}]-bonus-interval-input-partyear`} label="V niektorých mesiacoch" value="partYear" disabled={!validateRodneCislo(rodneCislo) || monthOptions.length === 0} />
        <RadioConditional forValue="partYear">
          <legend className="govuk-fieldset__legend govuk-fieldset__legend--s">
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
  partner_bonus_na_deti_od?: string
  partner_bonus_na_deti_do?: string
  partner_bonus_na_deti_typ_prijmu?: string
  r034_priezvisko_a_meno?: string
  r034_rodne_cislo?: string
  r034a?: string
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
      } else if (!maxChildAgeBonusMonth(childValues.rodneCislo, 'Január')) {
        childErrors.rodneCislo = `Dieťa malo v roku ${TAX_YEAR} viac ako ${MAX_CHILD_AGE_BONUS} rokov.`
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

    if (values.partner_bonus_na_deti) {
      if (!["1", "2", "3", "4"].includes(values.partner_bonus_na_deti_typ_prijmu)) {
        errors.partner_bonus_na_deti_typ_prijmu = 'Vyberte jednu z možností spôsobu vysporiadania príjmov'
      }

      if (values.partner_bonus_na_deti_od === "") {
        errors.partner_bonus_na_deti_od = 'Zadajte začiatok'
      }

      if (values.partner_bonus_na_deti_do === "") {
        errors.partner_bonus_na_deti_do = 'Zadajte koniec'
      }

      if (!values.r034_priezvisko_a_meno) {
        errors.r034_priezvisko_a_meno = 'Zadajte meno a priezvisko'
      }

      if (!values.r034_rodne_cislo) {
        errors.r034_rodne_cislo = 'Zadajte rodné číslo'
      } else if (!validateRodneCislo(values.r034_rodne_cislo)) {
        errors.r034_rodne_cislo = 'Zadané rodné číslo nie je správne'
      }

      if (!values.r034a) {
        errors.r034a =
          'Zadajte vlastné príjmy manželky / manžela'
      } else if (!values.r034a.match(numberInputRegexp)) {
        errors.r034a = 'Zadajte príjmy vo formáte 123,45'
      }
    }
  }

  return errors
}

export default Deti
