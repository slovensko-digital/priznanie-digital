import React, { useEffect } from 'react';
import Link from 'next/link';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { useRouter } from 'next/router';
import { NextPage } from 'next';
import { BooleanRadio, Input } from '../components/FormComponents';
import { ChildrenUserInput } from '../types/PageUserInputs';
import { TaxFormUserInput } from '../types/TaxFormUserInput';

const nextUrl = '/osobne-udaje';
const backUrl = '/partner';
interface Props {
  setTaxFormUserInput: (values: ChildrenUserInput) => void;
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
      <Formik<ChildrenUserInput>
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
              title="Máte dieťa do 16 rokov alebo študenta do 25 rokov, s ktorým žijete v spoločnej domácnosti?"
              name="children"
            />
            <div>
              V prípade, že sa staráte o nezaopatrené dieťa do 16 rokov,
              študenta do 25 rokov alebo o nezaopatrené dieťa do 25 rokov, ktoré
              je dlhodobo choré, máte právo na zľavu na dani vo výške 21.56 €
              mesačne. Ročný bonus na dieťa činí 258.72 €. Daňový bonus na dieťa
              si môže uplatniť iba jeden z rodičov.
            </div>
            {values.children &&
              values?.r034?.map((kid, index) => (
                <div key={kid.rodneCislo}>
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
                </div>
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

const validationSchema = Yup.object().shape<ChildrenUserInput>({
  children: Yup.boolean()
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
