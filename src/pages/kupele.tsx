import React, { useEffect } from 'react'
import Link from 'next/link'
import { Form } from 'formik'
import { useRouter } from 'next/router'
import { NextPage } from 'next'

import styles from './osobne-udaje.module.css'

import {
  BooleanRadio,
  FormWrapper,
  Input,
  CheckboxSmall,
} from '../components/FormComponents'
import { FormErrors, SpaUserInput } from '../types/PageUserInputs'
import { TaxFormUserInput } from '../types/TaxFormUserInput'
import { getRoutes } from '../lib/routes'
import { ErrorSummary } from '../components/ErrorSummary'

const { nextRoute, previousRoute } = getRoutes('/kupele')

interface Props {
  setTaxFormUserInput: (values: SpaUserInput) => void
  taxFormUserInput: TaxFormUserInput
}

const Kupele: NextPage<Props> = ({
  setTaxFormUserInput,
  taxFormUserInput,
}: Props) => {
  const router = useRouter()
  useEffect(() => {
    router.prefetch(nextRoute())
  })
  const partnerSection = taxFormUserInput.r032_uplatnujem_na_partnera && (
    <>
      <Input
        name="r076a_kupele_danovnik"
        type="text"
        label="Uhrady v kupeloch za partnera"
      />
      <CheckboxSmall
        name="r076a_kupele_danovnik"
        label="Uhrady v kupeloch za partnera"
      ></CheckboxSmall>
    </>
  )

  return (
    <>
      <Link href={previousRoute()}>
        <a data-test="back" className="govuk-back-link">
          Späť
        </a>
      </Link>
      <FormWrapper<SpaUserInput>
        initialValues={taxFormUserInput}
        validate={validate}
        onSubmit={(values) => {
          setTaxFormUserInput(values)
          router.push(nextRoute())
        }}
      >
        {({ values, errors, touched }) => (
          <>
            <ErrorSummary<SpaUserInput> errors={errors} touched={touched} />
            <Form className="form" noValidate>
              <BooleanRadio
                title="Navstivile ste v minulom roku kupele?"
                name="kupele"
              />
              {values.kupele && (
                <>
                  <Input
                    className={styles.inlineField}
                    name="r076a_kupele_danovnik"
                    type="text"
                    label="Uhrady v kupeloch za vas"
                  />
                  {partnerSection}
                </>
              )}
              <button data-test="next" className="govuk-button" type="submit">
                Pokračovať
              </button>
            </Form>
          </>
        )}
      </FormWrapper>
    </>
  )
}

type Errors = Partial<FormErrors<SpaUserInput>>
export const validate = (values: SpaUserInput): Errors => {
  const errors: Errors = {}

  if (typeof values.kupele === 'undefined') {
    errors.kupele = 'Vyznačte odpoveď'
  }
  if (values.kupele) {
    if (!values.r076a_kupele_danovnik) {
      errors.r076a_kupele_danovnik = 'Zadajte vysku uhrad kupelov za vas'
    }

    //   if (!values.r142_obchMeno) {
    //     errors.r142_obchMeno = 'Zadajte obchodne meno'
    //   }

    //   if (!values.r142_ulica) {
    //     errors.r142_ulica = 'Zadajte ulicu'
    //   }

    //   if (!values.r142_cislo) {
    //     errors.r142_cislo = 'Zadajte číslo domu'
    //   }

    //   const pscNumberFormat = /^\d{3} \d{2}$/
    //   if (!values.r142_psc) {
    //     errors.r142_psc = 'Zadajte PSČ'
    //   } else if (!values.r142_psc.match(pscNumberFormat)) {
    //     errors.r142_psc = 'PSČ môže obsahovať iba 5 čísel'
    //   }

    //   if (!values.r142_obec) {
    //     errors.r142_obec = 'Zadajte obec'
    //   }
  }
  return errors
}

export default Kupele
