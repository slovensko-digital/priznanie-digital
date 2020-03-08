import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { Formik, Form } from 'formik';
import { NextPage } from 'next';
import { Input } from '../components/FormComponents';
import { IncomeAndExpenseUserInput } from '../types/PageUserInputs';
import { TaxFormUserInput } from '../types/TaxFormUserInput';
import { getRoutes } from '../lib/routes';

const { nextRoute, previousRoute } = getRoutes('/prijmy-a-vydavky');

interface Props {
  setTaxFormUserInput: (values: IncomeAndExpenseUserInput) => void;
  taxFormUserInput: TaxFormUserInput;
}

const PrijmyAVydavky: NextPage<Props> = ({
  taxFormUserInput,
  setTaxFormUserInput,
}: Props) => {
  const router = useRouter();
  useEffect(() => {
    router.prefetch(nextRoute);
  });
  return (
    <>
      <Link href={previousRoute}>
        <a className="govuk-back-link">Späť</a>
      </Link>
      <Formik<IncomeAndExpenseUserInput>
        initialValues={taxFormUserInput}
        validate={validate}
        onSubmit={values => {
          setTaxFormUserInput(values);
          router.push(nextRoute);
        }}
      >
        <Form className="form">
          <h2>Príjmy a odvody do sociálnej a zdravotnej poisťovne</h2>

          <Input
            name="t1r10_prijmy"
            type="number"
            label="Príjmy"
            hint="Vaše celkové príjmy prijaté na účet (zaplatené faktúry) alebo v hotovosti (napr. cez pokladňu) v roku 2019"
          />
          <Input
            name="priloha3_r11_socialne"
            type="number"
            label="Sociálne poistenie"
            hint="Celkové uhradené poistné v roku 2019"
          />
          <Input
            name="priloha3_r13_zdravotne"
            hint="Celkové uhradené poistné v roku 2019"
            type="number"
            label="Zdravotné poistenie"
          />

          <button data-test="next" className="govuk-button" type="submit">
            Pokračovať
          </button>
        </Form>
      </Formik>
    </>
  );
};


const validate = (
  values: IncomeAndExpenseUserInput,
): Partial<IncomeAndExpenseUserInput> => {
  const errors: Partial<IncomeAndExpenseUserInput> = {};

  if (!values.t1r10_prijmy) {
    errors.t1r10_prijmy = 'Zadajte vaše celkové príjmy';
  }
  if (!values.priloha3_r11_socialne) {
    errors.priloha3_r11_socialne =
      'Zadajte vaše celkové uhradené sociálne poistné';
  }
  if (!values.priloha3_r13_zdravotne) {
    errors.priloha3_r13_zdravotne =
      'Zadajte vaše celkové uhradené zdravotné poistné';
  }

  return errors;
};

export default PrijmyAVydavky;
