import React, { useEffect } from "react";
import Link from "next/link";
import { Formik, Form, Field } from "formik";
import { partnerUserInitialValues } from "../lib/initialValues";
import { useRouter } from "next/router";
import { BooleanRadio, Input } from "../components/FormComponents";

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
                <Input
                  name="r031_priezvisko_a_meno"
                  type="text"
                  label="Prizevisko a meno"
                />
                <Input
                  name="r031_rodne_cislo"
                  type="text"
                  label="Rodne cislo"
                />
                <Input
                  name="r032_partner_vlastne_prijmy"
                  type="text"
                  label="Vlastne prijmy"
                />
                <Input
                  name="r032_partner_pocet_mesiacov"
                  type="number"
                  label="Pocet mesiacov"
                />
                <Input
                  name="r033_partner_kupele"
                  type="number"
                  label="Partner kupele"
                />
                {values.r033_partner_kupele && (
                  <>
                    <Input
                      name="r033_partner_kupele_uhrady"
                      type="number"
                      label="Partner kupele uhrady"
                    />
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
