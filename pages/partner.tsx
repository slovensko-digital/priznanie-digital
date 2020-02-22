import React, { useEffect } from "react";
import Link from "next/link";
import { Formik, Form, Field } from "formik";
import { partnerUserInitialValues } from "../lib/initialValues";
import { useRouter } from "next/router";

const nextUrl = "/osobne-udaje";

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
      initialValues={{ ...partnerUserInitialValues, ...taxForm }}
      onSubmit={handleSubmit}
    >
      {({ values }) => (
        <Form className="form">
          <h2>Partner</h2>
          <label htmlFor="r007_ulica">Uplatnujem na partnera</label>
          <Field name="r032_uplatnujem_na_partnera" type="checkbox" />
          {values.r032_uplatnujem_na_partnera && (
            <>
              <label htmlFor="r031_priezvisko_a_meno">Prizevisko a meno</label>
              <Field name="r031_priezvisko_a_meno" type="text" />

              <label htmlFor="r031_rodne_cislo">Rodne cislo</label>
              <Field name="r031_rodne_cislo" type="text" />

              <label htmlFor="r032_partner_vlastne_prijmy">
                Vlastne prijmy
              </label>
              <Field name="r032_partner_vlastne_prijmy" type="number" />

              <label htmlFor="r032_partner_pocet_mesiacov">
                Pocet mesiacov
              </label>
              <Field name="r032_partner_pocet_mesiacov" type="number" />

              <label htmlFor="r033_partner_kupele">Partner kupele</label>
              <Field name="r033_partner_kupele" type="checkbox" />
              {values.r033_partner_kupele && (
                <>
                  <label htmlFor="r033_partner_kupele_uhrady">
                    Partner kupele uhrady
                  </label>
                  <Field name="r033_partner_kupele_uhrady" type="number" />
                </>
              )}
            </>
          )}
          <Link href="/prijmy-a-vydavky">
            <button className="govuk-button">Back</button>
          </Link>
          <button className="govuk-button" type="submit">Next</button>
        </Form>
      )}
    </Formik>
  );
};
