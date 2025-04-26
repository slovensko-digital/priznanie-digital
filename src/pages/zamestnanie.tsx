import React from 'react'
import { Form } from 'formik'
import { BooleanRadio, FormWrapper, Input } from '../components/FormComponents'
import { EmployedUserInput, FormErrors } from '../types/PageUserInputs'
import { numberInputRegexp } from '../lib/utils'
import { ErrorSummary } from '../components/ErrorSummary'
import { Page } from '../components/Page'
import { employmentUserInputInitialValues } from '../lib/initialValues'
import { BackLink } from '../components/BackLink'
import { TAX_YEAR } from '../lib/calculation'
import TooltipHint from '../components/TooltipHint'
import styles from './zamestnanie.module.css'

const Zamestnanie: Page<EmployedUserInput> = ({
  setTaxFormUserInput,
  taxFormUserInput,
  router,
  previousRoute,
  nextRoute,
}) => {
  return (
    <>
      <BackLink href={previousRoute} />
      <FormWrapper<EmployedUserInput>
        initialValues={taxFormUserInput}
        validate={validate}
        onSubmit={(values) => {
          const userInput = values.employed
            ? values
            : {
                ...employmentUserInputInitialValues,
                employed: false,
              }
          setTaxFormUserInput(userInput)
          router.push(nextRoute)
        }}
      >
        {({ values, errors }) => (
          <Form className="form" noValidate>
            <ErrorSummary<EmployedUserInput> errors={errors} />
            <BooleanRadio
              title={`Mali ste v roku ${TAX_YEAR} príjmy zo zamestnania v SR?`}
              name="employed"
            />
            {values.employed && (
              <>
                <h3 className="govuk-heading-m">
                  Nasledujúce hodnoty nájdete na tlačive "Potvrdenie o
                  zdaniteľných príjmoch fyzickej osoby zo závislej činnosti". Ak
                  ste mali viac zamestnávateľov, tak tieto sumy spočítajte a
                  uveďte výsledné.
                </h3>
                <Input
                  name="uhrnPrijmovOdVsetkychZamestnavatelov"
                  type="number"
                  label="Úhrn vyplatených zdaniteľných príjmov"
                  hint={
                    <div>
                      <span className={styles.hintText}>
                        Tento údaj nájdete v riadku 01.
                      </span>
                      <TooltipHint>
                        <img
                          className={styles.hintImage}
                          src="/assets/images/zamestnanie-hint-01.png"
                          alt="zamestnanie-hint-01"
                        />
                      </TooltipHint>
                    </div>
                  }
                />
                <Input
                  name="uhrnPovinnehoPoistnehoNaSocialnePoistenie"
                  type="number"
                  label="Úhrn sociálneho poistného"
                  hint={
                    <div>
                      <span className={styles.hintText}>
                        Tento údaj nájdete v riadku 02a.
                      </span>
                      <TooltipHint>
                        <img
                          className={styles.hintImage}
                          src="/assets/images/zamestnanie-hint-02a.png"
                          alt="zamestnanie-hint-02a"
                        />
                      </TooltipHint>
                    </div>
                  }
                />
                <Input
                  name="uhrnPovinnehoPoistnehoNaZdravotnePoistenie"
                  type="number"
                  label="Úhrn zdravotného poistného"
                  hint={
                    <div>
                      <span className={styles.hintText}>
                        Tento údaj nájdete v riadku 02b.
                      </span>
                      <TooltipHint>
                        <img
                          className={styles.hintImage}
                          src="/assets/images/zamestnanie-hint-02b.png"
                          alt="zamestnanie-hint-02b"
                        />
                      </TooltipHint>
                    </div>
                  }
                />
                <Input
                  name="uhrnPreddavkovNaDan"
                  type="number"
                  label="Úhrn preddavkov na daň"
                  hint={
                    <div>
                      <span className={styles.hintText}>
                        Tento údaj nájdete v riadku 04.
                      </span>
                      <TooltipHint>
                        <img
                          className={styles.hintImage}
                          src="/assets/images/zamestnanie-hint-04.png"
                          alt="zamestnanie-hint-04"
                        />
                      </TooltipHint>
                    </div>
                  }
                />
                <Input
                  name="udajeODanovomBonuseNaDieta"
                  type="number"
                  label="Údaje o daňovom bonuse na dieťa"
                  hint={
                    <div>
                      <span className={styles.hintText}>
                        Tento údaj nájdete v riadku 13 v časti "Úhrnná suma
                        priznaného a vyplateného daňového bonusu".
                      </span>
                      <TooltipHint>
                        <img
                          className={styles.hintImage}
                          src="/assets/images/zamestnanie-hint-13.png"
                          alt="zamestnanie-hint-13"
                        />
                      </TooltipHint>
                    </div>
                  }
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

export const validate = (values: EmployedUserInput) => {
  const errors: Partial<FormErrors<EmployedUserInput>> = {}

  if (typeof values.employed === 'undefined') {
    errors.employed = 'Vyznačte odpoveď'
  }

  if (values.employed) {
    if (!values.uhrnPrijmovOdVsetkychZamestnavatelov) {
      errors.uhrnPrijmovOdVsetkychZamestnavatelov =
        'Zadajte úhrn príjmov od všetkých zamestnávateľov'
    } else if (
      !values.uhrnPrijmovOdVsetkychZamestnavatelov.match(numberInputRegexp)
    ) {
      errors.uhrnPrijmovOdVsetkychZamestnavatelov =
        'Zadajte sumu príjmov vo formáte 123,45'
    }

    if (!values.uhrnPovinnehoPoistnehoNaSocialnePoistenie) {
      errors.uhrnPovinnehoPoistnehoNaSocialnePoistenie =
        'Zadajte úhrn sociálneho poistného'
    } else if (
      !values.uhrnPovinnehoPoistnehoNaSocialnePoistenie.match(numberInputRegexp)
    ) {
      errors.uhrnPovinnehoPoistnehoNaSocialnePoistenie =
        'Zadajte sumu sociálneho poistného vo formáte 123,45'
    }

    if (!values.uhrnPovinnehoPoistnehoNaZdravotnePoistenie) {
      errors.uhrnPovinnehoPoistnehoNaZdravotnePoistenie =
        'Zadajte úhrn zdravotného poistného'
    } else if (
      !values.uhrnPovinnehoPoistnehoNaZdravotnePoistenie.match(
        numberInputRegexp,
      )
    ) {
      errors.uhrnPovinnehoPoistnehoNaZdravotnePoistenie =
        'Zadajte sumu zdravotného poistného vo formáte 123,45'
    }

    if (!values.uhrnPreddavkovNaDan) {
      errors.uhrnPreddavkovNaDan = 'Zadajte úhrn preddavkov na daň'
    } else if (!values.uhrnPreddavkovNaDan.match(numberInputRegexp)) {
      errors.uhrnPreddavkovNaDan =
        'Zadajte sumu povinného poistného vo formáte 123,45'
    }

    if (!values.udajeODanovomBonuseNaDieta) {
      errors.udajeODanovomBonuseNaDieta =
        'Zadajte údaje o daňovom bonuse na dieťa'
    } else if (!values.udajeODanovomBonuseNaDieta.match(numberInputRegexp)) {
      errors.udajeODanovomBonuseNaDieta =
        'Zadajte sumu povinného poistného vo formáte 123,45'
    }
  }

  return errors
}

export default Zamestnanie
