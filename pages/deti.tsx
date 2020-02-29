import React, { useEffect } from 'react';
import Link from 'next/link';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { useRouter } from 'next/router';
import { NextPage } from 'next';
import { BooleanRadio, Input } from '../components/FormComponents';
import { KidsUserInput, TaxFormUserInput } from '../lib/types';

const nextUrl = '/osobne-udaje';
const backUrl = '/partner';
interface Props {
  setTaxFormUserInput: (values: KidsUserInput) => void;
  taxFormUserInput: TaxFormUserInput;
}
const Deti: NextPage<Props> = ({
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
      <Formik<KidsUserInput>
        initialValues={taxFormUserInput}
        onSubmit={values => {
          setTaxFormUserInput(values);
          router.push(nextUrl);
        }}
        validationSchema={validationSchema}
      >
        {({ values }) => (
          <Form className="form">
            <BooleanRadio
              title="Máte dieťa do 16 rokov alebo študenta do 25 rokov, s ktorým žijete v spoločnej domácnosti?"
              name="kids"
            />
            {values.kids &&
              values.r034.map((_kid, index) => (
                <>
                  <button
                    className="btn-secondary govuk-button"
                    type="button"
                    onClick={e => {
                      e.preventDefault();
                    }}
                  >
                    Pridať ďalšie dieťa
                  </button>
                  <Input
                    // @ts-ignore TODO temporary solution
                    name={`r034[${index}].priezviskoMeno`}
                    type="text"
                    label="Meno a priezvisko"
                  />
                  <Input
                    // @ts-ignore TODO temporary solution
                    name={`r034[${index}].rodneCislo`}
                    type="text"
                    label="Rodné číslo"
                  />
                </>
              ))}
            <button className="govuk-button" type="submit">
              Pokračovať
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};

const validationSchema = Yup.object().shape<KidsUserInput>({
  kids: Yup.boolean()
    .required()
    .nullable(),
  r034: Yup.mixed().when('kids', {
    is: true,
    then: Yup.mixed(),
  }),
  // R039: Yup.number().when("employed", {
  //   is: true,
  //   then: Yup.number().required(),
  // }),
});

export default Deti;
