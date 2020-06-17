import React, { useEffect } from 'react'
import Link from 'next/link'
import { Form } from 'formik'
import { useRouter } from 'next/router'
import { NextPage } from 'next'
import { BooleanRadio, FormWrapper } from '../components/FormComponents'
import { FormErrors, PartnerUserInput } from '../types/PageUserInputs'
import { TaxFormUserInput } from '../types/TaxFormUserInput'
import { getRoutes, validateRoute } from '../lib/routes'
import { numberInputRegexp, validateRodneCislo } from '../lib/utils'
import { PartnerIncome } from '../components/PartnerIncome'
import { validatePartnerIncome } from '../lib/validatePartnerIncome'
import { Details } from '../components/Details'
import { TaxForm } from '../types/TaxForm'

interface Props {
  setTaxFormUserInput: (values: PartnerUserInput) => void
  taxFormUserInput: TaxFormUserInput
  taxForm: TaxForm
}

const Partner: NextPage<Props> = ({
  setTaxFormUserInput,
  taxFormUserInput,
  taxForm,
}: Props) => {
  const router = useRouter()

  const { previousRoute } = getRoutes('/partner')
  const { nextRoute } = getRoutes(
    taxForm.eligibleForChildrenBonus ? '/partner' : '/deti',
  )

  useEffect(() => {
    router.prefetch(nextRoute())
    validateRoute(router, taxFormUserInput)
  }, [router, taxFormUserInput, nextRoute])

  return (
    <>
      <Link href={previousRoute()}>
        <a className="govuk-back-link" data-test="back">
          Späť
        </a>
      </Link>
      <FormWrapper<PartnerUserInput>
        initialValues={taxFormUserInput}
        validate={validate}
        onSubmit={(values, { setFieldValue }) => {
          if (
            values.r032_uplatnujem_na_partnera === false ||
            validatePartnerIncome(values, values.partner_step) === false ||
            values.partner_step === 4
          ) {
            setTaxFormUserInput(values)
            router.push(nextRoute())
          } else {
            const setStep = (value) => setFieldValue('partner_step', value)
            setStep(values.partner_step + 1)
          }
        }}
      >
        {(props) => (
          <Form className="form" noValidate>
            <BooleanRadio
              title="Uplatňujete si zvýhodnenie na manželku/manžela, ktorá/ý má nízke alebo žiadne príjmy? "
              name="r032_uplatnujem_na_partnera"
            />
            <Details title="Kedy si môžem uplatniť zvýhodnenie?">
              <>
                <p>
                  Zvýhodnenie si môžete uplatniť, ak manžel/-ka spĺňa aspoň
                  jednu z týchto podmienok:
                </p>
                <ol>
                  <li>
                    staral/-a sa o vyživované maloleté dieťa, ktoré s vami žije
                    v domácnosti;
                  </li>
                  <li>
                    v roku 2019 poberal/-a peňažný príspevok na opatrovanie;
                  </li>
                  <li>
                    bol/-a na úrade práce v evidencii uchádzačov o zamestnanie;
                  </li>
                  <li>
                    je občanom so zdravotným postihnutím alebo s ťažkým
                    zdravotným postihnutím (držiteľom prekazu ŤZP).
                  </li>
                </ol>
              </>
            </Details>
            {props.values.r032_uplatnujem_na_partnera ? (
              <PartnerIncome
                {...props}
                step={props.values.partner_step}
                setStep={(value) => props.setFieldValue('partner_step', value)}
              />
            ) : (
              <button className="govuk-button" type="submit">
                Pokračovať
              </button>
            )}
          </Form>
        )}
      </FormWrapper>
    </>
  )
}

export const validate = (values: PartnerUserInput) => {
  const errors: Partial<FormErrors<PartnerUserInput>> = {}

  if (typeof values.r032_uplatnujem_na_partnera === 'undefined') {
    errors.r032_uplatnujem_na_partnera = 'Vyznačte odpoveď'
  }

  if (values.r032_uplatnujem_na_partnera) {
    if (typeof values.partner_spolocna_domacnost === 'undefined') {
      errors.partner_spolocna_domacnost = 'Vyznačte odpoveď'
    }

    if (values.partner_step === 1 && validatePartnerIncome(values, 1)) {
      if (typeof values.partner_bonus_uplatneny === 'undefined') {
        errors.partner_bonus_uplatneny = 'Vyznačte odpoveď'
      }
    } else if (values.partner_step === 3 && validatePartnerIncome(values, 3)) {
      if (!values.r032_partner_vlastne_prijmy) {
        errors.r032_partner_vlastne_prijmy =
          'Zadajte vlastné príjmy manžela/manželky'
      } else if (!values.r032_partner_vlastne_prijmy.match(numberInputRegexp)) {
        errors.r032_partner_vlastne_prijmy = 'Zadajte príjmy vo formáte 123,45'
      }
    } else if (values.partner_step === 4 && validatePartnerIncome(values, 4)) {
      if (!values.r031_priezvisko_a_meno) {
        errors.r031_priezvisko_a_meno = 'Zadajte meno manžela/manželky.'
      }
      if (!values.r031_rodne_cislo) {
        errors.r031_rodne_cislo = 'Zadajte rodné číslo manžela/manželky'
      } else if (!validateRodneCislo(values.r031_rodne_cislo)) {
        errors.r031_rodne_cislo = 'Zadané rodné číslo nie je správne'
      }

      if (!values.r032_partner_pocet_mesiacov) {
        errors.r032_partner_pocet_mesiacov =
          'Zadajte počet mesiacov, kedy mal/a manžel/manželka príjem.'
      } else if (
        !values.r032_partner_pocet_mesiacov.match(/^\d+$/) ||
        parseInt(values.r032_partner_pocet_mesiacov, 10) < 0 ||
        parseInt(values.r032_partner_pocet_mesiacov, 10) > 12
      ) {
        errors.r032_partner_pocet_mesiacov =
          'Zadajte počet mesiacov - číslo od 0 do 12'
      }
    }
  }

  return errors
}

export default Partner
