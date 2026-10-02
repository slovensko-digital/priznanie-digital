import React, { useState } from 'react'
import { FieldArray, Form, useFormikContext } from 'formik'
import classnames from 'classnames'
import { BooleanRadio, FormWrapper, Input } from './FormComponents'
import { ErrorSummary } from './ErrorSummary'
import { BackLink } from './BackLink'
import { Page } from './Page'
import { makeEmptyPotvrdenie } from '../lib/initialValues'
import { formatCurrency, parseInputNumber } from '../lib/utils'
import {
  AMOUNT_FIELDS,
  AmountField,
  Totals,
  itemFromTotals,
  itemLabel,
  totalsFromItems,
  validateItem,
} from '../lib/potvrdenia'
import { PotvrdenieInput, TaxFormUserInput } from '../types/TaxFormUserInput'
import { UserInput } from '../types/UserInput'

interface FieldText {
  label: string
  hint: string
  required: string
}

const FIELD_TEXTS: Record<Exclude<AmountField, 'prijmy'>, FieldText> = {
  socialnePoistne: {
    label: 'Úhrn sociálneho poistného',
    hint: 'Tento údaj nájdete v riadku 02a.',
    required: 'Zadajte úhrn sociálneho poistného',
  },
  zdravotnePoistne: {
    label: 'Úhrn zdravotného poistného',
    hint: 'Tento údaj nájdete v riadku 02b.',
    required: 'Zadajte úhrn zdravotného poistného',
  },
  preddavkyNaDan: {
    label: 'Úhrn preddavkov na daň',
    hint: 'Tento údaj nájdete v riadku 04.',
    required: 'Zadajte úhrn preddavkov na daň',
  },
  danovyBonusNaDieta: {
    label: 'Údaje o daňovom bonuse na dieťa',
    hint: 'Tento údaj nájdete v riadku 13 v časti "Úhrnná suma priznaného a vyplateného daňového bonusu".',
    required: 'Zadajte údaje o daňovom bonuse na dieťa',
  },
}

export interface PotvrdeniaPageConfig {
  /** answer to "Mali ste príjmy…?" */
  flag: 'employed' | 'dohoda'
  list: 'zamestnavatelia' | 'dohody'
  totals: Totals
  /** values saved when the user has no such income */
  emptyValues: Partial<TaxFormUserInput>
  question: string
  prijmy: FieldText
  /** label of an item without a name, e.g. "Dohoda" -> "Dohoda 2" */
  itemName: string
  nameLabel: string
  nameHint?: string
  addButton: string
  saveButton: string
  addAnotherQuestion: string
  addedHeading: (count: number) => string
  atLeastOneError: string
  /** used in data-test attributes, e.g. "dohoda" -> "add-dohoda" */
  testId: string
  addAnotherId: string
}

type Values = Partial<TaxFormUserInput>

interface ItemListProps {
  config: PotvrdeniaPageConfig
  fieldTexts: Record<AmountField, FieldText>
  validateListItem: (item: PotvrdenieInput) => Record<string, string>
  items: PotvrdenieInput[]
  onDone: () => void
}

/**
 * List of confirmations the user can add, change and remove, based on
 * https://design.tax.service.gov.uk/hmrc-design-patterns/add-to-a-list/
 */
