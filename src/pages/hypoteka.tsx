import React, { useEffect } from 'react'
import Link from 'next/link'
import { Form } from 'formik'
import { useRouter } from 'next/router'
import { NextPage } from 'next'
import { BooleanRadio, FormWrapper, Input } from '../components/FormComponents'
import { FormErrors, MortgageUserInput } from '../types/PageUserInputs'
import { TaxFormUserInput } from '../types/TaxFormUserInput'
import { getRoutes } from '../lib/routes'
import { ErrorSummary } from '../components/ErrorSummary'
import { numberInputRegexp } from '../lib/utils'

const { nextRoute, previousRoute } = getRoutes('/hypoteka')

interface Props {
  setTaxFormUserInput: (values: MortgageUserInput) => void
  taxFormUserInput: TaxFormUserInput
}

const Hypoteka: NextPage<Props> = ({
  setTaxFormUserInput,
  taxFormUserInput,
}: Props) => {
  const router = useRouter()
  useEffect(() => {
    router.prefetch(nextRoute)
  })
  return (
    <>
      <Link href={previousRoute}>
        <a data-test="back" className="govuk-back-link">
          Späť
        </a>
      </Link>
      <FormWrapper<MortgageUserInput>
        initialValues={taxFormUserInput}
        validate={validate}
        onSubmit={(values) => {
          setTaxFormUserInput(values)
          router.push(nextRoute)
        }}
      >
        {({ values, errors, touched }) => (
          <Form className="form" noValidate>
            <BooleanRadio
              title="Platili ste úroky z hypotéky v roku 2019?"
              name="r037_uplatnuje_uroky"
            />
            {values.r037_uplatnuje_uroky && (
              <>
                <ErrorSummary<MortgageUserInput>
                  errors={errors}
                  touched={touched}
                />
                <Input
                  name="r037_zaplatene_uroky"
                  type="number"
                  label="Zaplatené úroky"
                />
                <Input
                  name="r037_pocetMesiacov"
                  type="number"
                  label="Počet mesiacov"
                  placeholder="Počet mesiacov"
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

export const validate = (values: MortgageUserInput) => {
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
      parseInt(values.r037_pocetMesiacov, 10) < 0 ||
      parseInt(values.r037_pocetMesiacov, 10) > 12
    ) {
      errors.r037_pocetMesiacov = 'Zadajte počet mesiacov - číslo od 0 do 12'
    }
  }

  return errors
}

export default Hypoteka
