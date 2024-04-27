import React from 'react'
import Link from 'next/link'
import { FormErrors, TaxBonusUserInput } from '../types/PageUserInputs'
import { Form, FormikProps } from 'formik'
import { ErrorSummary } from '../components/ErrorSummary'
import { BooleanRadio, FormWrapper, Input } from '../components/FormComponents'
import {
  formatCurrency,
  formatIban,
  validateIbanCountry,
  validateIbanFormat,
} from '../lib/utils'
import { Page } from '../components/Page'
import { taxBonusInitialInput } from '../lib/initialValues'
import { TaxForm } from '../types/TaxForm'
import { BackLink } from '../components/BackLink'

const Iban: Page<TaxBonusUserInput> = ({
  taxForm,
  taxFormUserInput,
  setTaxFormUserInput,
  router,
  previousRoute,
  nextRoute,
}) => {
  if (
    !taxForm.mozeZiadatVyplatitDanovyBonus &&
    !taxForm.mozeZiadatVratitDanovyPreplatok &&
    !taxForm.mozeZiadatVratitDanovyBonusUroky
  ) {
    return (
      <>
        <p data-test="ineligible-message">
          Nemáte nárok na vyplatenie daňového bonusu, rozdielu daňového bonusu
          ani na vrátenie daňového preplatku
        </p>
        <Link href={nextRoute} legacyBehavior>
          <button
            data-test="next"
            className="govuk-button govuk-!-margin-top-3"
            type="button"
          >
            Pokračovať
          </button>
        </Link>
      </>
    )
  }

  return (
    <FormWrapper<TaxBonusUserInput>
      initialValues={taxFormUserInput}
      validate={makeValidate(taxForm)}
      onSubmit={(values) => {
        const userInput =
          values.ziadamVratitPreplatok
            ? values
            : {
              ...taxBonusInitialInput,
              ziadamVratitPreplatok: false
            }
        setTaxFormUserInput(userInput)
        router.push(nextRoute)
      }}
    >
      {({ values, errors, setFieldValue }: FormikProps<TaxBonusUserInput>) => (
        <>
          <BackLink href={previousRoute} />
          <Form className="form" noValidate>
            <ErrorSummary<TaxBonusUserInput> errors={errors} />
            <p className="govuk-body">Máte nárok na vyplatenie:</p>
            <ul className='govuk-list govuk-list--bullet'>
              {taxForm.mozeZiadatVyplatitDanovyBonus && <li>daňového bonusu vo výške {formatCurrency(taxForm.r121.toNumber())}</li>}
              {taxForm.mozeZiadatVratitDanovyPreplatok && <li>daňového preplatku vo výške {formatCurrency(taxForm.r136_danovy_preplatok.toNumber())}</li>}
              {taxForm.mozeZiadatVratitDanovyBonusUroky && <li>daňového bonusu na zaplatené úroky vo výške {formatCurrency(taxForm.r127.toNumber())}</li>}
            </ul>
            <BooleanRadio
              name="ziadamVratitPreplatok"
              title="Žiadam o vrátenie"
            />
            {(values.ziadamVratitPreplatok) && (
              <Input
                name="iban"
                type="text"
                label="IBAN"
                hint="Účet musí byť vedený v banke na Slovensku pod vašim menom."
                maxLength={29}
                onChange={(event) => {
                  const iban = formatIban(
                    event.currentTarget.value,
                    values.iban,
                  )
                  setFieldValue('iban', iban)
                }}
              />
            )}
            <button data-test="next" className="govuk-button" type="submit">
              Pokračovať
            </button>
          </Form>
        </>
      )}
    </FormWrapper>
  )
}

export default Iban

export const makeValidate =
  (taxForm: TaxForm) => (values: TaxBonusUserInput) => {
    const errors: Partial<FormErrors<TaxBonusUserInput>> = {}

    const mozeZiadat = taxForm.mozeZiadatVyplatitDanovyBonus || taxForm.mozeZiadatVratitDanovyPreplatok || taxForm.mozeZiadatVratitDanovyBonusUroky

    if (mozeZiadat && typeof values.ziadamVratitPreplatok === 'undefined') {
      errors.ziadamVratitPreplatok =
        'Vyznačte odpoveď na daňový preplatok'
    }

    if (values.ziadamVratitPreplatok) {
      if (!values.iban || values.iban === '') {
        // Medzinárodné bankové číslo účtu (angl. International Bank Account Number, skr. IBAN)
        errors.iban = 'Zadajte váš IBAN'
      } else if (!validateIbanFormat(values.iban)) {
        errors.iban = 'Zadajte váš IBAN v správnom formáte'
      } else if (!validateIbanCountry(values.iban)) {
        errors.iban = 'Zadajte slovenský IBAN'
      }
    }

    return errors
  }
