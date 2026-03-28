import React, { useState } from 'react'
import { FieldArray, Form } from 'formik'
import { FormWrapper, Input, BooleanRadio } from '../components/FormComponents'
import { DohodaUserInput, FormErrors } from '../types/PageUserInputs'
import { numberInputRegexp, parseInputNumber } from '../lib/utils'
import { ErrorSummary } from '../components/ErrorSummary'
import { Page } from '../components/Page'
import {
  dohodaUserInputInitialValues,
  makeEmptyDohoda,
} from '../lib/initialValues'
import { BackLink } from '../components/BackLink'
import { TAX_YEAR } from '../lib/calculation'
import { DohodaItemInput } from '../types/TaxFormUserInput'
import { UserInput } from '../types/UserInput'

const sumField = (
  items: DohodaItemInput[],
  field: keyof Omit<DohodaItemInput, 'id' | 'nazov'>,
): string => {
  const total = items.reduce((acc, d) => {
    const val = parseInputNumber(d[field] as string)
    return acc + (isNaN(val) ? 0 : val)
  }, 0)
  return total === 0 ? '' : total.toFixed(2).replace('.', ',')
}

export const validateItem = (d: DohodaItemInput): Record<string, string> => {
  const errors: Record<string, string> = {}
  if (!d.prijmy || !d.prijmy.match(numberInputRegexp))
    errors.prijmy = d.prijmy
      ? 'Zadajte sumu vo formáte 123,45'
      : 'Zadajte úhrn príjmov z dohody'
  if (!d.socialnePoistne || !d.socialnePoistne.match(numberInputRegexp))
    errors.socialnePoistne = d.socialnePoistne
      ? 'Zadajte sumu vo formáte 123,45'
      : 'Zadajte úhrn sociálneho poistného'
  if (!d.zdravotnePoistne || !d.zdravotnePoistne.match(numberInputRegexp))
    errors.zdravotnePoistne = d.zdravotnePoistne
      ? 'Zadajte sumu vo formáte 123,45'
      : 'Zadajte úhrn zdravotného poistného'
  if (!d.preddavkyNaDan || !d.preddavkyNaDan.match(numberInputRegexp))
    errors.preddavkyNaDan = d.preddavkyNaDan
      ? 'Zadajte sumu vo formáte 123,45'
      : 'Zadajte úhrn preddavkov na daň'
  if (!d.danovyBonusNaDieta || !d.danovyBonusNaDieta.match(numberInputRegexp))
    errors.danovyBonusNaDieta = d.danovyBonusNaDieta
      ? 'Zadajte sumu vo formáte 123,45'
      : 'Zadajte údaje o daňovom bonuse na dieťa'
  return errors
}

