import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import * as Yup from "yup";

import { Formik, Form, Field, ErrorMessage } from "formik";
import { incomeAndExpenseInitialValues } from "../lib/initialValues";

const validationSchema = Yup.object().shape({
  t1r10_prijmy: Yup.number()
    .positive("Musi byt kladne.")
    .required("Pole je povinné."),
});

export default ({ taxForm, updateTaxForm }) => {
  const router = useRouter();
  const handleSubmit = values => {
    updateTaxForm(values);
    router.push("/partner");
  };
  return (
    <Formik
      initialValues={{ ...incomeAndExpenseInitialValues, ...taxForm }}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {({ submitForm }) => (
        <Form className="form">
          <h2>Prijmy vydavky</h2>

          <label htmlFor="t1r10_prijmy">Prijmy</label>
          <Field name="t1r10_prijmy" type="number" />
          <ErrorMessage name="t1r10_prijmy" />

          <label htmlFor="priloha3_r11_socialne">Socialne poistenie</label>
          <Field name="priloha3_r11_socialne" type="number" />

          <label htmlFor="priloha3_r13_zdravotne">Zdravotne poistenie</label>
          <Field name="priloha3_r13_zdravotne" type="number" />

          <Link href="/">
            <button>Back</button>
          </Link>
          <button onClick={submitForm}>Next</button>
        </Form>
      )}
    </Formik>
  );
};
