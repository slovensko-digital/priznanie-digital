import React, { useEffect } from 'react';
import Link from 'next/link';
import { Formik, Form } from 'formik';
import { useRouter } from 'next/router';
import { NextPage } from 'next';
import {
  BooleanRadio,
  Input,
  numberInputRegexp,
} from '../components/FormComponents';
import { EmployedUserInput } from '../types/PageUserInputs';
import { TaxFormUserInput } from '../types/TaxFormUserInput';
import { getRoutes } from '../lib/routes';

const { nextRoute, previousRoute } = getRoutes('/zamestnanie');

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
    router.prefetch(nextRoute);
  });
  return (
    <>
      <Link href={previousRoute}>
        <a className="govuk-back-link" data-test="back">
          Späť
        </a>
      </Link>
      <Formik<EmployedUserInput>
        initialValues={taxFormUserInput}
        validate={validate}
        onSubmit={values => {
          setTaxFormUserInput(values);
          router.push(nextRoute);
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
                  type="number"
                  label="Úhrn príjmov od všetkých zamestnávateľov"
                />
                <Input
                  name="r039"
                  type="number"
                  label="Úhrn povinného poistného"
                />
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

const validate = (values: EmployedUserInput): any => {
  const errors: any = {};

  if (typeof values.employed === 'undefined') {
    errors.employed = 'TODO';
  }

  if (values.employed && !values.r038) {
    errors.r038 = 'TODO';
  }
  if (values.r038 && !values.r038.match(numberInputRegexp)) {
    errors.r038 = 'Zadajte sumu vo formáte 123,45';
  }

  if (values.employed && !values.r039) {
    errors.r039 = 'TODO';
  }
  if (values.r039 && !values.r039.match(numberInputRegexp)) {
    errors.r039 = 'Zadajte sumu vo formáte 123,45';
  }

  return errors;
};

export default Zamestnanie;
