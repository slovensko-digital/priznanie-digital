import React, { useState } from 'react'
import { FieldArray, Form } from 'formik'
import { FormWrapper, Input, BooleanRadio } from '../components/FormComponents'
import { EmployedUserInput, FormErrors } from '../types/PageUserInputs'
import { numberInputRegexp, parseInputNumber } from '../lib/utils'
import { ErrorSummary } from '../components/ErrorSummary'
import { Page } from '../components/Page'
import {
  employmentUserInputInitialValues,
  makeEmptyZamestnavatel,
} from '../lib/initialValues'
import { BackLink } from '../components/BackLink'
import { TAX_YEAR } from '../lib/calculation'
import { ZamestnavatelInput } from '../types/TaxFormUserInput'
import { UserInput } from '../types/UserInput'

const sumField = (
  items: ZamestnavatelInput[],
  field: keyof Omit<ZamestnavatelInput, 'id' | 'nazov'>,
): string => {
  const total = items.reduce((acc, z) => {
    const val = parseInputNumber(z[field] as string)
    return acc + (isNaN(val) ? 0 : val)
  }, 0)
  return total === 0 ? '' : total.toFixed(2).replace('.', ',')
}

export const validateItem = (z: ZamestnavatelInput): Record<string, string> => {
  const errors: Record<string, string> = {}
  if (!z.prijmy || !z.prijmy.match(numberInputRegexp))
    errors.prijmy = z.prijmy
      ? 'Zadajte sumu vo formáte 123,45'
      : 'Zadajte úhrn vyplatených zdaniteľných príjmov'
  if (!z.socialnePoistne || !z.socialnePoistne.match(numberInputRegexp))
    errors.socialnePoistne = z.socialnePoistne
      ? 'Zadajte sumu vo formáte 123,45'
      : 'Zadajte úhrn sociálneho poistného'
  if (!z.zdravotnePoistne || !z.zdravotnePoistne.match(numberInputRegexp))
    errors.zdravotnePoistne = z.zdravotnePoistne
      ? 'Zadajte sumu vo formáte 123,45'
      : 'Zadajte úhrn zdravotného poistného'
  if (!z.preddavkyNaDan || !z.preddavkyNaDan.match(numberInputRegexp))
    errors.preddavkyNaDan = z.preddavkyNaDan
      ? 'Zadajte sumu vo formáte 123,45'
      : 'Zadajte úhrn preddavkov na daň'
  if (!z.danovyBonusNaDieta || !z.danovyBonusNaDieta.match(numberInputRegexp))
    errors.danovyBonusNaDieta = z.danovyBonusNaDieta
      ? 'Zadajte sumu vo formáte 123,45'
      : 'Zadajte údaje o daňovom bonuse na dieťa'
  return errors
}

