import React from 'react'
import { Form, FormikProps } from 'formik'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { NextPage } from 'next'
import { FormWrapper, Input } from '../../_components/form/FormComponents'
import styles from '../../../pages/osobne-udaje.module.css'
import {
  FormErrors,
  PersonalInformationPostponePage,
} from '../../../types/PageUserInputs'
import { getAutoformByPersonName } from '../../../lib/api'
import { getPostponeRoutes } from '../../../lib/routes'
import {
  AutoCompleteData,
  AutoCompleteInput,
} from '../../_components/form/AutoCompleteInput'
import { PostponeUserInput } from '../../../types/PostponeUserInput'
import { ErrorSummary } from '../../_components/form/ErrorSummary'
import { formatPsc, parseFullName } from '../../../lib/utils'

const { nextRoute, previousRoute } = getPostponeRoutes('/odklad/osobne-udaje')

const makeHandlePersonAutoform = ({
  setValues,
  values,
}: FormikProps<PersonalInformationPostponePage>) => {
  return (person: AutoCompleteData) => {
    const { first, last, title } = parseFullName(person.name)

    setValues({
      ...values,
      meno_priezvisko: person.name || '',
      priezvisko: last || '',
      meno: first || '',
      titul: title || '',
      dic: person?.tin || '',
      ulica: person.street || person.municipality || '',
      cislo: person.street_number || '',
      psc: person.postal_code ? formatPsc(person.postal_code) : '',
      obec: person.municipality || '',
      stat: person.country || '',
    })
  }
}

interface Props {
  setPostponeUserInput: (values: PersonalInformationPostponePage) => void
  postponeUserInput: PostponeUserInput
}
const OsobneUdaje: NextPage<Props> = ({
  setPostponeUserInput,
  postponeUserInput,
}: Props) => {
  const router = useRouter()

  return (
    <>
      <Link href={previousRoute} data-test="back" className="govuk-back-link">
        Späť
      </Link>
      <FormWrapper<PersonalInformationPostponePage>
        initialValues={postponeUserInput}
        validate={validate}
        onSubmit={(values) => {
          setPostponeUserInput(values)
          router.push(nextRoute)
        }}
      >
        {(props) => (
          <>
            <ErrorSummary<PersonalInformationPostponePage>
              errors={props.errors}
            />
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
                  name="titul"
                  type="text"
                  label="Titul"
                />
              </div>

              <Input
                className={styles.wideField}
                name="meno"
                type="text"
                label="Meno"
                width="auto"
              />

              <Input
                className={styles.wideField}
                name="priezvisko"
                type="text"
                label="Priezvisko"
                width="auto"
              />

              <div className={styles.inlineFieldContainer}>
                <Input
                  className={styles.inlineField}
                  name="dic"
                  type="text"
                  label="DIČ"
                  hint="Ak nie je pridelené, uvádza sa rodné číslo"
                />
              </div>

              <h2 className="govuk-heading-l">Adresa trvalého pobytu</h2>
              <div className={styles.inlineFieldContainer}>
                <Input
                  className={styles.inlineField}
                  name="ulica"
                  type="text"
                  label="Ulica"
                />
                <Input
                  className={styles.inlineField}
                  name="cislo"
                  type="text"
                  label="Súpisné/orientačné číslo"
                />
              </div>
              <div className={styles.inlineFieldContainer}>
                <Input
                  className={styles.inlineField}
                  name="psc"
                  type="text"
                  label="PSČ"
                  maxLength={6}
                  onChange={async (event) => {
                    const pscValue = formatPsc(
                      event.currentTarget.value,
                      props.values.psc,
                    )
                    props.setFieldValue('psc', pscValue)
                  }}
                />

                <Input
                  className={styles.inlineField}
                  name="obec"
                  type="text"
                  label="Obec"
                />
              </div>

              <Input name="stat" type="text" label="Štát" />

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

const validate = (values: PersonalInformationPostponePage) => {
  const errors: Partial<FormErrors<PersonalInformationPostponePage>> = {}

  if (!values.dic) {
    errors.dic = 'Zadajte pridelené DIČ'
  } else if (values.dic.length < 9 || values.dic.length > 10) {
    /**
     * @see https://ec.europa.eu/taxation_customs/tin/pdf/sk/TIN_-_subject_sheet_-_2_structure_and_specificities_sk.pdf
     */
    errors.dic = 'DIČ musí mať minimálne 9 znakov a maximálne 10 znakov'
  }

  if (!values.meno) {
    errors.meno = 'Zadajte vaše meno'
  }

  if (!values.priezvisko) {
    errors.priezvisko = 'Zadajte vaše priezvisko'
  }

  if (!values.cislo) {
    errors.cislo = 'Zadajte číslo domu'
  }

  const pscNumberFormat = /^\d{3} \d{2}$/
  if (!values.psc) {
    errors.psc = 'Zadajte PSČ'
  } else if (!pscNumberFormat.test(values.psc)) {
    errors.psc = 'PSČ môže obsahovať iba 5 čísel'
  }

  if (!values.obec) {
    errors.obec = 'Zadajte obec'
  }

  if (!values.stat) {
    errors.stat = 'Zadajte štát'
  }

  return errors
}

export { validate, OsobneUdaje }
