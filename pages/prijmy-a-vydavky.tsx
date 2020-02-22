import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import * as Yup from "yup";

import { Formik, Form, Field, ErrorMessage } from "formik";
import { incomeAndExpenseInitialValues } from "../lib/initialValues";
import { Input } from "../components/FormComponents";

const validationSchema = Yup.object().shape({
  t1r10_prijmy: Yup.number()
    .min(0, "Musi byt kladne.")
    .required("Pole je povinné."),
});

const nextUrl = "/partner";
const backUrl = "/";

export default ({ taxForm, updateTaxForm }) => {
  const router = useRouter();
  const handleSubmit = values => {
    updateTaxForm(values);
    router.push(nextUrl);
  };
  useEffect(() => {
    router.prefetch(nextUrl);
  });
  return (
    <>
      <Link href={backUrl}>
        <a className="govuk-back-link">Naspat</a>
      </Link>
      <Formik
        initialValues={{ ...incomeAndExpenseInitialValues, ...taxForm }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <Form className="form">
          <h2>Prijmy vydavky</h2>

          <Input name="t1r10_prijmy" type="number" label="Prijmy"></Input>
          <Input
            name="priloha3_r11_socialne"
            type="number"
            label="Socialne poistenie"
          ></Input>
          <Input
            name="priloha3_r13_zdravotne"
            type="number"
            label="Zdravotne poistenie"
          ></Input>

          <button className="govuk-button" type="submit">
            Dalej
          </button>
        </Form>
      </Formik>
    </>
  );
};
