import React, { useEffect } from 'react'
import { Form, FormikProps } from 'formik'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { NextPage } from 'next'
import { FormWrapper, Input } from '../components/FormComponents'
import styles from './osobne-udaje.module.css'
import {
  PersonalInformationUserInput,
  FormErrors,
} from '../types/PageUserInputs'
import { TaxFormUserInput } from '../types/TaxFormUserInput'
import { getCity } from '../lib/api'
import { AutoformResponseBody } from '../types/api'
import { getRoutes } from '../lib/routes'
import { ErrorSummary } from '../components/ErrorSummary'
import { FullNameAutoCompleteInput } from '../components/FullNameAutoCompleteInput'
import { formatPsc } from '../lib/utils'
import { Nace } from '../components/Nace'

const { nextRoute, previousRoute } = getRoutes('/osobne-udaje')

const makeHandlePersonAutoform = ({
  setValues,
  values,
}: FormikProps<PersonalInformationUserInput>) => {
  return (person: AutoformResponseBody) => {
    setValues({
      ...values,
      meno_priezvisko: person.name,
      r001_dic: person?.tin ?? values.r001_dic,
      r007_ulica: person.street ?? person.municipality,
      r008_cislo: person.street_number,
      r009_psc: person.postal_code ? formatPsc(person.postal_code) : '',
      r010_obec: person.municipality,
      r011_stat: person.country,
    })
  }
}

interface Props {
  setTaxFormUserInput: (values: PersonalInformationUserInput) => void
  taxFormUserInput: TaxFormUserInput
}
const OsobneUdaje: NextPage<Props> = ({
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
      <FormWrapper<PersonalInformationUserInput>
        initialValues={taxFormUserInput}
        validate={validate}
        onSubmit={(values) => {
          setTaxFormUserInput(values)
          router.push(nextRoute())
        }}
      >
        {(props) => (
          <>
            <ErrorSummary<PersonalInformationUserInput>
              errors={props.errors}
              touched={props.touched}
            />
            <Form className="form">
              <h2>Údaje o daňovníkovi</h2>
              <p>
                Údaje môžete vyhladať a automaticky vyplniť podľa mena a
                priezviska.
              </p>

              <FullNameAutoCompleteInput
                handlePersonAutoform={makeHandlePersonAutoform(props)}
              />

              <Nace label="NACE" />
              <div className={styles.inlineFieldContainer}>
                <Input
                  className={styles.inlineField}
                  name="r001_dic"
                  type="text"
                  label="DIČ"
                />
              </div>

              <h2>Adresa trvalého pobytu</h2>
              <div className={styles.inlineFieldContainer}>
                <Input
                  className={styles.inlineField}
                  name="r007_ulica"
                  type="text"
                  label="Ulica"
                />
                <Input
                  className={styles.inlineField}
                  name="r008_cislo"
                  type="text"
                  label="Súpisné/orientačné číslo"
                />
              </div>
              <div className={styles.inlineFieldContainer}>
                <Input
                  className={styles.inlineField}
                  name="r009_psc"
                  type="text"
                  label="PSČ"
                  maxLength={6}
                  onChange={async (event) => {
                    const pscValue = formatPsc(
                      event.currentTarget.value,
                      props.values.r009_psc,
                    )
                    props.setFieldValue('r009_psc', pscValue)

                    if (
                      pscValue.length === 6 &&
                      props.values.r010_obec.length === 0
                    ) {
                      const city = await getCity(pscValue)
                      props.setFieldValue('r010_obec', city)
                    }
                  }}
                />

                <Input
                  className={styles.inlineField}
                  name="r010_obec"
                  type="text"
                  label="Obec"
                />
              </div>

              <Input name="r011_stat" type="text" label="Štát" />

              <button className="govuk-button" type="submit">
                Pokračovať
              </button>
            </Form>
          </>
        )}
      </FormWrapper>
    </>
  )
}

export const validate = (values: PersonalInformationUserInput) => {
  const errors: Partial<FormErrors<PersonalInformationUserInput>> = {}

  if (!values.r001_dic) {
    errors.r001_dic = 'Zadajte pridelené DIČ'
  }

  /**
   * @see https://ec.europa.eu/taxation_customs/tin/pdf/sk/TIN_-_subject_sheet_-_2_structure_and_specificities_sk.pdf
   */
  if (values.r001_dic.length < 9) {
    errors.r001_dic = 'DIČ môže mať minimálne 9 znakov'
  }
  if (values.r001_dic.length > 10) {
    errors.r001_dic = 'DIČ môže mať maximálne 10 znakov'
  }

  if (!values.meno_priezvisko) {
    errors.meno_priezvisko = 'Zadajte vaše meno a priezvisko'
  }

  if (!values.r007_ulica) {
    errors.r007_ulica = 'Zadajte ulicu'
  }

  if (!values.r008_cislo) {
    errors.r008_cislo = 'Zadajte číslo domu'
  }

  const pscNumberFormat = /^\d{3} \d{2}$/
  if (!values.r009_psc) {
    errors.r009_psc = 'Zadajte PSČ'
  } else if (!values.r009_psc.match(pscNumberFormat)) {
    errors.r009_psc = 'PSČ môže obsahovať iba 5 čísel'
  }

  if (!values.r010_obec) {
    errors.r010_obec = 'Zadajte obec'
  }

  if (!values.r011_stat) {
    errors.r011_stat = 'Zadajte štát'
  }

  return errors
}

export default OsobneUdaje
