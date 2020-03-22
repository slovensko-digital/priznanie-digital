import React, { useEffect } from 'react';
import Link from 'next/link';
import { Formik, Form } from 'formik';
import { useRouter } from 'next/router';
import { NextPage } from 'next';
import { BooleanRadio, FormWrapper, Input } from '../components/FormComponents';
import {
  EmployedUserInput,
  FormErrors,
  MortgageUserInput,
} from '../types/PageUserInputs';
import { TaxFormUserInput } from '../types/TaxFormUserInput';
import { getRoutes } from '../lib/routes';

const { nextRoute, previousRoute } = getRoutes('/hypoteka');

interface Props {
  setTaxFormUserInput: (values: MortgageUserInput) => void;
  taxFormUserInput: TaxFormUserInput;
}

const Hypoteka: NextPage<Props> = ({
  setTaxFormUserInput,
  taxFormUserInput,
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
      <FormWrapper<MortgageUserInput>
        initialValues={taxFormUserInput}
        validate={validate}
        // validationSchema={validationSchema}
        onSubmit={values => {
          setTaxFormUserInput(values);
          router.push(nextRoute);
        }}
      >
        {({ values }) => (
          <Form className="form">
            <BooleanRadio
              title="Platili ste úroky z hypotéky v roku 2019?"
              name="r037_uplatnuje_uroky"
            />

            {values.r037_uplatnuje_uroky && (
              <>
                <Input
                  name="r037_zaplatene_uroky"
                  type="number"
                  label="Zaplatene uroky"
                />
                <Input
                  name="r037_pocetMesiacov"
                  type="number"
                  label="Pocet mesiacov"
                />
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

const validate = (values: MortgageUserInput) => {
  const errors: Partial<FormErrors<MortgageUserInput>> = {};

  if (values.r037_uplatnuje_uroky && !values.r037_zaplatene_uroky) {
    errors.r037_zaplatene_uroky = 'Zadajte vysku zaplatenych urokov';
  }
  if (values.r037_uplatnuje_uroky && !values.r037_pocetMesiacov) {
    errors.r037_pocetMesiacov =
      'Zadajte pocet mesiacov, kedy ste platili uroky';
  }

  return errors;
};

export default Hypoteka;
