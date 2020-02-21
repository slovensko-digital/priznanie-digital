import { AppProps } from "next/app";

import "../styles/global.css";

import React, { useState } from "react";
import { calculate } from "../lib/calculation";
import { TaxForm, TaxFormUserInput } from "../lib/types";
import * as Yup from "yup";
import Layout from "../components/Layout";
import { initTaxFormUserInputValues } from "../lib/initialValues";

const mainFormSchema = Yup.object().shape({
  // Zatial bez validacie, aby nepodstatne fieldy nezdrzovali
  // r005_meno: Yup.string().required("Pole je povinné."),
  // r004_priezvisko: Yup.string().required("Pole je povinné."),
});
//         validationSchema={mainFormSchema}

function MyApp({ Component, pageProps }: AppProps) {
  const [taxForm, setTaxForm] = useState<TaxForm>(initTaxFormUserInputValues);
  const handleSubmit = values => setTaxForm(calculate(values));
  return (
    <Layout>
      <Component taxForm={taxForm} handleSubmit={handleSubmit} {...pageProps} />
      <pre>{JSON.stringify(taxForm, null, 2)}</pre>
    </Layout>
  );
}

export default MyApp;
