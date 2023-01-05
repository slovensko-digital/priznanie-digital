import React from 'react'
import { Form } from 'formik'
import { FormWrapper } from '../../_shared/forms/FormComponents'
import { FormErrors, PartnerUserInput } from '../../_shared/pages/_types/PageUserInputs'
import { numberInputRegexp, validateRodneCislo } from '../../_shared/_utils/utils'
import { PartnerBonusForm } from './_components/PartnerBonusForm'
import { validatePartnerBonusForm } from './_utils/validatePartnerBonusForm'
import { Page } from '../../_shared/pages/Page'
import { partnerUserInitialValues } from '../../_shared/calculation/initialValues'
import { BackLink } from '../../_shared/links/BackLink'
import { ErrorSummary } from '../../_shared/forms/ErrorSummary'

const Partner: Page<PartnerUserInput> = ({
  setTaxFormUserInput,
  taxFormUserInput,
  router,
  previousRoute,
  nextRoute,
}) => {
  return (
    <>
      <BackLink href={previousRoute} />
      <FormWrapper<PartnerUserInput>
        initialValues={taxFormUserInput}
        validate={validate}
        onSubmit={(values, { setFieldValue }) => {
          if (
            values.r032_uplatnujem_na_partnera === false ||
            validatePartnerBonusForm(values, values.partner_step) === false ||
            values.partner_step === 5
          ) {
            const userInput = values.r032_uplatnujem_na_partnera
              ? values
              : {
                  ...partnerUserInitialValues,
                  r032_uplatnujem_na_partnera: false,
                }

            if (!validatePartnerBonusForm(values, values.partner_step)) {
              userInput.r032_partner_vlastne_prijmy = ''
              userInput.r031_priezvisko_a_meno = ''
              userInput.r031_rodne_cislo = ''
              userInput.r032_partner_pocet_mesiacov = ''
              userInput.r032_partner_pocet_mesiacov = ''
            }

            setTaxFormUserInput(userInput)
            router.push(nextRoute)
          } else {
            setFieldValue('partner_step', values.partner_step + 1)
          }
        }}
      >
        {(props) => (
          <Form className="form" noValidate>
            <ErrorSummary errors={props.errors} />
            <PartnerBonusForm
              {...props}
              step={props.values.partner_step}
              setStep={(value) => props.setFieldValue('partner_step', value)}
            />
          </Form>
        )}
      </FormWrapper>
    </>
  )
}

const validate = (values: PartnerUserInput) => {
  const errors: Partial<FormErrors<PartnerUserInput>> = {}

  if (typeof values.r032_uplatnujem_na_partnera === 'undefined') {
    errors.r032_uplatnujem_na_partnera = 'Vyznačte odpoveď'
  }

  if (
    values.partner_step === 1 &&
    typeof values.partner_spolocna_domacnost === 'undefined'
  ) {
    errors.partner_spolocna_domacnost = 'Vyznačte odpoveď'
  }

  if (values.partner_step === 2 && validatePartnerBonusForm(values, 2)) {
    if (typeof values.partner_bonus_uplatneny === 'undefined') {
      errors.partner_bonus_uplatneny = 'Vyznačte odpoveď'
    }
  } else if (values.partner_step === 4 && validatePartnerBonusForm(values, 4)) {
    if (!values.r032_partner_vlastne_prijmy) {
      errors.r032_partner_vlastne_prijmy =
        'Zadajte vlastné príjmy manželky / manžela'
    } else if (!values.r032_partner_vlastne_prijmy.match(numberInputRegexp)) {
      errors.r032_partner_vlastne_prijmy = 'Zadajte príjmy vo formáte 123,45'
    }
  } else if (values.partner_step === 5 && validatePartnerBonusForm(values, 5)) {
    if (!values.r031_priezvisko_a_meno) {
      errors.r031_priezvisko_a_meno =
        'Zadajte meno a priezvisko manželky / manžela.'
    }
    if (!values.r031_rodne_cislo) {
      errors.r031_rodne_cislo = 'Zadajte rodné číslo manželky / manžela'
    } else if (!validateRodneCislo(values.r031_rodne_cislo)) {
      errors.r031_rodne_cislo = 'Zadané rodné číslo nie je správne'
    }

    if (!values.r032_partner_pocet_mesiacov) {
      errors.r032_partner_pocet_mesiacov =
        'Zadajte počet mesiacov, kedy mal/a manželka / manžel príjem.'
    } else if (
      !values.r032_partner_pocet_mesiacov.match(/^\d+$/) ||
      Number.parseInt(values.r032_partner_pocet_mesiacov, 10) < 0 ||
      Number.parseInt(values.r032_partner_pocet_mesiacov, 10) > 12
    ) {
      errors.r032_partner_pocet_mesiacov =
        'Zadajte počet mesiacov - číslo od 0 do 12'
    }
  }

  return errors
}

export { validate, Partner }