const Dohoda: Page<DohodaUserInput> = ({
  setTaxFormUserInput,
  taxFormUserInput,
  router,
  previousRoute,
  nextRoute,
}) => {
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [isNewEntry, setIsNewEntry] = useState(false)
  const [itemErrors, setItemErrors] = useState<Record<string, string>>({})
  const [addAnother, setAddAnother] = useState<boolean | undefined>(undefined)
  const [addAnotherError, setAddAnotherError] = useState('')

  const initialValues: DohodaUserInput = (() => {
    const input = taxFormUserInput as DohodaUserInput
    if (
      input.dohoda &&
      (!input.dohody || input.dohody.length === 0) &&
      input.uhrnPrijmovZoVsetkychDohod
    ) {
      return {
        ...input,
        dohody: [
          {
            ...makeEmptyDohoda(),
            prijmy: input.uhrnPrijmovZoVsetkychDohod ?? '',
            socialnePoistne:
              input.uhrnPovinnehoPoistnehoNaSocialnePoistenieDohody ?? '',
            zdravotnePoistne:
              input.uhrnPovinnehoPoistnehoNaZdravotnePoistenieDohody ?? '',
            preddavkyNaDan: input.uhrnPreddavkovNaDanDohody ?? '',
            danovyBonusNaDieta: input.udajeODanovomBonuseNaDietaDohody ?? '',
          },
        ],
      }
    }
    return input
  })()

  return (
    <>
      <BackLink href={previousRoute} />
      <FormWrapper<DohodaUserInput>
        initialValues={initialValues}
        validate={validate}
        onSubmit={(values) => {
          if (!values.dohoda) {
            setTaxFormUserInput({
              ...dohodaUserInputInitialValues,
              dohoda: false,
            })
            router.push(nextRoute)
            return
          }
          const dohody = values.dohody ?? []
          setTaxFormUserInput({
            ...values,
            uhrnPrijmovZoVsetkychDohod: sumField(dohody, 'prijmy'),
            uhrnPovinnehoPoistnehoNaSocialnePoistenieDohody: sumField(
              dohody,
              'socialnePoistne',
            ),
            uhrnPovinnehoPoistnehoNaZdravotnePoistenieDohody: sumField(
              dohody,
              'zdravotnePoistne',
            ),
            uhrnPreddavkovNaDanDohody: sumField(dohody, 'preddavkyNaDan'),
            udajeODanovomBonuseNaDietaDohody: sumField(
              dohody,
              'danovyBonusNaDieta',
            ),
          })
          router.push(nextRoute)
        }}
      >
        {({ values, errors, submitForm }) => (
          <Form className="form" noValidate>
            <ErrorSummary<DohodaUserInput> errors={errors} />
            <BooleanRadio
              title={`Mali ste v roku ${TAX_YEAR} príjmy z dohôd v SR?`}
              name="dohoda"
            />

            {values.dohoda && (
              <FieldArray name="dohody">
                {({ push, remove }) => {
                  const dohody = values.dohody ?? []

                  if (editingIndex !== null) {
                    const d = dohody[editingIndex]
                    const label =
                      d?.nazov?.trim() || `Dohoda ${editingIndex + 1}`
                    return (
                      <div>
                        <h2 className="govuk-heading-m">{label}</h2>
                        <p className="govuk-body">
                          Hodnoty nájdete na tlačive &ldquo;Potvrdenie o
                          zdaniteľných príjmoch fyzickej osoby zo závislej
                          činnosti&rdquo;.
                        </p>

                        {Object.keys(itemErrors).length > 0 && (
                          <div
                            className="govuk-error-summary"
                            data-module="govuk-error-summary"
                          >
                            <div role="alert">
                              <h2 className="govuk-error-summary__title">
                                Skontrolujte zadané hodnoty
                              </h2>
                              <ul className="govuk-list govuk-error-summary__list">
                                {Object.values(itemErrors).map((msg) => (
                                  <li key={msg}>{msg}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        )}

                        <Input
                          name={`dohody[${editingIndex}].nazov` as keyof UserInput}
                          type="text"
                          label="Názov dohody (nepovinné)"
                          hint='Napríklad "Dohoda o vykonaní práce – ABC s.r.o."'
                        />
                        <Input
                          name={`dohody[${editingIndex}].prijmy` as keyof UserInput}
                          type="number"
                          label="Úhrn príjmov plynúcich na základe dohody"
                          hint='Na tlačive "Potvrdenie o zdaniteľných príjmoch" nájdete tento údaj v riadku 01a.'
                        />
                        <Input
                          name={
                            `dohody[${editingIndex}].socialnePoistne` as keyof UserInput
                          }
                          type="number"
                          label="Úhrn sociálneho poistného"
                          hint="Tento údaj nájdete v riadku 02a."
                        />
                        <Input
                          name={
                            `dohody[${editingIndex}].zdravotnePoistne` as keyof UserInput
                          }
                          type="number"
                          label="Úhrn zdravotného poistného"
                          hint="Tento údaj nájdete v riadku 02b."
                        />
                        <Input
                          name={`dohody[${editingIndex}].preddavkyNaDan` as keyof UserInput}
                          type="number"
                          label="Úhrn preddavkov na daň"
                          hint="Tento údaj nájdete v riadku 04."
                        />
                        <Input
                          name={
                            `dohody[${editingIndex}].danovyBonusNaDieta` as keyof UserInput
                          }
                          type="number"
                          label="Údaje o daňovom bonuse na dieťa"
                          hint='Tento údaj nájdete v riadku 13 v časti "Úhrnná suma priznaného a vyplateného daňového bonusu".'
                        />

                        <button
                          type="button"
                          className="govuk-button"
                          onClick={() => {
                            const errs = validateItem(
                              (values.dohody ?? [])[editingIndex],
                            )
                            if (Object.keys(errs).length > 0) {
                              setItemErrors(errs)
                              return
                            }
                            setEditingIndex(null)
                            setIsNewEntry(false)
                            setItemErrors({})
                          }}
                          data-test="save-dohoda"
                        >
                          Uložiť dohodu
                        </button>
                        <button
                          type="button"
                          className="govuk-button govuk-button--secondary"
                          onClick={() => {
                            if (isNewEntry) remove(editingIndex)
                            setEditingIndex(null)
                            setIsNewEntry(false)
                            setItemErrors({})
                          }}
                          data-test="cancel-dohoda"
                        >
                          Zrušiť
                        </button>
                      </div>
                    )
                  }

                  return (
                    <>
                      {dohody.length > 0 ? (
                        <>
                          <h2 className="govuk-heading-m">
                            Pridali ste {dohody.length}{' '}
                            {dohody.length === 1 ? 'dohodu' : 'dohôd'}
                          </h2>

                          <dl className="govuk-summary-list">
                            {dohody.map((d, index) => {
                              const label =
                                d.nazov?.trim() || `Dohoda ${index + 1}`
                              return (
                                <div
                                  key={d.id}
                                  className="govuk-summary-list__row"
                                >
                                  <dt className="govuk-summary-list__key">
                                    {label}
                                  </dt>
                                  <dd className="govuk-summary-list__actions">
                                    <ul className="govuk-summary-list__actions-list">
                                      <li className="govuk-summary-list__actions-list-item">
                                        <button
                                          type="button"
                                          className="govuk-link"
                                          onClick={() => {
                                            setIsNewEntry(false)
                                            setEditingIndex(index)
                                          }}
                                          data-test={`edit-dohoda-${index}`}
                                        >
                                          Zmeniť
                                          <span className="govuk-visually-hidden">
                                            {' '}
                                            {label}
                                          </span>
                                        </button>
                                      </li>
                                      <li className="govuk-summary-list__actions-list-item">
                                        <button
                                          type="button"
                                          className="govuk-link"
                                          onClick={() => {
                                            remove(index)
                                            setAddAnother(undefined)
                                            setAddAnotherError('')
                                          }}
                                          data-test={`remove-dohoda-${index}`}
                                        >
                                          Odstrániť
                                          <span className="govuk-visually-hidden">
                                            {' '}
                                            {label}
                                          </span>
                                        </button>
                                      </li>
                                    </ul>
                                  </dd>
                                </div>
                              )
                            })}
                          </dl>

                          <div
                            className={`govuk-form-group${addAnotherError ? ' govuk-form-group--error' : ''}`}
                          >
                            <fieldset className="govuk-fieldset">
                              <legend className="govuk-fieldset__legend govuk-fieldset__legend--m">
                                <strong>
                                  Potrebujete pridať ďalšiu dohodu?
                                </strong>
                              </legend>
                              {addAnotherError && (
                                <p className="govuk-error-message">
                                  <span className="govuk-visually-hidden">
                                    Chyba:
                                  </span>{' '}
                                  {addAnotherError}
                                </p>
                              )}
                              <div className="govuk-radios govuk-radios--inline">
                                <div className="govuk-radios__item">
                                  <input
                                    className="govuk-radios__input"
                                    id="addAnotherDohoda-yes"
                                    type="radio"
                                    checked={addAnother === true}
                                    onChange={() => {
                                      setAddAnother(true)
                                      setAddAnotherError('')
                                    }}
                                  />
                                  <label
                                    className="govuk-label govuk-radios__label"
                                    htmlFor="addAnotherDohoda-yes"
                                  >
                                    Áno
                                  </label>
                                </div>
                                <div className="govuk-radios__item">
                                  <input
                                    className="govuk-radios__input"
                                    id="addAnotherDohoda-no"
                                    type="radio"
                                    checked={addAnother === false}
                                    onChange={() => {
                                      setAddAnother(false)
                                      setAddAnotherError('')
                                    }}
                                  />
                                  <label
                                    className="govuk-label govuk-radios__label"
                                    htmlFor="addAnotherDohoda-no"
                                  >
                                    Nie
                                  </label>
                                </div>
                              </div>
                            </fieldset>
                          </div>
                        </>
                      ) : (
                        <button
                          type="button"
                          className="govuk-button govuk-button--secondary"
                          onClick={() => {
                            push(makeEmptyDohoda())
                            setIsNewEntry(true)
                            setEditingIndex(0)
                          }}
                          data-test="add-dohoda"
                        >
                          Pridať dohodu
                        </button>
                      )}

                      <button
                        data-test="next"
                        className="govuk-button"
                        type="button"
                        onClick={() => {
                          if (dohody.length > 0 && addAnother === undefined) {
                            setAddAnotherError('Vyznačte odpoveď')
                            return
                          }
                          if (addAnother === true) {
                            push(makeEmptyDohoda())
                            setIsNewEntry(true)
                            setEditingIndex(dohody.length)
                            setAddAnother(undefined)
                            return
                          }
                          submitForm()
                        }}
                      >
                        Pokračovať
                      </button>
                    </>
                  )
                }}
              </FieldArray>
            )}

            {!values.dohoda && values.dohoda !== undefined && (
              <button data-test="next" className="govuk-button" type="submit">
                Pokračovať
              </button>
            )}

            {typeof values.dohoda === 'undefined' && (
              <button data-test="next" className="govuk-button" type="submit">
                Pokračovať
              </button>
            )}
          </Form>
        )}
      </FormWrapper>
    </>
  )
}

export const validate = (values: DohodaUserInput) => {
  const errors: Partial<FormErrors<DohodaUserInput>> = {}

  if (typeof values.dohoda === 'undefined') {
    errors.dohoda = 'Vyznačte odpoveď'
  }

  if (values.dohoda) {
    const dohody = values.dohody ?? []
    if (dohody.length === 0) {
      errors.dohody = 'Pridajte aspoň jednu dohodu'
    }
  }

  return errors
}

export default Dohoda