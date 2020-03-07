import React, { useEffect } from 'react';
import Link from 'next/link';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { useRouter } from 'next/router';
import { NextPage } from 'next';
import { BooleanRadio, Input } from '../components/FormComponents';
import { ChildrenUserInput } from '../types/PageUserInputs';
import { TaxFormUserInput } from '../types/TaxFormUserInput';
import { getRoutes } from '../lib/routes';
import { emptyChild } from '../lib/initialValues';

const { nextRoute, previousRoute } = getRoutes('/deti');

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
    router.prefetch(nextRoute);
  });

  const addEmptyChild = () => {
    setTaxFormUserInput({
      r034: taxFormUserInput?.r034?.concat([emptyChild]),
    });
  };
  return (
    <>
      <Link href={previousRoute}>
        <a className="govuk-back-link">Späť</a>
      </Link>
      <Formik<ChildrenUserInput>
        initialValues={taxFormUserInput}
        // validationSchema={validationSchema}
        onSubmit={values => {
          setTaxFormUserInput(values);
          router.push(nextRoute);
        }}
      >
        {({ values }) => (
          <Form className="form">
            <BooleanRadio
              title="Máte dieťa do 16 rokov alebo študenta do 25 rokov, s ktorým žijete v spoločnej domácnosti? (zatial nefunguje spravne)"
              name="children"
            />
            <p>
              V prípade, že sa staráte o nezaopatrené dieťa do 16 rokov,
              študenta do 25 rokov alebo o nezaopatrené dieťa do 25 rokov, ktoré
              je dlhodobo choré, máte právo na zľavu na dani vo výške 21.56 €
              mesačne. Ročný bonus na dieťa činí 258.72 €. Daňový bonus na dieťa
              si môže uplatniť iba jeden z rodičov.
            </p>
            {values.children &&
              taxFormUserInput?.r034?.map((child, index) => (
                <div key={child.rodneCislo}>
                  <Input
                    name={`r034[${index}].priezviskoMeno` as any}
                    type="text"
                    label="Meno a priezvisko"
                  />
                  <Input
                    name={`r034[${index}].rodneCislo` as any}
                    type="text"
                    label="Rodné číslo"
                  />
                  <button
                    className="btn-secondary govuk-button"
                    type="button"
                    onClick={addEmptyChild}
                    data-test="add-child"
                  >
                    Pridať ďalšie dieťa
                  </button>
                </div>
              ))}
            <button
              className="govuk-button"
              type="submit"
              onClick={addEmptyChild}
            >
              Pokračovať
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};

// const validationSchema = Yup.object().shape<ChildrenUserInput>({
//   children: Yup.boolean()
//     .required()
//     .nullable(),
//   r034: Yup.mixed().when('childs', {
//     is: true,
//     then: Yup.mixed(),
//   }),
//   // R039: Yup.number().when("employed", {
//   //   is: true,
//   //   then: Yup.number().required(),
//   // }),
// });

export default Deti;
