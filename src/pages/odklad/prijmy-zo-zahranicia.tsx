import React, { useEffect } from 'react'
import Link from 'next/link'
import { Form } from 'formik'
import { useRouter } from 'next/router'
import { NextPage } from 'next'
import { BooleanRadio, FormWrapper } from '../../components/FormComponents'
import { getPostponeRoutes } from '../../lib/routes'
import { PostponeUserInput } from '../../types/PostponeUserInput'
import {
  FormErrors,
  IncomeSourceCountryUserInput,
} from '../../types/PageUserInputs'
import { TAX_YEAR } from '../../lib/calculation'

const { nextRoute, previousRoute } = getPostponeRoutes(
  '/odklad/prijmy-zo-zahranicia',
)

interface Props {
  setPostponeUserInput: React.Dispatch<
    React.SetStateAction<IncomeSourceCountryUserInput>
  >
  postponeUserInput: PostponeUserInput
}

const PrijmyZoZahranicia: NextPage<Props> = ({
  setPostponeUserInput,
  postponeUserInput,
}: Props) => {
  const router = useRouter()
  useEffect(() => {
    router.prefetch(nextRoute)
  })
  return (
    <>
      <Link href={previousRoute} data-test="back" className="govuk-back-link">
        Späť
      </Link>
      <FormWrapper<IncomeSourceCountryUserInput>
        initialValues={postponeUserInput}
        validate={validate}
        onSubmit={(values) => {
          setPostponeUserInput(values)
          router.push(nextRoute)
        }}
      >
        {({ values }) => (
          <Form className="form">
            <BooleanRadio
              title={`Mali ste v roku ${TAX_YEAR} príjem zo zahraničia?`}
              hint="Rozhodujúcim faktorom je, či príjmy boli v zahraničí podrobené zdaneniu podľa legislatívy toho konkrétneho štátu, bez ohľadu na výšku tam zaplatenej dane. Príklady zahraničných príjmov: príjem zo závislej činnosti vykonávanej v zahraničí, príjem z činnosti vykonávanej v zahraničí prostredníctvom stálej prevádzkarne, príjem z nakladania s nehnuteľnosťou umiestnenou v zahraničí, príjem charakteru úrokov alebo licenčných poplatkov vyplácaných zahraničnou spoločnosťou, predaj akcií, príjem z dividend, ..."
              name="prijmy_zo_zahranicia"
            />
            {values.prijmy_zo_zahranicia !== undefined && (
              <>
                <p>
                  Nový termín pre podanie daňového priznania je{' '}
                  <strong>
                    {values.prijmy_zo_zahranicia
                      ? `30. septembra ${TAX_YEAR + 1}`
                      : `30. júna ${TAX_YEAR + 1}`}
                  </strong>
                  .
                </p>
                <p>
                  Samozrejme, priznanie môžete podať aj skôr, tento termín je
                  však záväzný a posledný možný. Odporúčame vám si ho poznačiť.
                  Využiť môžete aj emailové upozornenie, ktoré si nastavíte v
                  poslednom kroku tejto aplikácie.
                </p>
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

export const validate = (values: IncomeSourceCountryUserInput) => {
  const errors: Partial<FormErrors<IncomeSourceCountryUserInput>> = {}

  if (values.prijmy_zo_zahranicia === undefined) {
    errors.prijmy_zo_zahranicia = 'Vyznačte, či ste mali príjmy zo zahraničia'
  }

  return errors
}

export default PrijmyZoZahranicia
