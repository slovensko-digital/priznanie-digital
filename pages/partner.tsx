import React, { useEffect } from "react";
import Link from "next/link";
import { Formik, Form, Field } from "formik";
import { partnerUserInitialValues } from "../lib/initialValues";
import { useRouter } from "next/router";
import { BooleanRadio } from "../components/FormComponents";

const nextUrl = "/osobne-udaje";
const backUrl = "/prijmy-a-vydavky";

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
    <>
      <Link href={backUrl}>
        <a className="govuk-back-link">Naspat</a>
      </Link>
      <Formik
        initialValues={{ ...partnerUserInitialValues, ...taxForm }}
        onSubmit={handleSubmit}
      >
        {({ values }) => (
          <Form className="form">
            <BooleanRadio
              title="Uplatnujete danovy bonus na manzelku/manzela?"
              name="r032_uplatnujem_na_partnera"
            ></BooleanRadio>
            {values.r032_uplatnujem_na_partnera && (
              <>
                <label htmlFor="r031_priezvisko_a_meno">
                  Prizevisko a meno
                </label>
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
            <button className="govuk-button" type="submit">
              Dalej
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};
