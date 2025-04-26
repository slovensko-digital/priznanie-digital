import React, { useEffect } from "react";
import Link from "next/link";
import { Form } from "formik";
import { useRouter } from "next/router";
import { NextPage } from "next";
import { BooleanRadio, FormWrapper } from "../../components/FormComponents";
import { getPostponeRoutes } from "../../lib/routes";
import { PostponeUserInput } from "../../types/PostponeUserInput";
import {
  FormErrors,
  IncomeSourceCountryUserInput,
} from "../../types/PageUserInputs";
import { TAX_YEAR } from "../../lib/calculation";
import { Details } from "../../components/Details";

const { nextRoute, previousRoute } = getPostponeRoutes(
  "/odklad/prijmy-zo-zahranicia",
);

interface Props {
  setPostponeUserInput: React.Dispatch<
    React.SetStateAction<IncomeSourceCountryUserInput>
  >;
  postponeUserInput: PostponeUserInput;
}

const hint = (
  <>
    <p>
      Rozhodujúcim faktorom je, či ide o <strong>zdaniteľné príjmy</strong>{" "}
      (t.j. príjmy, ktoré sú predmetom dane a zároveň nie sú oslobodené v zmysle
      zákona o dani z príjmov ani medzinárodnej zmluvy),{" "}
      <strong>ktoré vám plynú zo zdrojov v zahraničí</strong>.
    </p>
    <Details title="Najčastejšie možné príklady zdaniteľných príjmov zo zdrojov v zahraničí:">
      <p className="govuk-hint">
        <strong>Aktívne príjmy</strong> (z činnosti), pri ktorých je{" "}
        <strong>rozhodujúce ich vykonávanie mimo územia SR</strong>, napr.:
        <ul>
          <li>príjem zo závislej činnosti vykonávaný v zahraničí,</li>
          <li>
            príjem z činnosti vykonávanej v zahraničí prostredníctvom stálej
            prevádzkarne.
          </li>
        </ul>
      </p>
      <p className="govuk-hint">
        <strong>Pasívne príjmy</strong> (z nakladania s majetkom), pri ktorých
        je <strong>rozhodujúce</strong>, že{" "}
        <strong>príjem vypláca zahraničná osoba</strong> (fyzická alebo
        právnická osoba, ktorá nie je rezidentom SR){" "}
        <strong>
          alebo ide o príjem z nakladania s nehnuteľnosťou umiestnenou mimo SR
        </strong>
        , napr.:
        <ul>
          <li>príjem z prenájmu nehnuteľnosti umiestnenej v zahraničí,</li>
          <li>
            príjem charakteru úrokov, licenčných poplatkov vyplácaných
            zahraničnou spoločnosťou,
          </li>
          <li>
            príjem z predaja akcií, príjem z dividend vyplácaných zahraničnou
            spoločnosťou.
          </li>
        </ul>
      </p>
    </Details>
  </>
);

const PrijmyZoZahranicia: NextPage<Props> = ({
  setPostponeUserInput,
  postponeUserInput,
}: Props) => {
  const router = useRouter();
  useEffect(() => {
    router.prefetch(nextRoute);
  });
  return (
    <>
      <Link href={previousRoute} data-test="back" className="govuk-back-link">
        Späť
      </Link>
      <FormWrapper<IncomeSourceCountryUserInput>
        initialValues={postponeUserInput}
        validate={validate}
        onSubmit={(values) => {
          setPostponeUserInput(values);
          router.push(nextRoute);
        }}
      >
        {({ values }) => (
          <Form className="form">
            <BooleanRadio
              title={`Mali ste v roku ${TAX_YEAR} príjem zo zahraničia?`}
              hint={hint}
              name="prijmy_zo_zahranicia"
            />
            {values.prijmy_zo_zahranicia !== undefined && (
              <>
                <p>
                  Nový termín pre podanie daňového priznania je{" "}
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
  );
};

export const validate = (values: IncomeSourceCountryUserInput) => {
  const errors: Partial<FormErrors<IncomeSourceCountryUserInput>> = {};

  if (values.prijmy_zo_zahranicia === undefined) {
    errors.prijmy_zo_zahranicia = "Vyznačte, či ste mali príjmy zo zahraničia";
  }

  return errors;
};

export default PrijmyZoZahranicia;
