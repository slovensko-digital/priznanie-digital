import React from 'react'
import { Form, FormikProps } from 'formik'
import { BooleanRadio, FormWrapper, Input } from '../components/FormComponents'
import { FormErrors, IncomeAndExpenseUserInput } from '../types/PageUserInputs'
import { numberInputRegexp } from '../lib/utils'
import { ErrorSummary } from '../components/ErrorSummary'
import { Page } from '../components/Page'
import { BackLink } from '../components/BackLink'
import { TAX_YEAR } from '../lib/calculation'
import { incomeAndExpenseInitialValues } from '../lib/initialValues'
import { Details } from '../components/Details'

const PrijmyAVydavky: Page<IncomeAndExpenseUserInput> = ({
  taxFormUserInput,
  setTaxFormUserInput,
  router,
  nextRoute,
  previousRoute,
}) => {
  return (
    <>
      <BackLink href={previousRoute} />
      <FormWrapper<IncomeAndExpenseUserInput>
        initialValues={taxFormUserInput}
        validate={validate}
        onSubmit={(values) => {
          const userInput = values.prijem_zo_zivnosti
            ? values
            : {
                ...incomeAndExpenseInitialValues,
                prijem_zo_zivnosti: false,
              }
          setTaxFormUserInput(userInput)
          router.push(nextRoute)
        }}
      >
        {({ values, errors }: FormikProps<IncomeAndExpenseUserInput>) => {
          return (
            <>
              <Form className="form" noValidate>
                <ErrorSummary<IncomeAndExpenseUserInput> errors={errors} />
                <BooleanRadio
                  title={`Mali ste v roku ${TAX_YEAR} príjmy zo živnosti na území SR?`}
                  name="prijem_zo_zivnosti"
                />
                <Details title="Ktoré príjmy zo živnosti podporujeme a ktoré nie?">
                  <p className="govuk-hint">
                    Aplikácia <b>nepodporuje</b> prípad <b>príjmov plynúcich zo zdrojov v
                    zahraničí</b>, t. j. aktívnych príjmov za činnosti vykonávané
                    fyzicky v zahraničí (napr. ak ste počas roka ako
                    zamestnanec, živnostník, umelec, športovec vykonávali
                    „prácu“ fyzicky v zahraničí) a pasívnych príjmov, ktoré vám
                    vyplatila osoba, ktorá nie je daňovým rezidentom SR (napr.
                    príjmy z prenájmu, predaja cenných papierov, dividend,
                    úrokov, vytvorenia diela, licenčných poplatkov, ktoré vám
                    vyplatila zahraničná osoba).
                  </p>
                </Details>
                {values.prijem_zo_zivnosti && (
                  <>
                    <h2 className="govuk-heading-l">
                      Príjmy a odvody do sociálnej a zdravotnej poisťovne zo
                      živnosti
                    </h2>

                    <Input
                      name="t1r10_prijmy"
                      type="number"
                      label="Príjmy"
                      hint={`Vaše celkové príjmy prijaté na účet (zaplatené faktúry) alebo v hotovosti (napr. cez pokladňu) v roku ${TAX_YEAR}. Uvádzajte iba príjmy zo živnosti.`}
                    />
                    <Input
                      name="priloha3_r11_socialne"
                      type="number"
                      label="Sociálne poistenie"
                      hint={`Celkové uhradené poistné v roku ${TAX_YEAR}. Uveďte všetky platby zaplatené v ${TAX_YEAR} - napr. aj nedoplatky za predchádzajúce roky.`}
                    />
                    <Input
                      name="priloha3_r13_zdravotne"
                      hint={`Celkové uhradené poistné v roku ${TAX_YEAR}. Uveďte všetky platby zaplatené v ${TAX_YEAR} - napr. aj nedoplatky za predchádzajúci rok.`}
                      type="number"
                      label="Zdravotné poistenie"
                    />
                    <Input
                      name="zaplatenePreddavky"
                      hint={`Celkové uhradené preddavky na daň z príjmov v roku ${TAX_YEAR}. Ak ste v roku ${TAX_YEAR} neplatili žiadne preddavky, uveďte 0.`}
                      type="number"
                      label="Zaplatené preddavky"
                    />
                  </>
                )}

                <button data-test="next" className="govuk-button" type="submit">
                  Pokračovať
                </button>
              </Form>
            </>
          )
        }}
      </FormWrapper>
    </>
  )
}

export const validate = (values: IncomeAndExpenseUserInput) => {
  const errors: Partial<FormErrors<IncomeAndExpenseUserInput>> = {}

  if (typeof values.prijem_zo_zivnosti === 'undefined') {
    errors.prijem_zo_zivnosti = 'Vyznačte odpoveď'
  }

  if (values.prijem_zo_zivnosti) {
    if (!values.t1r10_prijmy) {
      errors.t1r10_prijmy = 'Zadajte vaše celkové príjmy'
    }
    if (values.t1r10_prijmy && !values.t1r10_prijmy.match(numberInputRegexp)) {
      errors.t1r10_prijmy = 'Zadajte sumu príjmov vo formáte 123,45'
    }

    if (!values.priloha3_r11_socialne) {
      errors.priloha3_r11_socialne =
        'Zadajte vaše celkové uhradené sociálne poistné'
    }
    if (
      values.priloha3_r11_socialne &&
      !values.priloha3_r11_socialne.match(numberInputRegexp)
    ) {
      errors.priloha3_r11_socialne =
        'Zadajte sumu sociálneho poistenia vo formáte 123,45'
    }

    if (!values.priloha3_r13_zdravotne) {
      errors.priloha3_r13_zdravotne =
        'Zadajte vaše celkové uhradené zdravotné poistné'
    }
    if (
      values.priloha3_r13_zdravotne &&
      !values.priloha3_r13_zdravotne.match(numberInputRegexp)
    ) {
      errors.priloha3_r13_zdravotne =
        'Zadajte sumu zdravotného poistenia vo formáte 123,45'
    }

    if (!values.zaplatenePreddavky) {
      errors.zaplatenePreddavky = 'Zadajte vaše zaplatené preddavky'
    }
    if (
      values.zaplatenePreddavky &&
      !values.zaplatenePreddavky.match(numberInputRegexp)
    ) {
      errors.zaplatenePreddavky =
        'Zadajte vaše zaplatené preddavky vo formáte 123,45'
    }
  }

  return errors
}

export default PrijmyAVydavky