const ItemList = ({
  config,
  fieldTexts,
  validateListItem,
  items,
  onDone,
}: ItemListProps) => {
  const { setErrors } = useFormikContext<Values>()
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [isNewItem, setIsNewItem] = useState(false)
  const [editSnapshot, setEditSnapshot] = useState<PotvrdenieInput | null>(null)
  const [addAnother, setAddAnother] = useState<boolean>()
  const [addAnotherError, setAddAnotherError] = useState('')
  const { list, testId, addAnotherId } = config

  const stopEditing = () => {
    setEditingIndex(null)
    setIsNewItem(false)
    setEditSnapshot(null)
    setErrors({})
  }

  return (
    <FieldArray name={list}>
      {({ push, remove, replace }) => {
        const addItem = () => {
          push(makeEmptyPotvrdenie())
          setErrors({})
          setIsNewItem(true)
          setEditingIndex(items.length)
          setAddAnother(undefined)
        }

        if (editingIndex !== null) {
          const fieldName = (field: string) =>
            `${list}[${editingIndex}].${field}` as keyof UserInput

          const save = () => {
            const itemErrors = validateListItem(items[editingIndex])
            if (Object.keys(itemErrors).length === 0) return stopEditing()
            const listErrors: Record<string, string>[] = []
            listErrors[editingIndex] = itemErrors
            setErrors({ [list]: listErrors })
          }

          const cancel = () => {
            if (isNewItem) remove(editingIndex)
            else if (editSnapshot) replace(editingIndex, editSnapshot)
            stopEditing()
          }

          return (
            <>
              <h2 className="govuk-heading-m">
                {itemLabel(items[editingIndex], editingIndex, config.itemName)}
              </h2>
              <p className="govuk-body">
                Hodnoty nájdete na tlačive &ldquo;Potvrdenie o zdaniteľných
                príjmoch fyzickej osoby zo závislej činnosti&rdquo;.
              </p>
              <Input
                name={fieldName('nazov')}
                type="text"
                label={config.nameLabel}
                hint={config.nameHint}
              />
              {AMOUNT_FIELDS.map((field) => (
                <Input
                  key={field}
                  name={fieldName(field)}
                  type="number"
                  label={fieldTexts[field].label}
                  hint={fieldTexts[field].hint}
                />
              ))}
              <div className="govuk-button-group">
                <button
                  type="button"
                  className="govuk-button"
                  onClick={save}
                  data-test={`save-${testId}`}
                >
                  {config.saveButton}
                </button>
                <button
                  type="button"
                  className="govuk-button govuk-button--secondary"
                  onClick={cancel}
                  data-test={`cancel-${testId}`}
                >
                  Zrušiť
                </button>
              </div>
            </>
          )
        }

        const next = () => {
          if (items.length > 0 && addAnother === undefined) {
            return setAddAnotherError('Vyznačte odpoveď')
          }
          onDone()
        }

        return (
          <>
            {items.length === 0 ? (
              <button
                id={list}
                type="button"
                className="govuk-button govuk-button--secondary"
                onClick={addItem}
                data-test={`add-${testId}`}
              >
                {config.addButton}
              </button>
            ) : (
              <>
                <h2 className="govuk-heading-m">
                  {config.addedHeading(items.length)}
                </h2>
                <dl className="govuk-summary-list">
                  {items.map((item, index) => {
                    const label = itemLabel(item, index, config.itemName)
                    return (
                      <div key={item.id} className="govuk-summary-list__row">
                        <dt className="govuk-summary-list__key">
                          {label}
                          <span className="govuk-hint govuk-!-margin-bottom-0">
                            Príjmy:{' '}
                            {formatCurrency(parseInputNumber(item.prijmy) || 0)}
                          </span>
                        </dt>
                        <dd className="govuk-summary-list__actions govuk-!-width-one-third">
                          <button
                            type="button"
                            className="govuk-button btn-secondary"
                            onClick={() => {
                              setIsNewItem(false)
                              setEditSnapshot({ ...item })
                              setEditingIndex(index)
                            }}
                            data-test={`edit-${testId}-${index}`}
                          >
                            Zmeniť
                            <span className="govuk-visually-hidden">
                              {' '}
                              {label}
                            </span>
                          </button>
                          <button
                            type="button"
                            className="govuk-button btn-secondary btn-warning govuk-!-margin-left-2"
                            onClick={() => {
                              remove(index)
                              setAddAnother(undefined)
                              setAddAnotherError('')
                            }}
                            data-test={`remove-${testId}-${index}`}
                          >
                            Odstrániť
                            <span className="govuk-visually-hidden">
                              {' '}
                              {label}
                            </span>
                          </button>
                        </dd>
                      </div>
                    )
                  })}
                </dl>

                <div
                  className={classnames('govuk-form-group', {
                    'govuk-form-group--error': addAnotherError,
                  })}
                >
                  <fieldset className="govuk-fieldset">
                    <legend className="govuk-fieldset__legend govuk-fieldset__legend--m">
                      {config.addAnotherQuestion}
                    </legend>
                    {addAnotherError && (
                      <p className="govuk-error-message" data-test="error">
                        <span className="govuk-visually-hidden">Chyba:</span>{' '}
                        {addAnotherError}
                      </p>
                    )}
                    <div className="govuk-radios govuk-radios--inline">
                      <div className="govuk-radios__item">
                        <input
                          className="govuk-radios__input"
                          id={`${addAnotherId}-yes`}
                          name={addAnotherId}
                          type="radio"
                          checked={false}
                          onChange={addItem}
                        />
                        <label
                          className="govuk-label govuk-radios__label"
                          htmlFor={`${addAnotherId}-yes`}
                        >
                          Áno
                        </label>
                      </div>
                      <div className="govuk-radios__item">
                        <input
                          className="govuk-radios__input"
                          id={`${addAnotherId}-no`}
                          name={addAnotherId}
                          type="radio"
                          checked={addAnother === false}
                          onChange={() => {
                            setAddAnother(false)
                            setAddAnotherError('')
                          }}
                        />
                        <label
                          className="govuk-label govuk-radios__label"
                          htmlFor={`${addAnotherId}-no`}
                        >
                          Nie
                        </label>
                      </div>
                    </div>
                  </fieldset>
                </div>
              </>
            )}

            <button
              data-test="next"
              className="govuk-button"
              type="button"
              onClick={next}
            >
              Pokračovať
            </button>
          </>
        )
      }}
    </FieldArray>
  )
}

