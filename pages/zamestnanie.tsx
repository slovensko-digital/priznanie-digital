import React, { useEffect } from 'react';
import Link from 'next/link';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { useRouter } from 'next/router';
import { NextPage } from 'next';
import { BooleanRadio, Input } from '../components/FormComponents';
import { EmployedUserInput, TaxFormUserInput } from '../lib/types';

const nextUrl = '/partner';
const backUrl = '/prijmy-a-vydavky';

interface Props {
  setTaxFormUserInput: (values: EmployedUserInput) => void;
  taxFormUserInput: TaxFormUserInput;
}

const Zamestnanie: NextPage<Props> = ({
  setTaxFormUserInput,
  taxFormUserInput,
}: Props) => {
  const router = useRouter();
  useEffect(() => {
    router.prefetch(nextUrl);
  });
  return (
    <>
      <Link href={backUrl}>
        <a className="govuk-back-link">Späť</a>
      </Link>
      <Formik<EmployedUserInput>
        initialValues={taxFormUserInput}
        validationSchema={validationSchema}
        onSubmit={values => {
          setTaxFormUserInput(values);
          router.push(nextUrl);
        }}
      >
        {({ values }) => (
          <Form className="form">
            <BooleanRadio
              title="Boli ste v roku 2019 zamestnaný/á v SR?"
              name="employed"
            />
            {values.employed && (
              <>
                <Input
                  name="r038"
                  type="text"
                  label="Úhrn príjmov od všetkých zamestnávateľov"
                />
                <Input
                  name="r039"
                  type="text"
                  label="Úhrn povinného poistného"
                />
              </>
            )}
            <button className="govuk-button" type="submit">
              Pokračovať
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};

const validationSchema = Yup.object().shape<EmployedUserInput>({
  employed: Yup.boolean()
    .required()
    .nullable(),
  r038: Yup.number().when('employed', {
    is: true,
    then: Yup.number().required(),
  }),
  r039: Yup.number().when('employed', {
    is: true,
    then: Yup.number().required(),
  }),
});

export default Zamestnanie;
