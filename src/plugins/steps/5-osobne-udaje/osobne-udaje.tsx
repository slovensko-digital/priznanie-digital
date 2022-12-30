import React from 'react'
import { Form, FormikProps } from 'formik'
import Link from 'next/link'
import { FormWrapper, Input } from '../../_components/form/FormComponents'
import styles from './osobne-udaje.module.css'
import {
  PersonalInformationUserInput,
  FormErrors,
} from '../../../types/PageUserInputs'
import { getAutoformByPersonName } from '../../../lib/api'
import { ErrorSummary } from '../../_components/form/ErrorSummary'
import {
  AutoCompleteData,
  AutoCompleteInput,
} from '../../_components/form/AutoCompleteInput'
import { formatPsc, parseFullName } from '../../../lib/utils'
import { Nace } from '../../../components/Nace'
import { Page } from '../../../components/Page'

const formatNace = (economicActivity) => {
  const { code, name } = economicActivity || {}
  if (code && name) {
    return `${code} - ${name}`
  }
  return ''
}

const makeHandlePersonAutoform = ({
  setValues,
}: FormikProps<PersonalInformationUserInput>) => {
  return (person: AutoCompleteData) => {
    const { first, last, title } = parseFullName(person.name)

    setValues({
      meno_priezvisko: person.name,
      r004_priezvisko: last || '',
      r005_meno: first || '',
      r006_titul: title || '',
      r001_dic: person?.tin || '',
      r003_nace: formatNace(person.main_economic_activity),
      r007_ulica: person.street || person.municipality || '',
      r008_cislo: person.street_number || '',
      r009_psc: person.postal_code ? formatPsc(person.postal_code) : '',
      r010_obec: person.municipality || '',
      r011_stat: person.country || '',
    })
  }
}

const OsobneUdaje: Page<PersonalInformationUserInput> = ({
  setTaxFormUserInput,
  taxFormUserInput,
  router,
  previousRoute,
  nextRoute,
}) => {
  return (
    <>
      <Link href={previousRoute} data-test="back" className="govuk-back-link">
        Späť
      </Link>
      <FormWrapper<PersonalInformationUserInput>
        initialValues={taxFormUserInput}
        validate={validate}
        onSubmit={(values) => {
          setTaxFormUserInput(values)
          router.push(nextRoute)
        }}
      >
        {(props) => (
          <>
            <ErrorSummary<PersonalInformationUserInput> errors={props.errors} />
            <Form className="form">
              <h2 className="govuk-heading-l">Údaje o daňovníkovi</h2>
              <p>
                Údaje môžete vyhladať a automaticky vyplniť podľa mena a
                priezviska.
              </p>

              <AutoCompleteInput
                name="meno_priezvisko"
                label="Zadajte meno, priezvisko alebo podnikateľský názov"
                onSelect={makeHandlePersonAutoform(props)}
                fetchData={async (name) => {
                  const data = await getAutoformByPersonName(name)
                  return data.map((item) => ({
                    ...item,
                    id: item.id,
                    value: `${item.name} ${item.formatted_address}`,
                  }))
                }}
              />

              <div className={styles.inlineFieldContainer}>
                <Input
                  className={styles.inlineField}
                  name="r006_titul"
                  type="text"
                  label="Titul"
                />
              </div>

              <Input
                className={styles.wideField}
                name="r005_meno"
                type="text"
                label="Meno"
                width="auto"
              />

              <Input
                className={styles.wideField}
                name="r004_priezvisko"
                type="text"
                label="Priezvisko"
                width="auto"
              />

              <Nace />

              <div className={styles.inlineFieldContainer}>
                <Input
                  className={styles.inlineField}
                  name="r001_dic"
                  type="text"
                  label="DIČ"
                  hint="Ak nie je pridelené, uvádza sa rodné číslo"
                />
              </div>

              <h2 className="govuk-heading-l">Adresa trvalého pobytu</h2>
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

const validate = (values: PersonalInformationUserInput) => {
  const errors: Partial<FormErrors<PersonalInformationUserInput>> = {}

  if (!values.r001_dic) {
    errors.r001_dic = 'Zadajte pridelené DIČ'
  } else if (values.r001_dic.length < 9 || values.r001_dic.length > 10) {
    /**
     * @see https://ec.europa.eu/taxation_customs/tin/pdf/sk/TIN_-_subject_sheet_-_2_structure_and_specificities_sk.pdf
     */
    errors.r001_dic = 'DIČ musí mať minimálne 9 znakov a maximálne 10 znakov'
  }

  if (!values.r005_meno) {
    errors.r005_meno = 'Zadajte vaše meno'
  }

  if (!values.r004_priezvisko) {
    errors.r004_priezvisko = 'Zadajte vaše priezvisko'
  }

  if (!values.r008_cislo) {
    errors.r008_cislo = 'Zadajte číslo domu'
  }

  const pscNumberFormat = /^\d{3} \d{2}$/
  if (!values.r009_psc) {
    errors.r009_psc = 'Zadajte PSČ'
  } else if (!pscNumberFormat.test(values.r009_psc)) {
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

export { validate, OsobneUdaje }
