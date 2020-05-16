import React, { useEffect } from 'react'
import Link from 'next/link'
import { Form, FormikProps } from 'formik'
import { useRouter } from 'next/router'
import { NextPage } from 'next'
import {
  BooleanRadio,
  CheckboxSmall,
  FormWrapper,
  Input,
} from '../components/FormComponents'
import { FormErrors, TwoPercentUserInput } from '../types/PageUserInputs'
import { TaxFormUserInput } from '../types/TaxFormUserInput'
import { getRoutes } from '../lib/routes'
import styles from './osobne-udaje.module.css'
import { formatIco, formatPsc } from '../lib/utils'
import { getCity, getNgoByName } from '../lib/api'
import { ErrorSummary } from '../components/ErrorSummary'
import { FullNameAutoCompleteInput } from '../components/FullNameAutoCompleteInput'
import { AutoformResponseBody } from '../types/api'

const { nextRoute, previousRoute } = getRoutes('/dve-percenta')

const makeHandleOrganisationAutoform = ({
  setValues,
  values,
}: FormikProps<TwoPercentUserInput>) => {
  return (org: AutoformResponseBody) => {
    setValues({
      ...values,
      r142_obchMeno: org.name || '',
      r142_ico: org.cin ? formatIco(org.cin) : '',
      r142_ulica: org.street || org.municipality || '',
      r142_cislo: org.street_number || '',
      r142_psc: org.postal_code ? formatPsc(org.postal_code) : '',
      r142_obec: org.municipality || '',
    })
  }
}

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
        {(props) => (
          <>
            <ErrorSummary<TwoPercentUserInput>
              errors={props.errors}
              touched={props.touched}
            />
            <Form className="form" noValidate>
              <BooleanRadio
                title="Chcete poukazat 2 percenta?"
                name="XIIoddiel_uplatnujem2percenta"
              />
              {props.values.XIIoddiel_uplatnujem2percenta && (
                <>
                  <h2>Údaje o prijímateľovi</h2>
                  <p>
                    Údaje môžete vyhladať a automaticky vyplniť podľa názvu.
                  </p>

                  <FullNameAutoCompleteInput
                    name="r142_obchMeno"
                    label="Názov neziskovej organizácie alebo občianskeho združenia"
                    handlePersonAutoform={makeHandleOrganisationAutoform(props)}
                    fetchData={getNgoByName}
                  />

                  <div className={styles.inlineFieldContainer}>
                    <Input
                      className={styles.inlineField}
                      name="r142_ico"
                      type="text"
                      label="IČO"
                      maxLength={10}
                      onChange={async (event) => {
                        const icoValue = formatIco(
                          event.currentTarget.value,
                          props.values.r142_ico,
                        )
                        props.setFieldValue('r142_ico', icoValue)
                      }}
                    />
                  </div>

                  <h2>Sídlo</h2>
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
                          props.values.r142_psc,
                        )
                        props.setFieldValue('r142_psc', pscValue)

                        if (
                          pscValue.length === 6 &&
                          props.values.r142_obec.length === 0
                        ) {
                          const city = await getCity(pscValue)
                          props.setFieldValue('r142_obec', city)
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

                  <h2>Súhlas so zaslaním údajov</h2>
                  <CheckboxSmall
                    name="XIIoddiel_suhlasZaslUdaje"
                    label="súhlasím so zaslaním údajov (meno, priezvisko a adresa trvalého pobytu) mnou určenému prijímateľovi podielu zaplatenej dane"
                  />
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

    if (!values.XIIoddiel_suhlasZaslUdaje) {
      errors.XIIoddiel_suhlasZaslUdaje =
        'Musíte súhlasiť so zaslaním údajov prijímateľovi'
    }
  }
  return errors
}

export default DvePercenta
