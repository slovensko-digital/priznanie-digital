import React from 'react'
import { Form } from 'formik'
import { BooleanRadio, FormWrapper, Input } from '../components/FormComponents'
import { DohodaUserInput, FormErrors } from '../types/PageUserInputs'
import { numberInputRegexp } from '../lib/utils'
import { ErrorSummary } from '../components/ErrorSummary'
import { Page } from '../components/Page'
import { dohodaUserInputInitialValues } from '../lib/initialValues'
import { BackLink } from '../components/BackLink'
import { TAX_YEAR } from '../lib/calculation'

const Dohoda: Page<DohodaUserInput> = ({
  setTaxFormUserInput,
  taxFormUserInput,
  router,
  previousRoute,
  nextRoute,
}) => {
  return (
    <>
      <BackLink href={previousRoute} />
      <FormWrapper<DohodaUserInput>
        initialValues={taxFormUserInput}
        validate={validate}
        onSubmit={(values) => {
          const userInput = values.dohoda
            ? values
            : {
                ...dohodaUserInputInitialValues,
                dohoda: false,
              }
          setTaxFormUserInput(userInput)
          router.push(nextRoute)
        }}
      >
        {({ values, errors }) => (
          <Form className="form" noValidate>
            <ErrorSummary<DohodaUserInput> errors={errors} />
            <BooleanRadio
              title={`Mali ste v roku ${TAX_YEAR} príjmy z dohôd v SR?`}
              name="dohoda"
            />
            {values.dohoda && (
              <>
              <h3 className="govuk-heading-m">Nasledujúce hodnoty nájdete na tlačive "Potvrdenie o zdaniteľných príjmoch fyzickej osoby". Ak ste mali viac dohôd, tak tieto sumy spočítajte a uveďte výsledné.</h3>
                <Input
                  name="uhrnPrijmovZoVsetkychDohod"
                  type="number"
                  label="Úhrn príjmov plynúcich na základe dohôd o prácach vykonávaných mimo pracovného pomeru"
                  hint={`Napríklad na základe Dohody o vykonaní práce. Na tlačive "Potvrdenie o zdaniteľných príjmoch fyzickej osoby zo závislej činnosti" nájdete tento údaj v riadku 01a.`}
                />
                <Input
                  name="uhrnPovinnehoPoistnehoNaSocialnePoistenieDohody"
                  type="number"
                  label="Úhrn sociálneho poistného"
                  hint={`Tento údaj nájdete v riadku 02a.`}
                />
                <Input
                  name="uhrnPovinnehoPoistnehoNaZdravotnePoistenieDohody"
                  type="number"
                  label="Úhrn zdravotného poistného"
                  hint={`Tento údaj nájdete v riadku 02b.`}
                />
                <Input
                  name="uhrnPreddavkovNaDanDohody"
                  type="number"
                  label="Úhrn preddavkov na daň"
                  hint={`Tento údaj nájdete v riadku 04.`}
                />
                <Input
                  name="udajeODanovomBonuseNaDietaDohody"
                  type="number"
                  label="Údaje o daňovom bonuse na dieťa"
                  hint={`Tento údaj nájdete v riadku 13 v časti "Úhrnná suma priznaného a vyplateného daňového bonusu".`}
                />
              </>
            )}
            <button data-test="next" className="govuk-button" type="submit">
              Pokračovať
            </button>
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
    if (!values.uhrnPrijmovZoVsetkychDohod) {
      errors.uhrnPrijmovZoVsetkychDohod =
        'Zadajte úhrn príjmov zo všetkých dohôd'
    } else if (
      !values.uhrnPrijmovZoVsetkychDohod.match(numberInputRegexp)
    ) {
      errors.uhrnPrijmovZoVsetkychDohod =
        'Zadajte sumu príjmov vo formáte 123,45'
    }

    if (!values.uhrnPovinnehoPoistnehoNaSocialnePoistenieDohody) {
      errors.uhrnPovinnehoPoistnehoNaSocialnePoistenieDohody =
        'Zadajte úhrn sociálneho poistného'
    } else if (
      !values.uhrnPovinnehoPoistnehoNaSocialnePoistenieDohody.match(numberInputRegexp)
    ) {
      errors.uhrnPovinnehoPoistnehoNaSocialnePoistenieDohody =
        'Zadajte sumu sociálneho poistného vo formáte 123,45'
    }

    if (!values.uhrnPovinnehoPoistnehoNaZdravotnePoistenieDohody) {
      errors.uhrnPovinnehoPoistnehoNaZdravotnePoistenieDohody =
        'Zadajte úhrn zdravotného poistného'
    } else if (
      !values.uhrnPovinnehoPoistnehoNaZdravotnePoistenieDohody.match(
        numberInputRegexp,
      )
    ) {
      errors.uhrnPovinnehoPoistnehoNaZdravotnePoistenieDohody =
        'Zadajte sumu zdravotného poistného vo formáte 123,45'
    }

    if (!values.uhrnPreddavkovNaDanDohody) {
      errors.uhrnPreddavkovNaDanDohody = 'Zadajte úhrn preddavkov na daň'
    } else if (!values.uhrnPreddavkovNaDanDohody.match(numberInputRegexp)) {
      errors.uhrnPreddavkovNaDanDohody =
        'Zadajte sumu povinného poistného vo formáte 123,45'
    }

    if (!values.udajeODanovomBonuseNaDietaDohody) {
      errors.udajeODanovomBonuseNaDietaDohody =
        'Zadajte údaje o daňovom bonuse na dieťa'
    } else if (!values.udajeODanovomBonuseNaDietaDohody.match(numberInputRegexp)) {
      errors.udajeODanovomBonuseNaDietaDohody =
        'Zadajte sumu povinného poistného vo formáte 123,45'
    }
  }

  return errors
}

export default Dohoda
