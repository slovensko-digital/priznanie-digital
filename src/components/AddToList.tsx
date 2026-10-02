import React, { ReactNode, useState } from 'react'
import {
  FieldArray,
  FormikErrors,
  FormikValues,
  useFormikContext,
} from 'formik'
import classnames from 'classnames'
import { Input } from './FormComponents'
import {
  AmountField,
  ListItem,
  itemLabel,
  validateListItem,
} from '../lib/addToList'
import { UserInput } from '../types/UserInput'

export interface AddToListTexts {
  /** fallback label of an item without a name, e.g. "Zamestnávateľ" -> "Zamestnávateľ 2" */
  itemName: string
  intro: ReactNode
  nameLabel: string
  nameHint?: string
  addButton: string
  saveButton: string
  addedHeading: (count: number) => string
  addAnotherQuestion: string
}

interface Props<Item extends ListItem> {
  name: 'zamestnavatelia' | 'dohody'
  items: Item[]
  fields: AmountField<Item>[]
  makeEmpty: () => Item
  texts: AddToListTexts
  /** used in data-test attributes, e.g. "zamestnavatel" -> "add-zamestnavatel" */
  testId: string
  /** id prefix of the "add another" radios */
  addAnotherId: string
  /** overview of an item shown under its name in the list */
  summary: (item: Item) => string
  onDone: () => void
}

/**
 * List of items the user can add, change and remove, based on
 * https://design.tax.service.gov.uk/hmrc-design-patterns/add-to-a-list/
 */
export const AddToList = <Item extends ListItem>({
  name,
  items,
  fields,
  makeEmpty,
  texts,
  testId,
  addAnotherId,
  summary,
  onDone,
}: Props<Item>) => {
  const { setErrors } = useFormikContext<FormikValues>()
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [isNewEntry, setIsNewEntry] = useState(false)
  const [editSnapshot, setEditSnapshot] = useState<Item | null>(null)
  const [addAnother, setAddAnother] = useState<boolean | undefined>(undefined)
  const [addAnotherError, setAddAnotherError] = useState('')

  const stopEditing = () => {
    setEditingIndex(null)
    setIsNewEntry(false)
    setEditSnapshot(null)
    setErrors({})
  }

  return (
    <FieldArray name={name}>
      {({ push, remove, replace }) => {
        const startNew = () => {
          push(makeEmpty())
          setErrors({})
          setIsNewEntry(true)
          setEditingIndex(items.length)
          setAddAnother(undefined)
        }

        if (editingIndex !== null) {
          const fieldName = (field: string) =>
            `${name}[${editingIndex}].${field}` as keyof UserInput

          const save = () => {
            const itemErrors = validateListItem(items[editingIndex], fields)
            if (Object.keys(itemErrors).length > 0) {
              const listErrors: FormikErrors<Item>[] = []
              listErrors[editingIndex] = itemErrors as FormikErrors<Item>
              setErrors({ [name]: listErrors })
              return
            }
            stopEditing()
          }

          const cancel = () => {
            if (isNewEntry) remove(editingIndex)
            else if (editSnapshot) replace(editingIndex, editSnapshot)
            stopEditing()
          }

          return (
            <>
              <h2 className="govuk-heading-m">
                {itemLabel(items[editingIndex], editingIndex, texts.itemName)}
              </h2>
              <p className="govuk-body">{texts.intro}</p>
              <Input
                name={fieldName('nazov')}
                type="text"
                label={texts.nameLabel}
                hint={texts.nameHint}
              />
              {fields.map((field) => (
                <Input
                  key={field.name}
                  name={fieldName(field.name)}
                  type="number"
                  label={field.label}
                  hint={field.hint}
                />
              ))}
              <div className="govuk-button-group">
                <button
                  type="button"
                  className="govuk-button"
                  onClick={save}
                  data-test={`save-${testId}`}
                >
                  {texts.saveButton}
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
            setAddAnotherError('Vyznačte odpoveď')
            return
          }
          onDone()
        }

        return (
          <>
            {items.length > 0 ? (
              <>
                <h2 className="govuk-heading-m">
                  {texts.addedHeading(items.length)}
                </h2>
                <dl className="govuk-summary-list">
                  {items.map((item, index) => {
                    const label = itemLabel(item, index, texts.itemName)
                    const action = (
                      text: string,
                      action: string,
                      className: string,
                      onClick: () => void,
                    ) => (
                      <button
                        type="button"
                        className={classnames(
                          'govuk-button btn-secondary',
                          className,
                        )}
                        onClick={onClick}
                        data-test={`${action}-${testId}-${index}`}
                      >
                        {text}
                        <span className="govuk-visually-hidden"> {label}</span>
                      </button>
                    )
                    return (
                      <div key={item.id} className="govuk-summary-list__row">
                        <dt className="govuk-summary-list__key">
                          {label}
                          <span className="govuk-hint govuk-!-margin-bottom-0">
                            {summary(item)}
                          </span>
                        </dt>
                        <dd className="govuk-summary-list__actions govuk-!-width-one-third">
                          {action('Zmeniť', 'edit', '', () => {
                            setIsNewEntry(false)
                            setEditSnapshot({ ...item })
                            setEditingIndex(index)
                          })}
                          {action(
                            'Odstrániť',
                            'remove',
                            'btn-warning govuk-!-margin-left-2',
                            () => {
                              remove(index)
                              setAddAnother(undefined)
                              setAddAnotherError('')
                            },
                          )}
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
                      {texts.addAnotherQuestion}
                    </legend>
                    {addAnotherError && (
                      <p className="govuk-error-message" data-test="error">
                        <span className="govuk-visually-hidden">Chyba:</span>{' '}
                        {addAnotherError}
                      </p>
                    )}
                    <div className="govuk-radios govuk-radios--inline">
                      {[
                        { value: true, id: 'yes', text: 'Áno' },
                        { value: false, id: 'no', text: 'Nie' },
                      ].map((option) => (
                        <div key={option.id} className="govuk-radios__item">
                          <input
                            className="govuk-radios__input"
                            id={`${addAnotherId}-${option.id}`}
                            name={addAnotherId}
                            type="radio"
                            checked={addAnother === option.value}
                            onChange={() => {
                              setAddAnotherError('')
                              if (option.value) startNew()
                              else setAddAnother(false)
                            }}
                          />
                          <label
                            className="govuk-label govuk-radios__label"
                            htmlFor={`${addAnotherId}-${option.id}`}
                          >
                            {option.text}
                          </label>
                        </div>
                      ))}
                    </div>
                  </fieldset>
                </div>
              </>
            ) : (
              <button
                id={name}
                type="button"
                className="govuk-button govuk-button--secondary"
                onClick={startNew}
                data-test={`add-${testId}`}
              >
                {texts.addButton}
              </button>
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
