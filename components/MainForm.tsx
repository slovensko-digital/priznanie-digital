import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { calculate } from "../lib/calculation";
import styles from "./MainForm.module.css";
import { TaxForm, TaxFormUserInput } from "../lib/types";

const MainForm = () => {
  const [taxForm, setTaxForm] = useState<TaxForm>({});
  const initialValues: TaxFormUserInput = {
    t1r10_prijmy: 20000,
    priloha3_r11_socialne: 1000,
    priloha3_r13_zdravotne: 1000,
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={values => {
        setTaxForm(calculate(values));
      }}
    >
      <Form className={styles.form}>
        <label htmlFor="t1r10_prijmy">Prijem</label>
        <Field name="t1r10_prijmy" type="number" />
        <label htmlFor="priloha3_r11_socialne">Socialne poistenie</label>
        <Field name="priloha3_r11_socialne" type="number" />
        <label htmlFor="priloha3_r13_zdravotne">Zdravotne poistenie</label>
        <Field name="priloha3_r13_zdravotne" type="number" />
        <button type="submit">Submit</button>
        <div className={styles.summary}>
          <div>Základ dane: {taxForm.r080_zaklad_dane_celkovo} </div>
          <div>Daň: {taxForm.r105_dan}</div>
          <div>Daň na úhradu: {taxForm.r125_dan_na_uhradu}</div>
          <div>Daňový preplatok: {taxForm.r126_danovy_preplatok}</div>
        </div>
        <pre>{JSON.stringify(taxForm, null, 2)}</pre>
      </Form>
    </Formik>
  );
};

export default MainForm;
