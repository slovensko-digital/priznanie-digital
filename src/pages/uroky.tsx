import React from 'react'
import Link from 'next/link'
import { Form } from 'formik'
import { FormWrapper } from '../components/FormComponents'
import { FormErrors, UrokyUserInput } from '../types/PageUserInputs'
import { ErrorSummary } from '../components/ErrorSummary'
import { Page } from '../components/Page'
import { UrokyBonusForm } from '../components/UrokyBonusForm'
import { urokyInitialValues } from '../lib/initialValues'
import { validateUrokyBonusForm } from '../lib/validateUrokyBonusForm'
import { TAX_YEAR, UROKY_POCET_ROKOV } from '../lib/calculation'
import { numberInputRegexp, parseInputNumber } from '../lib/utils'
import Decimal from 'decimal.js'

const Uroky: Page<UrokyUserInput> = ({
  taxFormUserInput,
  setTaxFormUserInput,
  router,
  previousRoute,
  nextRoute,
}) => {
  return (
    <>
      <Link href={previousRoute} data-test="back" className="govuk-back-link">
        Späť
      </Link>
      <FormWrapper<UrokyUserInput>
        initialValues={taxFormUserInput}
        validate={validate}
        onSubmit={(values, { setFieldValue }) => {
          if (
            values.r035_uplatnuje_uroky === false ||
            validateUrokyBonusForm(values, values.hypoteka_step) === false ||
            values.hypoteka_step === 6
          ) {
            const userInput = values.r035_uplatnuje_uroky
            ? values
            : {
              ...urokyInitialValues,
              r035_uplatnuje_uroky: false,
            }

            if (!validateUrokyBonusForm(values, values.hypoteka_step)) {
              userInput.r035_zaplatene_uroky = ''
            }

            setTaxFormUserInput(userInput)
            router.push(nextRoute)
          } else {
            setFieldValue('hypoteka_step', values.hypoteka_step + 1)
          }
        }}
      >
        {(props) => (
          <Form className="form" noValidate>
            <ErrorSummary errors={props.errors} />
            <UrokyBonusForm
              {...props}
              step={props.values.hypoteka_step}
              setStep={(value) => props.setFieldValue('hypoteka_step', value)}
            />
          </Form>
        )}
      </FormWrapper>
    </>
  )
}

export const validate = (values: UrokyUserInput) => {
  const errors: Partial<FormErrors<UrokyUserInput>> = {}
  if (typeof values.r035_uplatnuje_uroky === 'undefined') {
    errors.r035_uplatnuje_uroky = 'Vyznačte odpoveď'
  }

  if (
    values.hypoteka_step === 1 &&
    typeof values.uroky_dalsi_uver_uplatnuje === 'undefined'
  ) {
    errors.uroky_dalsi_uver_uplatnuje = 'Vyznačte odpoveď'
  } else if (values.hypoteka_step === 2 && validateUrokyBonusForm(values, 2)) {
    if (typeof values.uroky_rok_uzatvorenia === 'undefined') {
      errors.uroky_rok_uzatvorenia = 'Zadajte rok'
    } else {
      const rok = Number.parseInt(values.uroky_rok_uzatvorenia, 10)
      if (rok > TAX_YEAR) {
        errors.uroky_rok_uzatvorenia = 'Rok uzatvorenia úveru nemôže byť v budúcnosti'
      }
    }

    const ziaciatok_urocenia_den = Number.parseInt(values.uroky_zaciatok_urocenia_den, 10)
    const zaciatok_urocenia_mesiac = Number.parseInt(values.uroky_zaciatok_urocenia_mesiac, 10)
    const zaciatok_urocenia_rok = Number.parseInt(values.uroky_zaciatok_urocenia_rok, 10)
    const zaciatok_urocenia = new Date(zaciatok_urocenia_rok, zaciatok_urocenia_mesiac - 1, ziaciatok_urocenia_den)

    if (zaciatok_urocenia.getDate() !== ziaciatok_urocenia_den) {
      errors.uroky_zaciatok_urocenia_den = 'Zadajte deň v správnom tvare'
    }
    if ((zaciatok_urocenia.getMonth() + 1) !== zaciatok_urocenia_mesiac) {
      errors.uroky_zaciatok_urocenia_mesiac = 'Zadajte mesiac v správnom tvare'
    }
    if (zaciatok_urocenia.getFullYear() !== zaciatok_urocenia_rok) {
      errors.uroky_zaciatok_urocenia_rok = 'Zadajte rok v správnom tvare'
    }

    if (zaciatok_urocenia.getFullYear() < TAX_YEAR - UROKY_POCET_ROKOV) {
      errors.uroky_zaciatok_urocenia_rok = `Rok začiatku úročenia nemôže byť skôr ako ${TAX_YEAR - UROKY_POCET_ROKOV}`
    }

    if (zaciatok_urocenia.getFullYear() > TAX_YEAR) {
      errors.uroky_zaciatok_urocenia_rok = `Rok začiatku úročenia môže byť najviac ${TAX_YEAR}`
    }
  } else if (values.hypoteka_step === 3 && validateUrokyBonusForm(values, 3)) {
    if (typeof values.uroky_dalsi_dlznik === 'undefined') {
      errors.uroky_dalsi_dlznik = 'Vyznačte odpoveď'
    } else {
      if (values.uroky_dalsi_dlznik) {
        if (typeof values.uroky_pocet_dlznikov === 'undefined') {
          errors.uroky_pocet_dlznikov = 'Zadajte počet dlžníkov'
        } else if (!values.uroky_pocet_dlznikov.match(/^\d+$/)) {
          errors.uroky_pocet_dlznikov = 'Zadajte počet dlžníkov vo formáte čísla napr. 5'
        } else if (Number.parseInt(values.uroky_pocet_dlznikov, 10) < 2) {
          errors.uroky_pocet_dlznikov = 'Počet dlžníkov musí byť aspoň 2'
        }
      }
    }
  } else if (values.hypoteka_step === 4 && validateUrokyBonusForm(values, 4)) {
    if (typeof values.uroky_splnam_vek_kriteria === 'undefined') {
      errors.uroky_splnam_vek_kriteria = 'Vyznačte odpoveď'
    }
  } else if (values.hypoteka_step === 5 && validateUrokyBonusForm(values, 5)) {
    if (typeof values.uroky_splnam_prijem === 'undefined') {
      errors.uroky_splnam_prijem = 'Vyznačte odpoveď'
    }
  } else if (values.hypoteka_step === 6 && validateUrokyBonusForm(values, 6)) {
    if (typeof values.r035_zaplatene_uroky === 'undefined') {
      errors.r035_zaplatene_uroky = 'Zadajte zaplatené úroky'
    } else if (!values.r035_zaplatene_uroky.match(numberInputRegexp)) {
      errors.r035_zaplatene_uroky = 'Zadajte zaplatené úroky vo formáte 123,45'
    } else if (!new Decimal(parseInputNumber(values.r035_zaplatene_uroky)).lessThanOrEqualTo(new Decimal(9999.99))) {
      errors.r035_zaplatene_uroky = 'Zaplatené úroky môžu byť maximálne 9999,99'
    }
  }

  return errors
}

export default Uroky
