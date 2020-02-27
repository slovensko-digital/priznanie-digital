import React, { useEffect } from "react";
import Link from "next/link";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { useRouter } from "next/router";
import { BooleanRadio, Input, Checkbox } from "../components/FormComponents";
import { KidsUserInput } from "../lib/types";

const nextUrl = "/osobne-udaje";
const backUrl = "/partner";

const Deti = ({ setTaxFormUserInput, taxFormUserInput }) => {
  const router = useRouter();
  const handleSubmit = values => {
    setTaxFormUserInput(values);
    router.push(nextUrl);
  };
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
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({ values }) => (
          <Form className="form">
            <BooleanRadio
              title="Máte dieťa do 16 rokov alebo študenta do 25 rokov, s ktorým žijete v spoločnej domácnosti?"
              name="kids"
            ></BooleanRadio>
            {values.kids &&
              values.r034.map((_kid, index) => (
                <>
                  <button
                    className="btn-secondary govuk-button"
                    onClick={e => {
                      e.preventDefault();
                    }}
                  >
                    Pridat dalsie dieta
                  </button>
                  <h3>Dieta c.1</h3>
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
                    label="Rodne cislo"
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
  r034: Yup.mixed().when("kids", {
    is: true,
    then: Yup.mixed(),
  }),
  // r039: Yup.number().when("employed", {
  //   is: true,
  //   then: Yup.number().required(),
  // }),
});

export default Deti;
