import React, { useEffect } from 'react'
import Link from 'next/link'
import { Form } from 'formik'
import { useRouter } from 'next/router'
import { NextPage } from 'next'

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
  console.log(taxFormUserInput)

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
                  <h2>Na koho si uplatnujete znizenie dane?</h2>
                  <CheckboxSmall name="danovnikInSpa" label="Na seba" />
                  {values.danovnikInSpa && (
                    <Input
                      className="govuk-!-margin-bottom-6"
                      name="r076a_kupele_danovnik"
                      type="text"
                      label="Uhrady v kupeloch za vas"
                    />
                  )}

                  <CheckboxSmall
                    name="r033_partner_kupele"
                    label="Na manzela/manzelku"
                  />
                  {values.r033_partner_kupele && (
                    <Input
                      className="govuk-!-margin-bottom-6"
                      name="r033_partner_kupele_uhrady"
                      type="text"
                      label="Uhrady v kupeloch za partnera"
                    />
                  )}

                  <CheckboxSmall name="childrenInSpa" label="Na deti" />
                  {values.childrenInSpa && (
                    <>
                      <p className="govuk-!-margin-bottom-3">
                        Ktore z vasich deti navstivili kupele?
                      </p>
                      {taxFormUserInput.children.map((child, index) => (
                        <div key={child.id} className="govuk-!-margin-bottom-3">
                          <CheckboxSmall
                            name={`children[${index}].kupelnaStarostlivost`}
                            label={child.priezviskoMeno}
                          />
                        </div>
                      ))}
                      <Input
                        className="govuk-!-margin-bottom-6"
                        name="r036_deti_kupele"
                        type="text"
                        label="Uhrady v kupeloch za deti"
                      />
                    </>
                  )}

                  <div className="govuk-!-margin-top-3 govuk-!-margin-bottom-3">
                    <a href="https://podpora.financnasprava.sk/886734-Zaplaten%C3%A9-%C3%BAhrady-s%C3%BAvisiace-s-k%C3%BApe%C4%BEnou-starostlivos%C5%A5ou">
                      Podrobnosti o podmienkach
                    </a>
                  </div>
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
