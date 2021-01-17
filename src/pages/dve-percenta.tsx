import React, { useRef } from 'react'
import Link from 'next/link'
import { Form, FormikProps } from 'formik'
import {
  BooleanRadio,
  CheckboxSmall,
  FormWrapper,
  Input,
} from '../components/FormComponents'
import { FormErrors, TwoPercentUserInput } from '../types/PageUserInputs'
import styles from './osobne-udaje.module.css'
import { formatIco, formatPsc } from '../lib/utils'
import { getCity, getNgoByName } from '../lib/api'
import { ErrorSummary } from '../components/ErrorSummary'
import { FullNameAutoCompleteInput } from '../components/FullNameAutoCompleteInput'
import { AutoformResponseBody } from '../types/api'
import { Page } from '../components/Page'
import { twoPercentInitialValues } from '../lib/initialValues'
import { Details } from '../components/Details'
import classNames from 'classnames'

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
      r142_pravnaForma: org.legal_form ? `${org.legal_form}`.slice(0, 23) : '',
    })
  }
}

const makePrefillForm = (setValues, ref) => () => {
  setValues({
    XIIoddiel_uplatnujem2percenta: true,
    r142_ico: '50 158 635',
    r142_pravnaForma: 'Občianske združenie',
    r142_obchMeno: 'Slovensko.Digital',
    r142_ulica: 'Staré Grunty',
    r142_cislo: '205/18',
    r142_psc: '841 04',
    r142_obec: 'Bratislava',
  })

  setTimeout(() => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' })
      setTimeout(() => {
        ref.current.focus()
      }, 750)
    }
  }, 250)
}

const DvePercenta: Page<TwoPercentUserInput> = ({
  setTaxFormUserInput,
  taxFormUserInput,
  router,
  previousRoute,
  nextRoute,
}) => {
  const submitButtonRef = useRef(null)

  return (
    <>
      <Link href={previousRoute}>
        <a data-test="back" className="govuk-back-link">
          Späť
        </a>
      </Link>
      <FormWrapper<TwoPercentUserInput>
        initialValues={taxFormUserInput}
        validate={validate}
        onSubmit={(values) => {
          const userInput = values.XIIoddiel_uplatnujem2percenta
            ? values
            : {
                ...twoPercentInitialValues,
                XIIoddiel_uplatnujem2percenta: false,
              }
          setTaxFormUserInput(userInput)
          router.push(nextRoute)
        }}
      >
        {(props) => (
          <>
            <ErrorSummary<TwoPercentUserInput> errors={props.errors} />
            <Form className="form" noValidate>
              <BooleanRadio
                title="Chcete poukázať 2% alebo 3% zaplatenej dane niektorej neziskovej organizácii?"
                name="XIIoddiel_uplatnujem2percenta"
              />
              <div className="box govuk-!-margin-bottom-5">
                <p>
                  Svojimi 2% môžete{' '}
                  <strong>podporiť aj Slovensko.Digital</strong>, ktoré za
                  pomoci dobrovoľníkov pripravilo túto aplikáciu na
                  zjednodušenie podania daňového priznania. Každému darcovi
                  ďakujeme!
                </p>
                <button
                  data-test="prefill-slovensko-digital"
                  className={classNames('govuk-button', 'btn-secondary', {
                    'govuk-button--disabled':
                      props.values.r142_obchMeno === 'Slovensko.Digital' &&
                      props.values.XIIoddiel_uplatnujem2percenta,
                  })}
                  type="button"
                  onClick={makePrefillForm(props.setValues, submitButtonRef)}
                >
                  Podporiť Slovensko.Digital
                </button>
              </div>
              {props.values.XIIoddiel_uplatnujem2percenta && (
                <>
                  <CheckboxSmall
                    name="splnam3per"
                    label="spĺňam podmienky na poukázanie 3% z dane"
                  />
                  <Details title="Kto môže poukázať 3% z dane?">
                    <p className="govuk-hint">
                      Ak ste v predchádzajúcom roku odpracovali viac ako 40
                      hodín dobrovoľníckej činnosti, môže vám organizácia, pre
                      ktorú ste túto dobrovoľnícku činnosť vykonávali, vystaviť{' '}
                      <strong>
                        Potvrdenie o odpracovaní minimálne 40 hodín
                        dobrovoľníckych aktivít
                      </strong>
                      .
                    </p>
                    <p className="govuk-hint">
                      Svoje 3% dane možete darovať ktorejkoľvek príspevkovej
                      organizácii. Nemusíte ich darovať organizácii, v ktorej
                      ste daných 40 hodín odpracovali.
                    </p>
                    <p className="govuk-hint">
                      Potvrdenie je nutné priložiť k daňovému priznaniu.
                    </p>
                  </Details>

                  <h2 className="govuk-heading-l">Údaje o prijímateľovi</h2>
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
                    <Input
                      className={styles.inlineField}
                      name="r142_pravnaForma"
                      type="text"
                      label="Právna forma"
                      maxLength={23}
                    />
                  </div>

                  <h2 className="govuk-heading-l">Sídlo</h2>
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

                  <h2 className="govuk-heading-l">Súhlas so zaslaním údajov</h2>
                  <CheckboxSmall
                    name="XIIoddiel_suhlasZaslUdaje"
                    label="súhlasím so zaslaním údajov (meno, priezvisko a adresa trvalého pobytu) mnou určenému prijímateľovi podielu zaplatenej dane"
                  />
                </>
              )}
              <button
                data-test="next"
                className="govuk-button"
                type="submit"
                ref={submitButtonRef}
              >
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
    const icoNumberFormat = /^\d{2} \d{3} (\d|\d{3})$/
    if (!values.r142_ico) {
      errors.r142_ico = 'Zadajte IČO'
    } else if (!values.r142_ico.match(icoNumberFormat)) {
      errors.r142_ico = 'Zadajte správne IČO'
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
