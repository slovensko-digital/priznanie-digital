import { AppProps } from "next/app";

import "../styles/global.css";

import React, { useState } from "react";
import { Formik, Form } from "formik";
import { calculate, initTaxFormUserInputValues } from "../lib/calculation";
import { TaxForm, TaxFormUserInput } from "../lib/types";
import * as Yup from "yup";
import Layout from "../components/Layout";

const mainFormSchema = Yup.object().shape({
  // Zatial bez validacie, aby nepodstatne fieldy nezdrzovali
  // r005_meno: Yup.string().required("Pole je povinné."),
  // r004_priezvisko: Yup.string().required("Pole je povinné."),
});

function MyApp({ Component, pageProps }: AppProps) {
  const [taxForm, setTaxForm] = useState<TaxForm>({});
  const initialValues: TaxFormUserInput = {
    ...initTaxFormUserInputValues,
    t1r10_prijmy: 20000,
    priloha3_r11_socialne: 1000,
    priloha3_r13_zdravotne: 1000,
  };
  return (
    <Layout>
      <Formik
        initialValues={initialValues}
        onSubmit={values => {
          setTaxForm(calculate(values));
        }}
        validationSchema={mainFormSchema}
      >
        {formikBag => (
          <Form className="form">
            <Component
              taxForm={taxForm}
              setTaxForm={setTaxForm}
              formikBag={formikBag}
              {...pageProps}
            />
            <button type="submit">Vypocitaj</button>
            <pre>{JSON.stringify(taxForm, null, 2)}</pre>
          </Form>
        )}
      </Formik>
    </Layout>
  );
}

export default MyApp;