/** Page with a yes/no question and a list of confirmations (zamestnanie, dohody) */
export const makePotvrdeniaPage = (config: PotvrdeniaPageConfig) => {
  const fieldTexts = { prijmy: config.prijmy, ...FIELD_TEXTS }
  const requiredMessages = Object.fromEntries(
    AMOUNT_FIELDS.map((field) => [field, fieldTexts[field].required]),
  ) as Record<AmountField, string>
  const validateListItem = (item: PotvrdenieInput) =>
    validateItem(item, requiredMessages)

  const validate = (values: Values) => {
    const errors: Record<string, string> = {}
    if (values[config.flag] === undefined) {
      errors[config.flag] = 'Vyznačte odpoveď'
    }
    if (values[config.flag]) {
      const items = values[config.list] ?? []
      const invalid = items.findIndex(
        (item) => Object.keys(validateListItem(item)).length > 0,
      )
      if (items.length === 0) {
        errors[config.list] = config.atLeastOneError
      } else if (invalid !== -1) {
        errors[config.list] = `Doplňte údaje: ${itemLabel(
          items[invalid],
          invalid,
          config.itemName,
        )}`
      }
    }
    return errors
  }

  const withMigratedItems = (input: Values): Values => {
    if (!input[config.flag] || input[config.list]?.length) return input
    const item = itemFromTotals(input, config.totals, makeEmptyPotvrdenie())
    return item ? { ...input, [config.list]: [item] } : input
  }

  const PotvrdeniaPage: Page<Values> = ({
    setTaxFormUserInput,
    taxFormUserInput,
    router,
    previousRoute,
    nextRoute,
  }) => (
    <>
      <BackLink href={previousRoute} />
      <FormWrapper<Values>
        initialValues={withMigratedItems(taxFormUserInput)}
        validate={validate}
        onSubmit={(values) => {
          setTaxFormUserInput(
            values[config.flag]
              ? {
                  ...values,
                  ...totalsFromItems(values[config.list] ?? [], config.totals),
                }
              : { ...config.emptyValues, [config.flag]: false },
          )
          router.push(nextRoute)
        }}
      >
        {({ values, errors, submitForm }) => (
          <Form className="form" noValidate>
            <ErrorSummary<Values> errors={errors} />
            <BooleanRadio title={config.question} name={config.flag} />
            {values[config.flag] ? (
              <ItemList
                config={config}
                fieldTexts={fieldTexts}
                validateListItem={validateListItem}
                items={values[config.list] ?? []}
                onDone={submitForm}
              />
            ) : (
              <button data-test="next" className="govuk-button" type="submit">
                Pokračovať
              </button>
            )}
          </Form>
        )}
      </FormWrapper>
    </>
  )

  return { PotvrdeniaPage, validate, validateItem: validateListItem }
}
