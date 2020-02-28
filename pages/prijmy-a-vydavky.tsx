import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import * as Yup from "yup";

import { Formik, Form } from "formik";
import { incomeAndExpenseInitialValues } from "../lib/initialValues";
import { Input } from "../components/FormComponents";
import { IncomeAndExpenseUserInput } from "../lib/types";

const nextUrl = "/zamestnanie";
const backUrl = "/";

const PrijmyAVydavky = ({ taxFormUserInput, setTaxFormUserInput }) => {
  const router = useRouter();
  const handleSubmit = values => {
    setTaxFormUserInput(values);
    router.push(nextUrl);
  };
  useEffect(() => {
    router.prefetch(nextUrl);
  });
  return (
    <>
      <Link href={backUrl}>
        <a className="govuk-back-link">Späť</a>
      </Link>
      <Formik
        initialValues={taxFormUserInput}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <Form className="form">
          <h2>Príjmy a odvody do sociálnej a zdravotnej poisťovne</h2>

          <Input
            name="t1r10_prijmy"
            type="number"
            label="Príjmy"
            small="Vaše celkové príjmy prijaté na účet (zaplatené faktúry) alebo v hotovosti (napr. cez pokladňu) v roku 2019"
          ></Input>
          <Input
            name="priloha3_r11_socialne"
            type="number"
            label="Sociálne poistenie"
            small="Celkové uhradené poistné v roku 2019"
          ></Input>
          <Input
            name="priloha3_r13_zdravotne"
            small="Celkové uhradené poistné v roku 2019"
            type="number"
            label="Zdravotné poistenie"
          ></Input>

          <button className="govuk-button" type="submit">
            Pokračovať
          </button>
        </Form>
      </Formik>
    </>
  );
};

const validationSchema = Yup.object().shape<IncomeAndExpenseUserInput>({
  t1r10_prijmy: Yup.number()
    .min(0)
    .required(),
  priloha3_r11_socialne: Yup.number()
    .min(0)
    .required(),
  priloha3_r13_zdravotne: Yup.number()
    .min(0)
    .required(),
});

export default PrijmyAVydavky;
