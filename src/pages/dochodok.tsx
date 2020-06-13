import React, { useEffect } from 'react'
import Link from 'next/link'
import { Form } from 'formik'
import { useRouter } from 'next/router'
import { NextPage } from 'next'
import { BooleanRadio, FormWrapper, Input } from '../components/FormComponents'
import { FormErrors, PensionUserInput } from '../types/PageUserInputs'
import { TaxFormUserInput } from '../types/TaxFormUserInput'
import { getRoutes } from '../lib/routes'
import { numberInputRegexp } from '../lib/utils'

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
  })
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
        // validationSchema={validationSchema}
        onSubmit={(values) => {
          setTaxFormUserInput(values)
          router.push(nextRoute())
        }}
      >
        {({ values }) => (
          <Form className="form" noValidate>
            <BooleanRadio
              title="Platili ste príspevky na doplnkové dôchodkové poistenie (III. pilier) v roku 2019?"
              name="r029_poberal_dochodok"
            />
            {values.r029_poberal_dochodok && (
              <>
                <Input
                  name="r030_vyska_dochodku"
                  type="number"
                  label="Výška zaplatených príspevkov za rok 2019"
                  hint="Maximálne viete uplatniť príspevky za doplnkové dôchodkové sporenie za rok 2019 do výšky 180 eur."
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

  if (typeof values.r029_poberal_dochodok === 'undefined') {
    errors.r029_poberal_dochodok = 'Vyznačte odpoveď'
  }

  if (values.r029_poberal_dochodok) {
    if (!values.r030_vyska_dochodku) {
      errors.r030_vyska_dochodku = 'Zadajte výšku zaplatených príspevkov'
    } else if (!values.r030_vyska_dochodku.match(numberInputRegexp)) {
      errors.r030_vyska_dochodku = 'Zadajte výšku príspevkov vo formáte 123,45'
    }
  }

  return errors
}

export default Dochodok
