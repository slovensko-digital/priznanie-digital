import React, { useEffect } from 'react'
import Link from 'next/link'
import { Form } from 'formik'
import { useRouter } from 'next/router'
import { NextPage } from 'next'
import { BooleanRadio, FormWrapper, Input } from '../components/FormComponents'
import { FormErrors, TwoPercentUserInput } from '../types/PageUserInputs'
import { TaxFormUserInput } from '../types/TaxFormUserInput'
import { getRoutes } from '../lib/routes'
import styles from './osobne-udaje.module.css'
import { formatPsc } from '../lib/utils'
import { getCity } from '../lib/api'
import { ErrorSummary } from '../components/ErrorSummary'

const { nextRoute, previousRoute } = getRoutes('/dve-percenta')

interface Props {
  setTaxFormUserInput: (values: TwoPercentUserInput) => void
  taxFormUserInput: TaxFormUserInput
}

const DvePercenta: NextPage<Props> = ({
  setTaxFormUserInput,
  taxFormUserInput,
}: Props) => {
  const router = useRouter()
  useEffect(() => {
    router.prefetch(nextRoute())
  })
  return (
    <>
      <Link href={previousRoute()}>
        <a data-test="back" className="govuk-back-link">
          Späť
        </a>
      </Link>
      <FormWrapper<TwoPercentUserInput>
        initialValues={taxFormUserInput}
        validate={validate}
        onSubmit={(values) => {
          setTaxFormUserInput(values)
          router.push(nextRoute())
        }}
      >
        {({ values, errors, touched, setFieldValue }) => (
          <>
            <ErrorSummary<TwoPercentUserInput>
              errors={errors}
              touched={touched}
            />
            <Form className="form" noValidate>
              <BooleanRadio
                title="Chcete poukazat 2 percenta"
                name="XIIoddiel_uplatnujem2percenta"
              />
              {values.XIIoddiel_uplatnujem2percenta && (
                <>
                  <div className={styles.inlineFieldContainer}>
                    <Input
                      className={styles.inlineField}
                      name="r142_obchMeno"
                      type="text"
                      label="Nazov"
                    />
                  </div>
                  <div className={styles.inlineFieldContainer}>
                    <Input
                      className={styles.inlineField}
                      name="r142_ico"
                      type="text"
                      label="ICO"
                    />
                  </div>

                  <h2>Adresa neziskovky</h2>
                  <div className={styles.inlineFieldContainer}>
                    <Input
                      className={styles.inlineField}
                      name="r142_ulica"
                      type="text"
                      label="Ulica"
                    />
                    <Input
                      className={styles.inlineField}
                      name="r142_cislo"
                      type="text"
                      label="Súpisné/orientačné číslo"
                    />
                  </div>
                  <div className={styles.inlineFieldContainer}>
                    <Input
                      className={styles.inlineField}
                      name="r142_psc"
                      type="text"
                      label="PSČ"
                      maxLength={6}
                      onChange={async (event) => {
                        const pscValue = formatPsc(
                          event.currentTarget.value,
                          values.r142_psc,
                        )
                        setFieldValue('r142_psc', pscValue)

                        if (
                          pscValue.length === 6 &&
                          values.r142_obec.length === 0
                        ) {
                          const city = await getCity(pscValue)
                          setFieldValue('r142_obec', city)
                        }
                      }}
                    />

                    <Input
                      className={styles.inlineField}
                      name="r142_obec"
                      type="text"
                      label="Obec"
                    />
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

type Errors = Partial<FormErrors<TwoPercentUserInput>>
export const validate = (values: TwoPercentUserInput): Errors => {
  const errors: Errors = {}

  if (typeof values.XIIoddiel_uplatnujem2percenta === 'undefined') {
    errors.XIIoddiel_uplatnujem2percenta = 'Vyznačte odpoveď'
  }
  if (values.XIIoddiel_uplatnujem2percenta) {
    if (!values.r142_ico) {
      errors.r142_ico = 'Zadajte IČO'
    }

    if (!values.r142_obchMeno) {
      errors.r142_obchMeno = 'Zadajte obchodne meno'
    }

    if (!values.r142_ulica) {
      errors.r142_ulica = 'Zadajte ulicu'
    }

    if (!values.r142_cislo) {
      errors.r142_cislo = 'Zadajte číslo domu'
    }

    const pscNumberFormat = /^\d{3} \d{2}$/
    if (!values.r142_psc) {
      errors.r142_psc = 'Zadajte PSČ'
    } else if (!values.r142_psc.match(pscNumberFormat)) {
      errors.r142_psc = 'PSČ môže obsahovať iba 5 čísel'
    }

    if (!values.r142_obec) {
      errors.r142_obec = 'Zadajte obec'
    }
  }
  return errors
}

export default DvePercenta
