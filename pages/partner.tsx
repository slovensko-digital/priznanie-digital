import React, { useEffect } from "react";
import Link from "next/link";
import * as Yup from "yup";
import { Formik, Form, Field, yupToFormErrors } from "formik";
import { useRouter } from "next/router";
import { BooleanRadio, Input, Checkbox } from "../components/FormComponents";
import { PartnerUserInput } from "../lib/types";

const nextUrl = "/deti";
const backUrl = "/zamestnanie";

const Partner = ({ setTaxFormUserInput, taxFormUserInput }) => {
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
        {({ values }) => (
          <Form className="form">
            <BooleanRadio
              title="Uplatňujete si daňový bonus na manželku/manžela?"
              name="r032_uplatnujem_na_partnera"
            ></BooleanRadio>
            {values.r032_uplatnujem_na_partnera && (
              <>
                <Input
                  name="r031_priezvisko_a_meno"
                  type="text"
                  label="Meno a priezvisko manželky/manžela"
                />
                <Input
                  name="r031_rodne_cislo"
                  type="text"
                  label="Rodné číslo"
                />
                <Input
                  name="r032_partner_vlastne_prijmy"
                  type="number"
                  label="Vlastné príjmy manželky/manžela"
                />
                <Input
                  name="r032_partner_pocet_mesiacov"
                  type="number"
                  label="Počet mesiacov, kedy mala manželka príjem?"
                />
                {/* <Checkbox name="r033_partner_kupele" title="Partner kupele?" />
                {values.r033_partner_kupele && (
                  <>
                    <Input
                      name="r033_partner_kupele_uhrady"
                      type="number"
                      label="Partner kupele uhrady"
                    />
                  </>
                )} */}
              </>
            )}
            <button className="govuk-button" type="submit">
              Pokračovať
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};

const validationSchema = Yup.object().shape<PartnerUserInput>({
  r032_uplatnujem_na_partnera: Yup.boolean()
    .required()
    .nullable(),
  r031_priezvisko_a_meno: Yup.string().when("r032_uplatnujem_na_partnera", {
    is: true,
    then: Yup.string().required(),
  }),
  r031_rodne_cislo: Yup.string().when("r032_uplatnujem_na_partnera", {
    is: true,
    then: Yup.string()
      .required()
      .min(9)
      .max(11),
  }),
  r032_partner_vlastne_prijmy: Yup.number().when(
    "r032_uplatnujem_na_partnera",
    {
      is: true,
      then: Yup.number().required(),
    },
  ),
  r032_partner_pocet_mesiacov: Yup.number().when(
    "r032_uplatnujem_na_partnera",
    {
      is: true,
      then: Yup.number()
        .min(0)
        .max(12)
        .required(),
    },
  ),
  r033_partner_kupele_uhrady: Yup.number().when("r033_partner_kupele", {
    is: true,
    then: Yup.number()
      .max(50)
      .required(),
  }),
  r033_partner_kupele: Yup.boolean().required(),
});

export default Partner;
