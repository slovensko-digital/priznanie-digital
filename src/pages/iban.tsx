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
  const danovyBonus = Number(taxForm.r121);
  const danovyBonusUroky = Number(taxForm.r127);
  const danovyPreplatok = Number(taxForm.r136_danovy_preplatok);
  const spolu = danovyBonus + danovyBonusUroky + danovyPreplatok;

  const Preplatky = (
    <section>
      {taxForm.mozeZiadatVyplatitDanovyBonus && (
        <div>
          <strong>
            Daňový bonus:
          </strong>
          <p>
            {formatCurrency(danovyBonus)}
          </p>
        </div>
      )}
      {taxForm.mozeZiadatVratitDanovyBonusUroky && (
        <div>
          <strong>
            Daňový bonus na zaplatené úroky:
          </strong>
          <p>
            {formatCurrency(danovyBonusUroky)}
          </p>
        </div>
      )}
      {taxForm.mozeZiadatVratitDanovyPreplatok && (
        <div>
          <strong>
            Daňový preplatok:
          </strong>
          <p>
            {formatCurrency(danovyPreplatok)}
          </p>
        </div>
      )}
      {taxForm.mozeZiadatVratitPreplatkyBonusyUroky && (
        <div>
          <strong>
            Spolu:
          </strong>
          <p>
            {formatCurrency(spolu)}
          </p>
        </div>
      )}
    </section>
  );

  if (
    !taxForm.mozeZiadatVratitPreplatkyBonusyUroky
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
          values.ziadamVyplatitDanovyBonusUrokPreplatok
            ? values
            : {
                ...taxBonusInitialInput,
                ziadamVyplatitDanovyBonusziadamVyplatitDanovyBonus: false,
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

            {taxForm.mozeZiadatVratitPreplatkyBonusyUroky && (
              <BooleanRadio
                name="ziadamVyplatitDanovyBonusUrokPreplatok"
                title="Žiadam o vyplatenie daňových bonusov alebo preplatkov"
                hint={Preplatky}
              />
            )}

            {values.ziadamVyplatitDanovyBonusUrokPreplatok && (
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

    if (
      taxForm.mozeZiadatVratitPreplatkyBonusyUroky &&
      typeof values.ziadamVyplatitDanovyBonusUrokPreplatok === 'undefined'
    ) {
      errors.ziadamVyplatitDanovyBonusUrokPreplatok = 'Vyznačte odpoveď na daňový bonus alebo preplatok'
    }

    if (values.ziadamVyplatitDanovyBonusUrokPreplatok) {
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
