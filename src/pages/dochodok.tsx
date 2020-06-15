import React, { useEffect } from 'react'
import Link from 'next/link'
import { Form } from 'formik'
import { useRouter } from 'next/router'
import { NextPage } from 'next'
import { BooleanRadio, FormWrapper, Input } from '../components/FormComponents'
import { FormErrors, PensionUserInput } from '../types/PageUserInputs'
import { TaxFormUserInput } from '../types/TaxFormUserInput'
import { getRoutes, validateRoute } from '../lib/routes'
import { numberInputRegexp } from '../lib/utils'
import { parse } from '../lib/calculation'

const { nextRoute, previousRoute } = getRoutes('/dochodok')

interface Props {
  setTaxFormUserInput: (values: PensionUserInput) => void
  taxFormUserInput: TaxFormUserInput
}

const Dochodok: NextPage<Props> = ({
  setTaxFormUserInput,
  taxFormUserInput,
}: Props) => {
  const router = useRouter()
  useEffect(() => {
    router.prefetch(nextRoute())
    validateRoute(router, taxFormUserInput)
  }, [router, taxFormUserInput])
  return (
    <>
      <Link href={previousRoute()}>
        <a data-test="back" className="govuk-back-link">
          Späť
        </a>
      </Link>
      <FormWrapper<PensionUserInput>
        initialValues={taxFormUserInput}
        validate={validate}
        onSubmit={(values) => {
          setTaxFormUserInput(values)
          router.push(nextRoute())
        }}
      >
        {({ values }) => (
          <Form className="form" noValidate>
            <BooleanRadio
              title="Platili ste v roku 2019 príspevky na doplnkové dôchodkové poistenie (III. pilier)?	"
              name="platil_prispevky_na_dochodok"
            />
            {values.platil_prispevky_na_dochodok && (
              <>
                <Input
                  name="r075_zaplatene_prispevky_na_dochodok"
                  type="number"
                  label="Výška zaplatených príspevkov za rok 2019"
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

export const validate = (values: PensionUserInput) => {
  const errors: Partial<FormErrors<PensionUserInput>> = {}

  if (typeof values.platil_prispevky_na_dochodok === 'undefined') {
    errors.platil_prispevky_na_dochodok = 'Vyznačte odpoveď'
  }

  if (values.platil_prispevky_na_dochodok) {
    if (!values.r075_zaplatene_prispevky_na_dochodok) {
      errors.r075_zaplatene_prispevky_na_dochodok =
        'Zadajte výšku zaplatených príspevkov'
    } else if (
      !values.r075_zaplatene_prispevky_na_dochodok.match(numberInputRegexp)
    ) {
      errors.r075_zaplatene_prispevky_na_dochodok =
        'Zadajte výšku príspevkov vo formáte 123,45'
    } else if (parse(values.r075_zaplatene_prispevky_na_dochodok) > 180) {
      errors.r075_zaplatene_prispevky_na_dochodok =
        'Výška príspevkov nesmie presiahnuť 180,00 eur'
    }
  }

  return errors
}

export default Dochodok
