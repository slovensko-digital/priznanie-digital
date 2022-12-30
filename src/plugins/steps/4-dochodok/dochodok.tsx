import React from 'react'
import Link from 'next/link'
import { Form } from 'formik'
import { BooleanRadio, FormWrapper, Input } from '../../_components/form/FormComponents'
import { FormErrors, PensionUserInput } from '../../../types/PageUserInputs'
import { numberInputRegexp, parseInputNumber } from '../../../lib/utils'
import { Page } from '../../../components/Page'
import { pensionInitialValues } from '../../../lib/initialValues'
import { ErrorSummary } from '../../_components/form/ErrorSummary'
import { TAX_YEAR } from '../../summary/calculation/calculation'

const Dochodok: Page<PensionUserInput> = ({
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
      <FormWrapper<PensionUserInput>
        initialValues={taxFormUserInput}
        validate={validate}
        onSubmit={(values) => {
          const userInput = values.platil_prispevky_na_dochodok
            ? values
            : {
                ...pensionInitialValues,
                platil_prispevky_na_dochodok: false,
              }
          setTaxFormUserInput(userInput)
          router.push(nextRoute)
        }}
      >
        {({ values, errors }) => (
          <Form className="form" noValidate>
            <ErrorSummary<PensionUserInput> errors={errors} />
            <BooleanRadio
              title={`Platili ste v roku ${TAX_YEAR} príspevky na doplnkové dôchodkové poistenie (III. pilier)?`}
              name="platil_prispevky_na_dochodok"
            />
            {values.platil_prispevky_na_dochodok && (
              <>
                <Input
                  name="zaplatene_prispevky_na_dochodok"
                  type="number"
                  label={`Výška zaplatených príspevkov za rok ${TAX_YEAR}`}
                  hint="Maximálne si viete uplatniť príspevky na doplnkové dôchodkové sporenie do výšky 180 eur."
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

const validate = (values: PensionUserInput) => {
  const errors: Partial<FormErrors<PensionUserInput>> = {}

  if (typeof values.platil_prispevky_na_dochodok === 'undefined') {
    errors.platil_prispevky_na_dochodok = 'Vyznačte odpoveď'
  }

  if (values.platil_prispevky_na_dochodok) {
    if (!values.zaplatene_prispevky_na_dochodok) {
      errors.zaplatene_prispevky_na_dochodok =
        'Zadajte výšku zaplatených príspevkov'
    } else if (
      !values.zaplatene_prispevky_na_dochodok.match(numberInputRegexp)
    ) {
      errors.zaplatene_prispevky_na_dochodok =
        'Zadajte výšku príspevkov vo formáte 123,45'
    } else if (parseInputNumber(values.zaplatene_prispevky_na_dochodok) > 180) {
      errors.zaplatene_prispevky_na_dochodok =
        'Výška príspevkov nesmie presiahnuť 180,00 eur'
    }
  }

  return errors
}

export { validate, Dochodok }
