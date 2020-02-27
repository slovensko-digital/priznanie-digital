import React, { useEffect } from "react";
import Link from "next/link";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { useRouter } from "next/router";
import { BooleanRadio, Input } from "../components/FormComponents";
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
            {values.kids && (
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

const validationSchema = Yup.object().shape<KidsUserInput>({
  kids: Yup.boolean()
    .required()
    .nullable(),
  // r038: Yup.number().when("employed", {
  //   is: true,
  //   then: Yup.number().required(),
  // }),
  // r039: Yup.number().when("employed", {
  //   is: true,
  //   then: Yup.number().required(),
  // }),
});

export default Deti;
