import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Link from "next/link";
import { personalInformationUserInputInitialValues } from "../lib/initialValues";
import { useRouter } from "next/router";

const nextUrl = "/vysledky";

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
    <Formik
      initialValues={{
        ...personalInformationUserInputInitialValues,
        ...taxForm,
      }}
      onSubmit={handleSubmit}
    >
      {() => (
        <Form className="form">
          <h2>Údaje o daňovníkovi</h2>
          <label htmlFor="r001_dic">DIČ</label>
          <Field name="r001_dic" type="text" />

          <label htmlFor="r002_datum_narodenia">Dátum narodenia</label>
          <Field name="r002_datum_narodenia" type="text" />

          <label htmlFor="r005_meno">Meno</label>
          <Field name="r005_meno" type="text" />
          <ErrorMessage name="r005_meno" />

          <label htmlFor="r004_priezvisko">Priezvisko</label>
          <Field name="r004_priezvisko" type="text" />
          <ErrorMessage name="r004_priezvisko" />

          <h3>Adresa trvalého pobytu</h3>
          <label htmlFor="r007_ulica">Ulica</label>
          <Field name="r007_ulica" type="text" />
          <label htmlFor="r008_cislo">Súpisné/orientačné číslo</label>
          <Field name="r008_cislo" type="text" />
          <label htmlFor="r009_psc">PSČ</label>
          <Field name="r009_psc" type="text" />
          <label htmlFor="r010_mesto">Mesto</label>
          <Field name="r010_mesto" type="text" />
          <label htmlFor="r011_stat">Štát</label>
          <Field name="r011_stat" type="text" />
          <label htmlFor="t1r10_prijmy">Prijem</label>
          <Link href="/partner">
            <button className="govuk-button">Back</button>
          </Link>
          <button className="govuk-button" type="submit">Next</button>
        </Form>
      )}
    </Formik>
  );
};
