import React from 'react'
import { Form } from 'formik'
import { FormWrapper, BooleanRadio } from '../components/FormComponents'
import { EmployedUserInput, FormErrors } from '../types/PageUserInputs'
import { ErrorSummary } from '../components/ErrorSummary'
import { Page } from '../components/Page'
import {
  employmentUserInputInitialValues,
  makeEmptyZamestnavatel,
} from '../lib/initialValues'
import { BackLink } from '../components/BackLink'
import { TAX_YEAR } from '../lib/calculation'
import { ZamestnavatelInput } from '../types/TaxFormUserInput'
import { AddToList, AddToListTexts } from '../components/AddToList'
import {
  AmountField,
  incomeItemSummary,
  itemFromTotals,
  itemLabel,
  totalsFromItems,
  validateListItem,
} from '../lib/addToList'

const fields: AmountField<ZamestnavatelInput>[] = [
  {
    name: 'prijmy',
    total: 'uhrnPrijmovOdVsetkychZamestnavatelov',
    label: 'Úhrn vyplatených zdaniteľných príjmov',
    hint: 'Tento údaj nájdete v riadku 01.',
    requiredMessage: 'Zadajte úhrn vyplatených zdaniteľných príjmov',
  },
  {
    name: 'socialnePoistne',
    total: 'uhrnPovinnehoPoistnehoNaSocialnePoistenie',
    label: 'Úhrn sociálneho poistného',
    hint: 'Tento údaj nájdete v riadku 02a.',
    requiredMessage: 'Zadajte úhrn sociálneho poistného',
  },
  {
    name: 'zdravotnePoistne',
    total: 'uhrnPovinnehoPoistnehoNaZdravotnePoistenie',
    label: 'Úhrn zdravotného poistného',
    hint: 'Tento údaj nájdete v riadku 02b.',
    requiredMessage: 'Zadajte úhrn zdravotného poistného',
  },
  {
    name: 'preddavkyNaDan',
    total: 'uhrnPreddavkovNaDan',
    label: 'Úhrn preddavkov na daň',
    hint: 'Tento údaj nájdete v riadku 04.',
    requiredMessage: 'Zadajte úhrn preddavkov na daň',
  },
  {
    name: 'danovyBonusNaDieta',
    total: 'udajeODanovomBonuseNaDieta',
    label: 'Údaje o daňovom bonuse na dieťa',
    hint: 'Tento údaj nájdete v riadku 13 v časti "Úhrnná suma priznaného a vyplateného daňového bonusu".',
    requiredMessage: 'Zadajte údaje o daňovom bonuse na dieťa',
  },
]

const texts: AddToListTexts = {
  itemName: 'Zamestnávateľ',
  intro: (
    <>
      Hodnoty nájdete na tlačive &ldquo;Potvrdenie o zdaniteľných príjmoch
      fyzickej osoby zo závislej činnosti&rdquo;.
    </>
  ),
  nameLabel: 'Názov zamestnávateľa (nepovinné)',
  addButton: 'Pridať zamestnávateľa',
  saveButton: 'Uložiť zamestnávateľa',
  addedHeading: (count) =>
    `Pridali ste ${count} ${count === 1 ? 'zamestnávateľa' : 'zamestnávateľov'}`,
  addAnotherQuestion: 'Potrebujete pridať ďalšieho zamestnávateľa?',
}

export const validateItem = (zamestnavatel: ZamestnavatelInput) =>
  validateListItem(zamestnavatel, fields)

const withMigratedItems = (input: EmployedUserInput): EmployedUserInput => {
  if (!input.employed || input.zamestnavatelia?.length) return input
  const item = itemFromTotals(input, fields, makeEmptyZamestnavatel)
  return item ? { ...input, zamestnavatelia: [item] } : input
}

const Zamestnanie: Page<EmployedUserInput> = ({
  setTaxFormUserInput,
  taxFormUserInput,
  router,
  previousRoute,
  nextRoute,
}) => (
  <>
    <BackLink href={previousRoute} />
    <FormWrapper<EmployedUserInput>
      initialValues={withMigratedItems(taxFormUserInput)}
      validate={validate}
      onSubmit={(values) => {
        setTaxFormUserInput(
          values.employed
            ? {
                ...values,
                ...totalsFromItems(values.zamestnavatelia ?? [], fields),
              }
            : { ...employmentUserInputInitialValues, employed: false },
        )
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
          {values.employed ? (
            <AddToList<ZamestnavatelInput>
              name="zamestnavatelia"
              items={values.zamestnavatelia ?? []}
              fields={fields}
              makeEmpty={makeEmptyZamestnavatel}
              texts={texts}
              testId="zamestnavatel"
              addAnotherId="addAnother"
              summary={incomeItemSummary}
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

export const validate = (values: EmployedUserInput) => {
  const errors: Partial<FormErrors<EmployedUserInput>> = {}

  if (typeof values.employed === 'undefined') {
    errors.employed = 'Vyznačte odpoveď'
  }

  if (values.employed) {
    const zamestnavatelia = values.zamestnavatelia ?? []
    const invalidIndex = zamestnavatelia.findIndex(
      (z) => Object.keys(validateItem(z)).length > 0,
    )
    if (zamestnavatelia.length === 0) {
      errors.zamestnavatelia = 'Pridajte aspoň jedného zamestnávateľa'
    } else if (invalidIndex !== -1) {
      errors.zamestnavatelia = `Doplňte údaje: ${itemLabel(
        zamestnavatelia[invalidIndex],
        invalidIndex,
        texts.itemName,
      )}`
    }
  }

  return errors
}

export default Zamestnanie
