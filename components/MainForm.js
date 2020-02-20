import React from "react";
import { useFormik } from "formik";
import { calculate } from "../lib/calculation";

const MainForm = () => {
  const formik = useFormik({
    initialValues: {
      income: 20000,
      expense: 12000,
      priloha3_r11_socialne: 0,
      priloha3_r13_zdravotne: 0
    },
    onSubmit: values => {
      alert(JSON.stringify(calculate(values), null, 2));
    }
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="income">Prijem</label>
      <input
        id="income"
        name="income"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.income}
      />
      <label htmlFor="expense">Vydavky</label>
      <input
        id="expense"
        name="expense"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.expense}
      />
      <label htmlFor="priloha3_r11_socialne">Socialne poistenie</label>
      <input
        id="priloha3_r11_socialne"
        name="priloha3_r11_socialne"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.priloha3_r11_socialne}
      />
      <label htmlFor="priloha3_r13_zdravotne">Zdravotne poistenie</label>
      <input
        id="priloha3_r13_zdravotne"
        name="priloha3_r13_zdravotne"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.priloha3_r13_zdravotne}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default MainForm;
