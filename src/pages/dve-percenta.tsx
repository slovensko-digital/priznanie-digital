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
import { getNgoByName } from '../lib/api'
import { formatCurrency } from '../lib/utils'
import { calculate, donateOnly3Percent, MIN_2_PERCENT_CALCULATED_DONATION } from '../lib/calculation'
import { ErrorSummary } from '../components/ErrorSummary'
import {
  AutoCompleteData,
  AutoCompleteInput,
} from '../components/AutoCompleteInput'

import { Page } from '../components/Page'
import { twoPercentInitialValues } from '../lib/initialValues'
import { Details } from '../components/Details'
import classNames from 'classnames'

const makeHandleOrganisationAutoform = ({
  setValues,
  values,
}: FormikProps<TwoPercentUserInput>) => {
  return (org: AutoCompleteData) => {
    setValues({
      ...values,
      r142_obchMeno: org.name || '',
      r142_ico: org.cin || '',
    })
  }
}

const makePrefillForm =
  ({ setValues, values }: FormikProps<TwoPercentUserInput>, ref) =>
  () => {
    setValues({
      ...values,
      XIIoddiel_uplatnujem2percenta: true,
      r142_ico: '50 158 635',
      r142_obchMeno: 'Slovensko.Digital',
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
  const calculatedTax = calculate(taxFormUserInput)

  const uplatnenie2PercentHint = donateOnly3Percent(calculatedTax) ? 
    `Bohužiaľ, nespĺňate podmienky pre darovanie 2%, avšak spĺňate podmienky pre darovanie 3% zaplatenej dane (${formatCurrency(calculatedTax.suma_3_percenta.toNumber())})` :
    `Spĺňate podmienky a môžete poukázať ${formatCurrency(calculatedTax.suma_2_percenta.toNumber())}`

  const previousPageLink = (
    <Link href={previousRoute} data-test="back" className="govuk-back-link">
      Späť
    </Link>
  )

  if (!calculatedTax.canDonateTwoPercentOfTax) {
    return (
      <>
        {previousPageLink}
        <h1 className="govuk-heading-l">
          Poukázanie 2% alebo 3% zaplatenej dane neziskovej organizácii
        </h1>
        <p data-test="ineligible-message">
          Táto suma musí byť minimálne {formatCurrency(MIN_2_PERCENT_CALCULATED_DONATION)}.<br/>
          Bohužiaľ, nespĺňate podmienky pre darovanie 2% ani 3% zaplatenej dane
        </p>
        <Link href={nextRoute} legacyBehavior>
          <button className="govuk-button govuk-!-margin-top-4" type="button">
            Pokračovať
          </button>
        </Link>
      </>
    )
  }

  return (
    <>
      {previousPageLink}
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
                hint={uplatnenie2PercentHint}
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
                  onClick={makePrefillForm(props, submitButtonRef)}
                >
                  Podporiť Slovensko.Digital
                </button>
              </div>
              {props.values.XIIoddiel_uplatnujem2percenta && (
                <>
                  <CheckboxSmall
                    name="splnam3per"
                    label={`spĺňam podmienky na poukázanie 3% z dane (${formatCurrency(calculatedTax.suma_3_percenta.toNumber())})`}
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

                  <AutoCompleteInput
                    name="r142_obchMeno"
                    label="Názov neziskovej organizácie alebo občianskeho združenia"
                    onSelect={makeHandleOrganisationAutoform(props)}
                    fetchData={async (name) => {
                      const data = await getNgoByName(name)
                      return data.map((item) => ({
                        ...item,
                        id: item.id,
                        value: `${item.name}, ${item.municipality}`,
                      }))
                    }}
                  />

                  <div className={styles.inlineFieldContainer}>
                    <Input
                      className={styles.inlineField}
                      name="r142_ico"
                      type="text"
                      label="IČO"
                      maxLength={12}
                      onChange={async (event) => {
                        props.setFieldValue(
                          'r142_ico',
                          event.currentTarget.value,
                        )
                      }}
                    />
                  </div>
                  <h2 className="govuk-heading-l">Súhlas so zaslaním údajov</h2>
                  <CheckboxSmall
                    name="XIIoddiel_suhlasZaslUdaje"
                    label="Želám si, aby prijímateľ 2% videl moje údaje (meno, priezvisko a adresa trvalého pobytu)"
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
    if (!values.r142_ico) {
      errors.r142_ico = 'Zadajte IČO'
    }

    if (!values.r142_obchMeno) {
      errors.r142_obchMeno = 'Zadajte obchodne meno'
    }
  }
  return errors
}

export default DvePercenta
