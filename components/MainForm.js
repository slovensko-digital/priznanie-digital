import React from "react";
import { useFormik } from "formik";
import { calculate } from "../lib/calculation";

const MainForm = () => {
  const formik = useFormik({
    initialValues: {
      income: 20000,
      priloha3_r11_socialne: 1000,
      priloha3_r13_zdravotne: 1000
    },
    onSubmit: (values, { resetForm }) => {
      alert(JSON.stringify(calculate(values), null, 2));
      resetForm();
    }
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="income">Prijem</label>
      <input
        id="income"
        name="income"
        type="number"
        onChange={formik.handleChange}
        value={formik.values.income}
      />
      <label htmlFor="expense">Vydavky</label>
      <label htmlFor="priloha3_r11_socialne">Socialne poistenie</label>
      <input
        id="priloha3_r11_socialne"
        name="priloha3_r11_socialne"
        type="number"
        onChange={formik.handleChange}
        value={formik.values.priloha3_r11_socialne}
      />
      <label htmlFor="priloha3_r13_zdravotne">Zdravotne poistenie</label>
      <input
        id="priloha3_r13_zdravotne"
        name="priloha3_r13_zdravotne"
        type="number"
        onChange={formik.handleChange}
        value={formik.values.priloha3_r13_zdravotne}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default MainForm;
