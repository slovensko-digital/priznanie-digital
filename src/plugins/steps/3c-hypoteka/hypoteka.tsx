import React from 'react'
import Link from 'next/link'
import { Form } from 'formik'
import { BooleanRadio, FormWrapper, Input } from '../../_components/form/FormComponents'
import { FormErrors, MortgageUserInput } from '../../../types/PageUserInputs'
import { ErrorSummary } from '../../_components/form/ErrorSummary'
import { numberInputRegexp } from '../../../lib/utils'
import { Page } from '../../../components/Page'
import { mortgageInitialValues } from '../../../lib/initialValues'
import { TAX_YEAR } from '../../summary/calculation/calculation'

const Hypoteka: Page<MortgageUserInput> = ({
  setTaxFormUserInput,
  taxFormUserInput,
  router,
  previousRoute,
  nextRoute,
}) => {
  return (
    <>
      <Link href={previousRoute} data-test="back" className="govuk-back-link">
        Späť
      </Link>
      <FormWrapper<MortgageUserInput>
        initialValues={taxFormUserInput}
        validate={validate}
        onSubmit={(values) => {
          const userInput = values.r037_uplatnuje_uroky
            ? values
            : {
                ...mortgageInitialValues,
                r037_uplatnuje_uroky: false,
              }
          setTaxFormUserInput(userInput)
          router.push(nextRoute)
        }}
      >
        {({ values, errors }) => (
          <Form className="form" noValidate>
            <BooleanRadio
              title={`Platili ste úroky z hypotéky v roku ${TAX_YEAR}?`}
              name="r037_uplatnuje_uroky"
            />
            {values.r037_uplatnuje_uroky && (
              <>
                <ErrorSummary<MortgageUserInput> errors={errors} />
                <Input
                  name="r037_zaplatene_uroky"
                  type="number"
                  label="Zaplatené úroky"
                />
                <Input
                  name="r037_pocetMesiacov"
                  type="number"
                  label="Počet mesiacov"
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

const validate = (values: MortgageUserInput) => {
  const errors: Partial<FormErrors<MortgageUserInput>> = {}

  if (typeof values.r037_uplatnuje_uroky === 'undefined') {
    errors.r037_uplatnuje_uroky = 'Vyznačte odpoveď'
  }

  if (values.r037_uplatnuje_uroky) {
    if (!values.r037_zaplatene_uroky) {
      errors.r037_zaplatene_uroky = 'Zadajte výšku zaplatených úrokov'
    } else if (!values.r037_zaplatene_uroky.match(numberInputRegexp)) {
      errors.r037_zaplatene_uroky = 'Zadajte zaplatené úroky vo formáte 123,45'
    }
    if (!values.r037_pocetMesiacov) {
      errors.r037_pocetMesiacov =
        'Zadajte počet mesiacov, kedy ste platili úroky'
    } else if (
      !values.r037_pocetMesiacov.match(/^\d+$/) ||
      Number.parseInt(values.r037_pocetMesiacov, 10) < 0 ||
      Number.parseInt(values.r037_pocetMesiacov, 10) > 12
    ) {
      errors.r037_pocetMesiacov = 'Zadajte počet mesiacov - číslo od 0 do 12'
    }
  }

  return errors
}

export { validate, Hypoteka }
