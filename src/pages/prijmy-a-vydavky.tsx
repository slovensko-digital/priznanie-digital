import React from 'react'
import { Form, FormikProps } from 'formik'
import { FormWrapper, Input } from '../components/FormComponents'
import { FormErrors, IncomeAndExpenseUserInput } from '../types/PageUserInputs'
import { numberInputRegexp } from '../lib/utils'
import { ErrorSummary } from '../components/ErrorSummary'
import { Page } from '../components/Page'
import { BackLink } from '../components/BackLink'
import { TAX_YEAR } from '../lib/calculation'

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
          setTaxFormUserInput(values)
          router.push(nextRoute)
        }}
      >
        {({ errors }: FormikProps<IncomeAndExpenseUserInput>) => {
          return (
            <>
              <ErrorSummary<IncomeAndExpenseUserInput> errors={errors} />
              <Form className="form" noValidate>
                <h2 className="govuk-heading-l">
                  Príjmy a odvody do sociálnej a zdravotnej poisťovne
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
                  hint={`Celkové uhradené preddavky na daň z príjmov až do termínu na podanie priznania. (okrem preddavkov v roku ${TAX_YEAR} sem pripočítajte aj preddavky zaplatené do 31.3.${
                    TAX_YEAR + 1
                  }).`}
                  type="number"
                  label="Zaplatené preddavky"
                />

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

  return errors
}

export default PrijmyAVydavky
