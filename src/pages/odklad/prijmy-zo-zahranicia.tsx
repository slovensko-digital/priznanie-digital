import React, { useEffect } from 'react';
import Link from 'next/link';
import { Formik, Form } from 'formik';
import { useRouter } from 'next/router';
import { NextPage } from 'next';
import { BooleanRadio } from '../../components/FormComponents';
import { getPostponeRoutes } from '../../lib/routes';
import { PostponeUserInput } from '../../types/PostponeUserInput';
import {
  FormErrors,
  IncomeSourceCountryUserInput,
} from '../../types/PageUserInputs';

const { nextRoute, previousRoute } = getPostponeRoutes(
  '/odklad/prijmy-zo-zahranicia',
);

interface Props {
  setPostponeUserInput: React.Dispatch<
    React.SetStateAction<IncomeSourceCountryUserInput>
  >;
  postponeUserInput: PostponeUserInput;
}

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
      <Link href={previousRoute}>
        <a data-test="back" className="govuk-back-link">
          Späť
        </a>
      </Link>
      <Formik<IncomeSourceCountryUserInput>
        initialValues={postponeUserInput}
        validate={validate}
        onSubmit={values => {
          setPostponeUserInput(values);
          router.push(nextRoute);
        }}
      >
        {({ values }) => (
          <Form className="form">
            <BooleanRadio
              title="Mali ste v roku 2019 príjem zo zahraničia?"
              hint="Rozhodujúcim faktorom pre posúdenie príjmu zo živnosti je územie, na ktorom ste činnosť fyzicky vykonávali, nie štátna príslušnosť či adresa druhej strany a zároveň dátum, kedy vám bola odmena pripísaná na váš účet, nie dátum dodania alebo vystavenia faktúry."
              name="prijmy_zo_zahranicia"
            />
            {values.prijmy_zo_zahranicia !== undefined && (
              <>
                <p>
                  Nový termín pre podanie daňového priznania je{' '}
                  <strong>
                    {values.prijmy_zo_zahranicia
                      ? '30. septembra 2020'
                      : '30. júna 2020'}
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
      </Formik>
    </>
  );
};

const validate = (values: IncomeSourceCountryUserInput) => {
  const errors: Partial<FormErrors<IncomeSourceCountryUserInput>> = {};

  if (values.prijmy_zo_zahranicia === undefined) {
    errors.prijmy_zo_zahranicia = 'Vyznačte jednu z moznosti';
  }

  return errors;
};

export default PrijmyZoZahranicia;
