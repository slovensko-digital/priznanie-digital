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
import { getRoutes, validateRoute } from '../lib/routes'
import { ErrorSummary } from '../components/ErrorSummary'
import { parse } from '../lib/calculation'

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
    validateRoute(router, taxFormUserInput)
  }, [router, taxFormUserInput])

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
                title="Navštívili ste v roku 2019 kúpele a máte doklad o zaplatení?"
                hint={`Ak máte preukázateľné výdavky z prírodných liečebných kúpeľov alebo kúpeľných liečební (faktúru či pokladničný blok), tak si môžete uplatniť nezdaniteľnú časť základu dane na seba, ale aj na manžela/manželku a vaše deti.`}
                name="kupele"
              />
              {values.kupele && (
                <>
                  <h2 className="govuk-heading-l">
                    Na koho si uplatňujete zníženie dane?
                  </h2>
                  {(errors as any).noAnswer ? (
                    <span data-test="error" className="govuk-error-message">
                      <span className="govuk-visually-hidden">Error:</span>{' '}
                      {(errors as any).noAnswer}
                    </span>
                  ) : null}
                  <CheckboxSmall name="danovnikInSpa" label="Na seba" />
                  {values.danovnikInSpa && (
                    <Input
                      className="govuk-!-margin-bottom-6"
                      name="r076a_kupele_danovnik"
                      type="text"
                      label="Aké sú vaše výdavky za služby v kúpeľoch?"
                      hint="Maximálna výška úhrady za rok 2019 je 50 eur"
                    />
                  )}

                  <CheckboxSmall
                    name="r033_partner_kupele"
                    label="Na manžela/manželku"
                  />
                  {values.r033_partner_kupele && (
                    <Input
                      className="govuk-!-margin-bottom-6"
                      name="r033_partner_kupele_uhrady"
                      type="text"
                      label="Aké sú partnerové výdavky za služby v kúpeľoch?"
                      hint="Maximálna výška úhrady za rok 2019 je 50 eur"
                    />
                  )}
                  {shouldShowChildren && (
                    <>
                      <CheckboxSmall name="childrenInSpa" label="Na deti" />
                      {values.childrenInSpa && (
                        <>
                          <p className="govuk-!-margin-bottom-3">
                            Ktoré dieťa navštívilo kúpele?
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
                            label="Aké sú výdavky vašich detí za služby v kúpeľoch?"
                            hint="Maximálna výška úhrady za rok 2019 je 50 eur na každé dieťa"
                          />
                        </>
                      )}
                    </>
                  )}

                  <div className="govuk-!-margin-top-3 govuk-!-margin-bottom-3">
                    <a
                      href="https://podpora.financnasprava.sk/886734-Zaplaten%C3%A9-%C3%BAhrady-s%C3%BAvisiace-s-k%C3%BApe%C4%BEnou-starostlivos%C5%A5ou"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
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

type Errors = Partial<FormErrors<SpaUserInput>> & { noAnswer?: string }
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
      errors.noAnswer = 'Vyznačte aspoň jednu z možností'
    }

    if (values.danovnikInSpa && !values.r076a_kupele_danovnik) {
      errors.r076a_kupele_danovnik = 'Zadajte výšku úhrad kúpeľov za vás'
    }
    if (
      (values.danovnikInSpa && parse(values.r076a_kupele_danovnik) > 50) ||
      parse(values.r076a_kupele_danovnik) < 0
    ) {
      errors.r076a_kupele_danovnik =
        'Zadajte výšku úhrad kúpeľov 50 eur alebo menej'
    }

    if (values.r033_partner_kupele && !values.r033_partner_kupele_uhrady) {
      errors.r033_partner_kupele_uhrady =
        'Zadajte výšku úhrad kúpeľov za manžela/manželku'
    }
    if (
      (values.r033_partner_kupele &&
        parse(values.r033_partner_kupele_uhrady) > 50) ||
      parse(values.r033_partner_kupele_uhrady) < 0
    ) {
      errors.r033_partner_kupele_uhrady =
        'Zadajte výšku úhrad kúpeľov 50 eur alebo menej'
    }

    if (values.childrenInSpa && !values.r036_deti_kupele) {
      errors.r036_deti_kupele = 'Zadajte výšku úhrad kúpeľov za deti'
    }

    const maxChildrenAmount = (values.children?.length ?? 0) * 50
    if (
      values.childrenInSpa &&
      (parse(values.r036_deti_kupele) > maxChildrenAmount ||
        parse(values.r036_deti_kupele) < 0)
    ) {
      errors.r036_deti_kupele = 'Zadajte výšku úhrad kúpeľov 50 eur alebo menej'
    }
  }
  return errors
}

export default Kupele
