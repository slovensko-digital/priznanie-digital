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

  const shouldShowChildren = taxFormUserInput.children.some((child) =>
    Boolean(child.rodneCislo),
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
                title="Návštivili ste v roku 2019 kúpele a máte doklad o zaplatení?"
                hint={`Ak máte preukázateľné výdavky z prírodných liečebných kúpeľov alebo kúpeľných liečební (faktúru či "bločik"), tak si môžete uplatniť nezdaniteľnú časť základu dane na manžela/manželku a vaše deti.`}
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
                      label="Aké sú vaše preukazáteľné výdavky za služby v liečebných kúpeľoch?"
                      hint="Maximálne viete uplatniť úhrady za rok 2019 do výšky 50 eur."
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
                      hint="Maximálne viete uplatniť úhrady za rok 2019 do výšky 50 eur."
                    />
                  )}
                  {shouldShowChildren && (
                    <>
                      <CheckboxSmall name="childrenInSpa" label="Na deti" />
                      {values.childrenInSpa && (
                        <>
                          <p className="govuk-!-margin-bottom-3">
                            Ktore z vasich deti navstivili kupele?
                          </p>
                          {taxFormUserInput.children.map((child, index) => (
                            <div
                              key={child.id}
                              className="govuk-!-margin-bottom-3"
                            >
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
                            label="Boli ste s deťmi v kúpeľoch a uplatňujete si preukázateľne výdavky?"
                            hint="Maximálne viete uplatniť úhrady za rok 2019 do výšky 50 eur na každé dieťa."
                          />
                        </>
                      )}
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
    if (
      !values.danovnikInSpa &&
      !values.r033_partner_kupele &&
      !values.childrenInSpa
    ) {
      errors.kupele = 'Vyznačte aspon jednu z moznosti'
    }

    if (values.danovnikInSpa && !values.r076a_kupele_danovnik) {
      errors.r076a_kupele_danovnik = 'Zadajte vysku uhrad kupelov za vas'
    }

    if (values.r033_partner_kupele && !values.r033_partner_kupele_uhrady) {
      errors.r033_partner_kupele_uhrady =
        'Zadajte vysku uhrad kupelov za manzela/manzelku'
    }

    if (values.childrenInSpa && !values.r036_deti_kupele) {
      errors.r036_deti_kupele = 'Zadajte vysku uhrad kupelov za deti'
    }
  }
  return errors
}

export default Kupele
