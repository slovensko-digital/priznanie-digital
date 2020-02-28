import React, { useEffect } from "react";
import Link from "next/link";
import * as Yup from "yup";
import { Formik, Form, Field, yupToFormErrors } from "formik";
import { useRouter } from "next/router";
import { BooleanRadio, Input, Checkbox } from "../components/FormComponents";
import { EmployedUserInput } from "../lib/types";

const nextUrl = "/partner";
const backUrl = "/prijmy-a-vydavky";

const Zamestnanie = ({ setTaxFormUserInput, taxFormUserInput }) => {
  const router = useRouter();
  const handleSubmit = (values: never) => {
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
      <Formik
        initialValues={taxFormUserInput}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
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
  r038: Yup.number().when("employed", {
    is: true,
    then: Yup.number().required(),
  }),
  r039: Yup.number().when("employed", {
    is: true,
    then: Yup.number().required(),
  }),
});

export default Zamestnanie;
