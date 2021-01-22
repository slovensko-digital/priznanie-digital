import React from 'react'
import Link from 'next/link'
import { FieldArray, Form } from 'formik'

import {
  BooleanRadio,
  FormWrapper,
  Input,
  CheckboxSmall,
} from '../components/FormComponents'
import { FormErrors, SpaUserInput } from '../types/PageUserInputs'
import { ErrorSummary } from '../components/ErrorSummary'
import {
  formatRodneCislo,
  parseInputNumber,
  validateRodneCislo,
} from '../lib/utils'
import { Page } from '../components/Page'
import { makeEmptyChild, spaInitialInput } from '../lib/initialValues'
import classnames from 'classnames'
import styles from './deti.module.css'

const KupeleError = ({ message }) => {
  if (!message) {
    return null
  }

  return (
    <span data-test="error" className="govuk-error-message">
      <span className="govuk-visually-hidden">Error:</span> {message}
    </span>
  )
}

const Kupele: Page<SpaUserInput> = ({
  setTaxFormUserInput,
  taxFormUserInput,
  previousRoute,
  nextRoute,
  router,
}) => {
  const shouldShowChildren = taxFormUserInput.children.some((child) =>
    Boolean(child.rodneCislo),
  )

  const hasPartnerData =
    taxFormUserInput.r032_uplatnujem_na_partnera &&
    taxFormUserInput.r031_priezvisko_a_meno &&
    taxFormUserInput.r031_priezvisko_a_meno.length > 0 &&
    taxFormUserInput.r031_rodne_cislo &&
    taxFormUserInput.r031_rodne_cislo.length > 0

  return (
    <>
      <Link href={previousRoute}>
        <a data-test="back" className="govuk-back-link">
          Späť
        </a>
      </Link>
      <FormWrapper<SpaUserInput>
        initialValues={taxFormUserInput}
        validate={validate}
        onSubmit={(values) => {
          if (values.kupele) {
            // children not entered previously
            if (!shouldShowChildren) {
              values.children = values.children.map((child) => ({
                ...child,
                kupelnaStarostlivost: true,
              }))
            }
            setTaxFormUserInput(values)
          } else {
            const userInput = {
              ...spaInitialInput,
              children: values.children.map((child) => ({
                ...child,
                kupelnaStarostlivost: false,
              })),
              kupele: false,
            }
            setTaxFormUserInput(userInput)
          }
          router.push(nextRoute)
        }}
      >
        {({ values, errors, setFieldValue, validateForm, setErrors }) => (
          <>
            <ErrorSummary<SpaUserInput> errors={errors} />
            <Form className="form" noValidate>
              <BooleanRadio
                title="Navštívili ste v roku 2020 kúpele a máte doklad o zaplatení?"
                hint={`Ak máte preukázateľné výdavky z prírodných liečebných kúpeľov alebo kúpeľných liečební (faktúru či pokladničný blok), tak si môžete uplatniť nezdaniteľnú časť základu dane na seba, ale aj na manželku / manžela a vaše deti.`}
                name="kupele"
              />
              {values.kupele && (
                <>
                  <h2 className="govuk-heading-l">
                    Na koho si uplatňujete zníženie dane?
                  </h2>
                  <KupeleError message={(errors as Errors).noAnswer} />
                  <CheckboxSmall name="danovnikInSpa" label="Na seba" />
                  {values.danovnikInSpa && (
                    <Input
                      className="govuk-!-margin-bottom-6"
                      name="r076a_kupele_danovnik"
                      type="text"
                      label="Aké sú vaše výdavky za služby v kúpeľoch?"
                      hint="Maximálna výška úhrady za rok 2020 je 50 eur"
                    />
                  )}
                  <CheckboxSmall
                    name="r033_partner_kupele"
                    label="Na manželku / manžela"
                  />
                  {values.r033_partner_kupele && (
                    <>
                      {!hasPartnerData && (
                        <>
                          <Input
                            name="r031_priezvisko_a_meno"
                            type="text"
                            label="Meno a priezvisko manželky / manžela"
                          />
                          <Input
                            name="r031_rodne_cislo"
                            type="text"
                            label="Rodné číslo"
                            maxLength={13}
                            onChange={async (event) => {
                              const rodneCisloValue = formatRodneCislo(
                                event.currentTarget.value,
                                values.r031_rodne_cislo,
                              )
                              setFieldValue('r031_rodne_cislo', rodneCisloValue)
                            }}
                          />
                        </>
                      )}
                      <Input
                        className="govuk-!-margin-bottom-6"
                        name="r033_partner_kupele_uhrady"
                        type="text"
                        label="Aké sú partnerove výdavky za služby v kúpeľoch?"
                        hint="Maximálna výška úhrady za rok 2020 je 50 eur"
                      />
                    </>
                  )}
                  <CheckboxSmall name="childrenInSpa" label="Na svoje deti" />
                  {values.childrenInSpa && (
                    <>
                      {shouldShowChildren ? (
                        <>
                          <p className="govuk-!-margin-bottom-3">
                            Ktoré dieťa navštívilo kúpele?
                          </p>
                          <KupeleError message={(errors as Errors).noChild} />
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
                        </>
                      ) : (
                        <FieldArray name="children">
                          {(arrayHelpers) => (
                            <div className="govuk-!-margin-bottom-5">
                              {values.children.map((child, index) => (
                                <div key={child.id}>
                                  {values.children.length > 1 && (
                                    <h2
                                      className={classnames(
                                        'govuk-heading-m',
                                        'govuk-!-margin-top-3',
                                        styles.childHeadline,
                                      )}
                                    >
                                      {index + 1}. dieťa
                                      <button
                                        className="govuk-button btn-secondary btn-warning"
                                        type="button"
                                        onClick={() =>
                                          arrayHelpers.remove(index)
                                        }
                                        data-test={`remove-child-${index}`}
                                      >
                                        Odstrániť {index + 1}. dieťa
                                      </button>
                                    </h2>
                                  )}
                                  <Input
                                    name={
                                      `children[${index}].priezviskoMeno` as any
                                    }
                                    type="text"
                                    label="Meno a priezvisko"
                                    width="auto"
                                  />
                                  <Input
                                    name={
                                      `children[${index}].rodneCislo` as any
                                    }
                                    type="text"
                                    label="Rodné číslo"
                                    width="auto"
                                    maxLength={13}
                                    onChange={async (event) => {
                                      const rodneCisloValue = formatRodneCislo(
                                        event.currentTarget.value,
                                        child.rodneCislo,
                                      )
                                      setFieldValue(
                                        `children[${index}].rodneCislo`,
                                        rodneCisloValue,
                                      )
                                    }}
                                  />
                                </div>
                              ))}
                              <button
                                className="btn-secondary govuk-button"
                                type="button"
                                onClick={async () => {
                                  const { children } = await validateForm()
                                  setErrors({ children })
                                  const hasErrors =
                                    children && Object.keys(children).length > 0
                                  if (!hasErrors) {
                                    arrayHelpers.push({
                                      ...makeEmptyChild(),
                                      kupelnaStarostlivost: true,
                                    })
                                  }
                                }}
                                data-test="add-child"
                              >
                                Pridať ďalšie dieťa
                              </button>
                            </div>
                          )}
                        </FieldArray>
                      )}
                      <Input
                        className="govuk-!-margin-bottom-6"
                        name="r036_deti_kupele"
                        type="text"
                        label="Aké sú výdavky vašich detí za služby v kúpeľoch?"
                        hint="Maximálna výška úhrady za rok 2020 je 50 eur na každé dieťa"
                      />
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

interface ChildFormErrors {
  priezviskoMeno?: string
  rodneCislo?: string
}
type Errors = Partial<FormErrors<SpaUserInput>> & {
  noAnswer?: string
  noChild?: string
  children?: ChildFormErrors[]
}
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
      (values.danovnikInSpa &&
        parseInputNumber(values.r076a_kupele_danovnik) > 50) ||
      parseInputNumber(values.r076a_kupele_danovnik) < 0
    ) {
      errors.r076a_kupele_danovnik =
        'Zadajte výšku úhrad kúpeľov, maximálne sumu 50 eur'
    }

    if (values.r033_partner_kupele) {
      if (
        !values.r031_priezvisko_a_meno ||
        values.r031_priezvisko_a_meno.length === 0
      ) {
        errors.r031_priezvisko_a_meno =
          'Zadajte meno a priezvisko manželky / manžela.'
      }
      if (!values.r031_rodne_cislo || values.r031_rodne_cislo.length === 0) {
        errors.r031_rodne_cislo = 'Zadajte rodné číslo manželky / manžela'
      } else if (!validateRodneCislo(values.r031_rodne_cislo)) {
        errors.r031_rodne_cislo = 'Zadané rodné číslo nie je správne'
      }

      if (
        !values.r033_partner_kupele_uhrady ||
        values.r033_partner_kupele_uhrady.length === 0
      ) {
        errors.r033_partner_kupele_uhrady =
          'Zadajte výšku úhrad kúpeľov za manželky / manžela'
      }
      if (
        (values.r033_partner_kupele &&
          parseInputNumber(values.r033_partner_kupele_uhrady) > 50) ||
        parseInputNumber(values.r033_partner_kupele_uhrady) < 0
      ) {
        errors.r033_partner_kupele_uhrady =
          'Zadajte výšku úhrad kúpeľov, maximálne sumu 50 eur'
      }
    }

    if (values.childrenInSpa) {
      const maxChildrenAmount = (values.children?.length ?? 0) * 50

      if (maxChildrenAmount === 0) {
        errors.noChild = 'Vyznačte aspoň jedno z detí'
      } else if (
        parseInputNumber(values.r036_deti_kupele) > maxChildrenAmount ||
        parseInputNumber(values.r036_deti_kupele) < 0
      ) {
        errors.r036_deti_kupele = `Zadajte výšku úhrad kúpeľov, maximálne sumu ${maxChildrenAmount} eur`
      }

      if (values.children) {
        const childrenErrors = values.children.map((childValues, index) => {
          const childErrors: ChildFormErrors = {}

          if (
            !childValues.priezviskoMeno ||
            childValues.priezviskoMeno.length === 0
          ) {
            childErrors.priezviskoMeno = 'Zadajte meno a priezvisko dieťaťa'
          }
          if (!childValues.rodneCislo || childValues.rodneCislo.length === 0) {
            childErrors.rodneCislo = 'Zadajte rodné číslo dieťaťa'
          } else if (!validateRodneCislo(childValues.rodneCislo)) {
            childErrors.rodneCislo = 'Zadané rodné číslo nie je správne'
          } else if (
            values.children
              .slice(0, index)
              .find((v) => v.rodneCislo === childValues.rodneCislo)
          ) {
            childErrors.rodneCislo = 'Každé dieťa môže byť zadané iba 1 krát'
          }

          return childErrors
        })

        if (
          childrenErrors.filter((err) => Object.keys(err).length > 0).length > 0
        ) {
          errors.children = childrenErrors as any
        }
      }

      if (!values.r036_deti_kupele) {
        errors.r036_deti_kupele = 'Zadajte výšku úhrad kúpeľov za deti'
      }
    }
  }
  return errors
}

export default Kupele
