import React from 'react'
import { Form } from 'formik'
import { BooleanRadio, FormWrapper, Input } from '../components/FormComponents'
import { RentUserInput, FormErrors } from '../types/PageUserInputs'
import { numberInputRegexp } from '../lib/utils'
import { ErrorSummary } from '../components/ErrorSummary'
import { Page } from '../components/Page'
import { rentUserInputInitialValues } from '../lib/initialValues'
import { BackLink } from '../components/BackLink'
import { TAX_YEAR } from '../lib/calculation'
import Fieldset from "../components/fieldset/Fieldset";
import RadioGroup from "../components/radio/RadioGroup";
import Radio from "../components/radio/Radio";
import RadioConditional from "../components/radio/RadioConditional";

const Prenajom: Page<RentUserInput> = ({
  setTaxFormUserInput,
  taxFormUserInput,
  router,
  previousRoute,
  nextRoute,
}) => {
  return (
    <>
      <BackLink href={previousRoute} />
      <FormWrapper<RentUserInput>
        initialValues={taxFormUserInput}
        validate={validate}
        onSubmit={(values) => {
          const userInput = values.rent
            ? values
            : {
                ...rentUserInputInitialValues,
                rent: false,
              }
          setTaxFormUserInput(userInput)
          router.push(nextRoute)
        }}
      >
        {({ values, errors, setFieldValue }) => (
          <Form className="form" noValidate>
            <ErrorSummary<RentUserInput> errors={errors} />
            <BooleanRadio
              title={`Prenajímali ste v roku ${TAX_YEAR} nehnuteľnosť (nie na základe živnostenského oprávnenia) nezaradenú
              do obchodného majetku?`}
              name="rent"
            />
            {values.rent && (
              <>
                <Input
                  name="vyskaPrijmovZPrenajmu"
                  type="number"
                  label={`Výška príjmov z prenájmu nehnuteľností dosiahnutá v roku ${TAX_YEAR}`}
                />
                <BooleanRadio
                  title="Chcete pri príjmoch z prenájmu nehnuteľností uplatniť oslobodenie od dane max. do výšky 500EUR?"
                  name="prijemZPrenajmuOslobodenieDane"
                />
                {/* {values.prijemZPrenajmuOslobodenieDane && (
                  <>
                    <Fieldset title={`Ak ste v danom roku dosiahli aj príjem z príležitostnej činnosti, oslobodenie od dane max. do výšky 500 EUR sa uplatňuje spolu na príjmy z prenájmu nehnuteľností a príjmy z príležitostnej činnosti. Akú výšku oslobodenia od dane si uplatňujete?`}
                    >
                    <RadioGroup value={String(values.prijemZPrenajmuOslobodenieDane)} onChange={(value) => {
                    setFieldValue('prijemZPrenajmuOslobodenieDane', value === 'true')
                    }}>
                    <Radio name="platil_prispevky_na_dochodok-input-yes" label="Áno" value="true"/>
                    <RadioConditional forValue="true">
                        <Input
                        name="zaplatene_prispevky_na_dochodok"
                        type="number"
                        label={`Výška zaplatených príspevkov za rok ${TAX_YEAR}`}
                        hint="Maximálne si môžete uplatniť príspevky na doplnkové dôchodkové sporenie do výšky 180 eur."
                        />
                    </RadioConditional>
                  </>
                )} */}
              </>
            )}
            <button data-test="next" className="govuk-button" type="submit">
              Pokračovať
            </button>
          </Form>
        )}
      </FormWrapper>
    </>
  )
}

export const validate = (values: RentUserInput) => {
  const errors: Partial<FormErrors<RentUserInput>> = {}

  if (typeof values.rent === 'undefined') {
    errors.rent = 'Vyznačte odpoveď'
  }

  if (values.rent) {
    if (!values.uhrnPrijmovOdVsetkychZamestnavatelov) {
      errors.uhrnPrijmovOdVsetkychZamestnavatelov =
        'Zadajte úhrn príjmov od všetkých zamestnávateľov'
    } else if (
      !values.uhrnPrijmovOdVsetkychZamestnavatelov.match(numberInputRegexp)
    ) {
      errors.uhrnPrijmovOdVsetkychZamestnavatelov =
        'Zadajte sumu príjmov vo formáte 123,45'
    }

    if (!values.uhrnPovinnehoPoistnehoNaSocialnePoistenie) {
      errors.uhrnPovinnehoPoistnehoNaSocialnePoistenie =
        'Zadajte úhrn sociálneho poistného'
    } else if (
      !values.uhrnPovinnehoPoistnehoNaSocialnePoistenie.match(numberInputRegexp)
    ) {
      errors.uhrnPovinnehoPoistnehoNaSocialnePoistenie =
        'Zadajte sumu sociálneho poistného vo formáte 123,45'
    }

    if (!values.uhrnPovinnehoPoistnehoNaZdravotnePoistenie) {
      errors.uhrnPovinnehoPoistnehoNaZdravotnePoistenie =
        'Zadajte úhrn zdravotného poistného'
    } else if (
      !values.uhrnPovinnehoPoistnehoNaZdravotnePoistenie.match(
        numberInputRegexp,
      )
    ) {
      errors.uhrnPovinnehoPoistnehoNaZdravotnePoistenie =
        'Zadajte sumu zdravotného poistného vo formáte 123,45'
    }

    if (!values.uhrnPreddavkovNaDan) {
      errors.uhrnPreddavkovNaDan = 'Zadajte úhrn preddavkov na daň'
    } else if (!values.uhrnPreddavkovNaDan.match(numberInputRegexp)) {
      errors.uhrnPreddavkovNaDan =
        'Zadajte sumu povinného poistného vo formáte 123,45'
    }

    if (!values.udajeODanovomBonuseNaDieta) {
      errors.udajeODanovomBonuseNaDieta =
        'Zadajte údaje o daňovom bonuse na dieťa'
    } else if (!values.udajeODanovomBonuseNaDieta.match(numberInputRegexp)) {
      errors.udajeODanovomBonuseNaDieta =
        'Zadajte sumu povinného poistného vo formáte 123,45'
    }
  }

  return errors
}

export default Prenajom
