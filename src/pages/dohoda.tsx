import React from 'react'
import { Form } from 'formik'
import { FormWrapper, BooleanRadio } from '../components/FormComponents'
import { DohodaUserInput, FormErrors } from '../types/PageUserInputs'
import { ErrorSummary } from '../components/ErrorSummary'
import { Page } from '../components/Page'
import {
  dohodaUserInputInitialValues,
  makeEmptyDohoda,
} from '../lib/initialValues'
import { BackLink } from '../components/BackLink'
import { TAX_YEAR } from '../lib/calculation'
import { DohodaItemInput } from '../types/TaxFormUserInput'
import { AddToList, AddToListTexts } from '../components/AddToList'
import {
  AmountField,
  incomeItemSummary,
  itemFromTotals,
  itemLabel,
  totalsFromItems,
  validateListItem,
} from '../lib/addToList'

const fields: AmountField<DohodaItemInput>[] = [
  {
    name: 'prijmy',
    total: 'uhrnPrijmovZoVsetkychDohod',
    label: 'Úhrn príjmov plynúcich na základe dohody',
    hint: 'Na tlačive "Potvrdenie o zdaniteľných príjmoch" nájdete tento údaj v riadku 01a.',
    requiredMessage: 'Zadajte úhrn príjmov z dohody',
  },
  {
    name: 'socialnePoistne',
    total: 'uhrnPovinnehoPoistnehoNaSocialnePoistenieDohody',
    label: 'Úhrn sociálneho poistného',
    hint: 'Tento údaj nájdete v riadku 02a.',
    requiredMessage: 'Zadajte úhrn sociálneho poistného',
  },
  {
    name: 'zdravotnePoistne',
    total: 'uhrnPovinnehoPoistnehoNaZdravotnePoistenieDohody',
    label: 'Úhrn zdravotného poistného',
    hint: 'Tento údaj nájdete v riadku 02b.',
    requiredMessage: 'Zadajte úhrn zdravotného poistného',
  },
  {
    name: 'preddavkyNaDan',
    total: 'uhrnPreddavkovNaDanDohody',
    label: 'Úhrn preddavkov na daň',
    hint: 'Tento údaj nájdete v riadku 04.',
    requiredMessage: 'Zadajte úhrn preddavkov na daň',
  },
  {
    name: 'danovyBonusNaDieta',
    total: 'udajeODanovomBonuseNaDietaDohody',
    label: 'Údaje o daňovom bonuse na dieťa',
    hint: 'Tento údaj nájdete v riadku 13 v časti "Úhrnná suma priznaného a vyplateného daňového bonusu".',
    requiredMessage: 'Zadajte údaje o daňovom bonuse na dieťa',
  },
]

const texts: AddToListTexts = {
  itemName: 'Dohoda',
  intro: (
    <>
      Hodnoty nájdete na tlačive &ldquo;Potvrdenie o zdaniteľných príjmoch
      fyzickej osoby zo závislej činnosti&rdquo;.
    </>
  ),
  nameLabel: 'Názov dohody (nepovinné)',
  nameHint: 'Napríklad "Dohoda o vykonaní práce – ABC s.r.o."',
  addButton: 'Pridať dohodu',
  saveButton: 'Uložiť dohodu',
  addedHeading: (count) => {
    if (count === 1) return 'Pridali ste 1 dohodu'
    return `Pridali ste ${count} ${count < 5 ? 'dohody' : 'dohôd'}`
  },
  addAnotherQuestion: 'Potrebujete pridať ďalšiu dohodu?',
}

export const validateItem = (dohoda: DohodaItemInput) =>
  validateListItem(dohoda, fields)

const withMigratedItems = (input: DohodaUserInput): DohodaUserInput => {
  if (!input.dohoda || input.dohody?.length) return input
  const item = itemFromTotals(input, fields, makeEmptyDohoda)
  return item ? { ...input, dohody: [item] } : input
}

const Dohoda: Page<DohodaUserInput> = ({
  setTaxFormUserInput,
  taxFormUserInput,
  router,
  previousRoute,
  nextRoute,
}) => (
  <>
    <BackLink href={previousRoute} />
    <FormWrapper<DohodaUserInput>
      initialValues={withMigratedItems(taxFormUserInput)}
      validate={validate}
      onSubmit={(values) => {
        setTaxFormUserInput(
          values.dohoda
            ? { ...values, ...totalsFromItems(values.dohody ?? [], fields) }
            : { ...dohodaUserInputInitialValues, dohoda: false },
        )
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
          {values.dohoda ? (
            <AddToList<DohodaItemInput>
              name="dohody"
              items={values.dohody ?? []}
              fields={fields}
              makeEmpty={makeEmptyDohoda}
              texts={texts}
              testId="dohoda"
              addAnotherId="addAnotherDohoda"
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

export const validate = (values: DohodaUserInput) => {
  const errors: Partial<FormErrors<DohodaUserInput>> = {}

  if (typeof values.dohoda === 'undefined') {
    errors.dohoda = 'Vyznačte odpoveď'
  }

  if (values.dohoda) {
    const dohody = values.dohody ?? []
    const invalidIndex = dohody.findIndex(
      (d) => Object.keys(validateItem(d)).length > 0,
    )
    if (dohody.length === 0) {
      errors.dohody = 'Pridajte aspoň jednu dohodu'
    } else if (invalidIndex !== -1) {
      errors.dohody = `Doplňte údaje: ${itemLabel(
        dohody[invalidIndex],
        invalidIndex,
        texts.itemName,
      )}`
    }
  }

  return errors
}

export default Dohoda
