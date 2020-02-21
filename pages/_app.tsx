import { AppProps } from "next/app";

import "../styles/global.css";

import React, { useState } from "react";
import { calculate } from "../lib/calculation";
import {
  TaxForm,
  IncomeAndExpenseUserInput,
  PartnerUserInput,
} from "../lib/types";
import Layout from "../components/Layout";
import { initTaxFormUserInputValues } from "../lib/initialValues";

function MyApp({ Component, pageProps }: AppProps) {
  const [taxForm, setTaxForm] = useState<TaxForm>(initTaxFormUserInputValues);
  const updateTaxForm = values => setTaxForm(calculate(values));
  return (
    <Layout>
      <Component
        taxForm={taxForm}
        updateTaxForm={updateTaxForm}
        {...pageProps}
      />
      <pre>{JSON.stringify(taxForm, null, 2)}</pre>
    </Layout>
  );
}

export default MyApp;
