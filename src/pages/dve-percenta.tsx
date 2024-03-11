import React, { useRef } from 'react'
import Link from 'next/link'
import { Form, FormikProps } from 'formik'
import {
  BooleanRadio,
  Checkbox,
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
import RadioGroup from '../components/radio/RadioGroup'
import Radio from '../components/radio/Radio'
import RadioConditional from '../components/radio/RadioConditional'
import Fieldset from '../components/fieldset/Fieldset'

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

const TriPercenta = ({ calculatedTax }) => (
  <>
    <Checkbox
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
  </>
)

const Suhlas = () => (
  <div>
    <h2 className="govuk-heading-l">Súhlas so zaslaním údajov</h2>
    <Checkbox
      name="XIIoddiel_suhlasZaslUdaje"
      label="Želám si, aby prijímateľ 2% videl moje údaje (meno, priezvisko a adresa trvalého pobytu)"
    />
  </div>
)

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
    `Nanešťastie, nespĺňate podmienky pre darovanie 2%, avšak spĺňate podmienky pre darovanie 3% zaplatenej dane (${formatCurrency(calculatedTax.suma_3_percenta.toNumber())})` :
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
          Ľutujeme, nespĺňate podmienky na poukázanie čiastky dane, nakoľko by táto čiastka neprekočila {formatCurrency(MIN_2_PERCENT_CALCULATED_DONATION)}.
          Dôvodom je nepostačujúca výska zaplatenej dane.
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
          setTaxFormUserInput(values)
          router.push(nextRoute)
        }}
      >
        {(props) => (
          <>
            <ErrorSummary<TwoPercentUserInput> errors={props.errors} />
            <Form className="form" noValidate>
              <Fieldset
                title={`Chcete poukázať 2% alebo 3% zaplatenej dane niektorej neziskovej organizácii?`}
                error={props.errors.dve_percenta_podporujem}
                hint={uplatnenie2PercentHint}
              >
                <RadioGroup value={String(props.values.dve_percenta_podporujem)} onChange={(value) => {
                  if (value === "ano-sk-digital") {
                    props.setValues({
                      ...props.values,
                      r142_ico: '50 158 635',
                      r142_obchMeno: 'Slovensko.Digital',
                      XIIoddiel_uplatnujem2percenta: true,
                      dve_percenta_podporujem: "ano-sk-digital"
                    })
                  } else if (value === "ano-inu") {
                    props.setValues({
                      ...props.values,
                      r142_ico: '',
                      r142_obchMeno: '',
                      XIIoddiel_uplatnujem2percenta: true,
                      dve_percenta_podporujem: "ano-inu"
                    })
                  } else {
                    props.setValues({
                      ...props.values,
                      r142_ico: '',
                      r142_obchMeno: '',
                      XIIoddiel_uplatnujem2percenta: false,
                      dve_percenta_podporujem: "nie"
                    })
                  }
                }}>
                  <Radio name="dve_percenta_podporujem-sk-digital-input" label="Áno, Slovensko.Digital" value="ano-sk-digital" />
                  <RadioConditional forValue="ano-sk-digital">
                    <TriPercenta calculatedTax={calculatedTax} />
                    <Suhlas />
                  </RadioConditional>

                  <Radio name="dve_percenta_podporujem-inu-input" label="Áno, inú organizáciu" value="ano-inu" />
                  <RadioConditional forValue="ano-inu">
                    <TriPercenta calculatedTax={calculatedTax} />
                    <Suhlas />
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
                  </RadioConditional>

                  <Radio name="platil_prispevky_na_dochodok-input-no" label="Nie" value="nie" />
                </RadioGroup>
              </Fieldset>
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

  if (typeof values.dve_percenta_podporujem === 'undefined') {
    errors.dve_percenta_podporujem = 'Vyznačte odpoveď'
  }
  if (["ano-sk-digital", "ano-inu"].includes(values.dve_percenta_podporujem)) {
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
