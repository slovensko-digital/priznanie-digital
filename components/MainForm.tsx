import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { calculate } from "../lib/calculation";
import styles from "./MainForm.module.css";

const MainForm = () => {
  return (
    <Formik
      initialValues={{
        income: 20000,
        priloha3_r11_socialne: 1000,
        priloha3_r13_zdravotne: 1000
      }}
      onSubmit={(values, { resetForm }) => {
        alert(JSON.stringify(calculate(values), null, 2));
        resetForm();
      }}
    >
      <Form className={styles.form}>
        <label htmlFor="income">Prijem</label>
        <Field name="income" type="number" />
        <label htmlFor="priloha3_r11_socialne">Socialne poistenie</label>
        <Field name="priloha3_r11_socialne" type="number" />
        <label htmlFor="priloha3_r13_zdravotne">Zdravotne poistenie</label>
        <Field name="priloha3_r13_zdravotne" type="number" />
        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};

export default MainForm;
