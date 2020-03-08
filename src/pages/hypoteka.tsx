import React, { useEffect } from 'react';
import Link from 'next/link';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { useRouter } from 'next/router';
import { NextPage } from 'next';
import { BooleanRadio, Input } from '../components/FormComponents';
import { MortgageUserInput } from '../types/PageUserInputs';
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
      <Formik<MortgageUserInput>
        initialValues={taxFormUserInput}
        validationSchema={validationSchema}
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
      </Formik>
    </>
  );
};

const validationSchema = Yup.object().shape<MortgageUserInput<number>>({
  r037_uplatnuje_uroky: Yup.boolean()
    .required()
    .nullable(),
  r037_zaplatene_uroky: Yup.number().when('r037_uplatnuje_uroky', {
    is: true,
    then: Yup.number().required(),
  }),
  r037_pocetMesiacov: Yup.number().when('r037_uplatnuje_uroky', {
    is: true,
    then: Yup.number().required(),
  }),
});

export default Hypoteka;