const Zamestnanie: Page<EmployedUserInput> = ({
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

  const initialValues: EmployedUserInput = (() => {
    const input = taxFormUserInput as EmployedUserInput
    if (
      input.employed &&
      (!input.zamestnavatelia || input.zamestnavatelia.length === 0) &&
      input.uhrnPrijmovOdVsetkychZamestnavatelov
    ) {
      return {
        ...input,
        zamestnavatelia: [
          {
            ...makeEmptyZamestnavatel(),
            prijmy: input.uhrnPrijmovOdVsetkychZamestnavatelov ?? '',
            socialnePoistne:
              input.uhrnPovinnehoPoistnehoNaSocialnePoistenie ?? '',
            zdravotnePoistne:
              input.uhrnPovinnehoPoistnehoNaZdravotnePoistenie ?? '',
            preddavkyNaDan: input.uhrnPreddavkovNaDan ?? '',
            danovyBonusNaDieta: input.udajeODanovomBonuseNaDieta ?? '',
          },
        ],
      }
    }
    return input
  })()

  return (
    <>
      <BackLink href={previousRoute} />
      <FormWrapper<EmployedUserInput>
        initialValues={initialValues}
        validate={validate}
        onSubmit={(values) => {
          if (!values.employed) {
            setTaxFormUserInput({
              ...employmentUserInputInitialValues,
              employed: false,
            })
            router.push(nextRoute)
            return
          }
          const zams = values.zamestnavatelia ?? []
          setTaxFormUserInput({
            ...values,
            uhrnPrijmovOdVsetkychZamestnavatelov: sumField(zams, 'prijmy'),
            uhrnPovinnehoPoistnehoNaSocialnePoistenie: sumField(
              zams,
              'socialnePoistne',
            ),
            uhrnPovinnehoPoistnehoNaZdravotnePoistenie: sumField(
              zams,
              'zdravotnePoistne',
            ),
            uhrnPreddavkovNaDan: sumField(zams, 'preddavkyNaDan'),
            udajeODanovomBonuseNaDieta: sumField(zams, 'danovyBonusNaDieta'),
          })
          router.push(nextRoute)
        }}
      >
        {({ values, errors, submitForm }) => (
          <Form className="form" noValidate>
            <ErrorSummary<EmployedUserInput> errors={errors} />
            <BooleanRadio
              title={`Mali ste v roku ${TAX_YEAR} príjmy zo zamestnania v SR?`}
              name="employed"
            />

            {values.employed && (
              <FieldArray name="zamestnavatelia">
                {({ push, remove }) => {
                  const zams = values.zamestnavatelia ?? []

                  if (editingIndex !== null) {
                    const z = zams[editingIndex]
                    const label =
                      z?.nazov?.trim() || `Zamestnávateľ ${editingIndex + 1}`
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
                          name={
                            `zamestnavatelia[${editingIndex}].nazov` as keyof UserInput
                          }
                          type="text"
                          label="Názov zamestnávateľa (nepovinné)"
                        />
                        <Input
                          name={
                            `zamestnavatelia[${editingIndex}].prijmy` as keyof UserInput
                          }
                          type="number"
                          label="Úhrn vyplatených zdaniteľných príjmov"
                          hint="Tento údaj nájdete v riadku 01."
                        />
                        <Input
                          name={
                            `zamestnavatelia[${editingIndex}].socialnePoistne` as keyof UserInput
                          }
                          type="number"
                          label="Úhrn sociálneho poistného"
                          hint="Tento údaj nájdete v riadku 02a."
                        />
                        <Input
                          name={
                            `zamestnavatelia[${editingIndex}].zdravotnePoistne` as keyof UserInput
                          }
                          type="number"
                          label="Úhrn zdravotného poistného"
                          hint="Tento údaj nájdete v riadku 02b."
                        />
                        <Input
                          name={
                            `zamestnavatelia[${editingIndex}].preddavkyNaDan` as keyof UserInput
                          }
                          type="number"
                          label="Úhrn preddavkov na daň"
                          hint="Tento údaj nájdete v riadku 04."
                        />
                        <Input
                          name={
                            `zamestnavatelia[${editingIndex}].danovyBonusNaDieta` as keyof UserInput
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
                              (values.zamestnavatelia ?? [])[editingIndex],
                            )
                            if (Object.keys(errs).length > 0) {
                              setItemErrors(errs)
                              return
                            }
                            setEditingIndex(null)
                            setIsNewEntry(false)
                            setItemErrors({})
                          }}
                          data-test="save-zamestnavatel"
                        >
                          Uložiť zamestnávateľa
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
                          data-test="cancel-zamestnavatel"
                        >
                          Zrušiť
                        </button>
                      </div>
                    )
                  }

                  return (
                    <>
                      {zams.length > 0 ? (
                        <>
                          <h2 className="govuk-heading-m">
                            Pridali ste {zams.length}{' '}
                            {zams.length === 1
                              ? 'zamestnávateľa'
                              : 'zamestnávateľov'}
                          </h2>

                          <dl className="govuk-summary-list">
                            {zams.map((z, index) => {
                              const label =
                                z.nazov?.trim() || `Zamestnávateľ ${index + 1}`
                              return (
                                <div
                                  key={z.id}
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
                                          data-test={`edit-zamestnavatel-${index}`}
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
                                          data-test={`remove-zamestnavatel-${index}`}
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
                                  Potrebujete pridať ďalšieho zamestnávateľa?
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
                                    id="addAnother-yes"
                                    type="radio"
                                    checked={addAnother === true}
                                    onChange={() => {
                                      setAddAnother(true)
                                      setAddAnotherError('')
                                    }}
                                  />
                                  <label
                                    className="govuk-label govuk-radios__label"
                                    htmlFor="addAnother-yes"
                                  >
                                    Áno
                                  </label>
                                </div>
                                <div className="govuk-radios__item">
                                  <input
                                    className="govuk-radios__input"
                                    id="addAnother-no"
                                    type="radio"
                                    checked={addAnother === false}
                                    onChange={() => {
                                      setAddAnother(false)
                                      setAddAnotherError('')
                                    }}
                                  />
                                  <label
                                    className="govuk-label govuk-radios__label"
                                    htmlFor="addAnother-no"
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
                            push(makeEmptyZamestnavatel())
                            setIsNewEntry(true)
                            setEditingIndex(0)
                          }}
                          data-test="add-zamestnavatel"
                        >
                          Pridať zamestnávateľa
                        </button>
                      )}

                      <button
                        data-test="next"
                        className="govuk-button"
                        type="button"
                        onClick={() => {
                          if (zams.length > 0 && addAnother === undefined) {
                            setAddAnotherError('Vyznačte odpoveď')
                            return
                          }
                          if (addAnother === true) {
                            push(makeEmptyZamestnavatel())
                            setIsNewEntry(true)
                            setEditingIndex(zams.length)
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

            {!values.employed && values.employed !== undefined && (
              <button data-test="next" className="govuk-button" type="submit">
                Pokračovať
              </button>
            )}

            {typeof values.employed === 'undefined' && (
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

export const validate = (values: EmployedUserInput) => {
  const errors: Partial<FormErrors<EmployedUserInput>> = {}

  if (typeof values.employed === 'undefined') {
    errors.employed = 'Vyznačte odpoveď'
  }

  if (values.employed) {
    const zams = values.zamestnavatelia ?? []
    if (zams.length === 0) {
      errors.zamestnavatelia = 'Pridajte aspoň jedného zamestnávateľa'
    }
  }

  return errors
}

export default Zamestnanie
