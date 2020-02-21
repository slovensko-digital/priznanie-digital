import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { calculate, initTaxFormUserInputValues } from "../lib/calculation";
import styles from "./MainForm.module.css";
import { TaxForm, TaxFormUserInput } from "../lib/types";
import * as Yup from "yup";

const mainFormSchema = Yup.object().shape({
  // Zatial bez validacie, aby nepodstatne fieldy nezdrzovali
  // r005_meno: Yup.string().required("Pole je povinné."),
  // r004_priezvisko: Yup.string().required("Pole je povinné."),
});

const MainForm = () => {
  const [taxForm, setTaxForm] = useState<TaxForm>({});
  const initialValues: TaxFormUserInput = {
    ...initTaxFormUserInputValues,
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
      validationSchema={mainFormSchema}
    >
      {({ values }) => (
        <Form className={styles.form}>


         
        </Form>
      )}
    </Formik>
  );
};

export default MainForm;
