import React, { useEffect } from "react";
import Link from "next/link";
import * as Yup from "yup";
import { Formik, Form, Field, yupToFormErrors } from "formik";
import { partnerUserInitialValues } from "../lib/initialValues";
import { useRouter } from "next/router";
import { BooleanRadio, Input, Checkbox } from "../components/FormComponents";
import { PartnerUserInput } from "../lib/types";
import { assignOnlyExistingKeys } from "../lib/utils";

const nextUrl = "/osobne-udaje";
const backUrl = "/prijmy-a-vydavky";

const validationSchema = Yup.object().shape<PartnerUserInput>({
  r032_uplatnujem_na_partnera: Yup.boolean().required(),
  r031_priezvisko_a_meno: Yup.string().when("r032_uplatnujem_na_partnera", {
    is: true,
    then: Yup.string().required(),
  }),
});

const Partner = ({ taxForm, updateTaxForm }) => {
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
        initialValues={assignOnlyExistingKeys(
          partnerUserInitialValues,
          taxForm,
        )}
        onSubmit={handleSubmit}t
        validationSchema={validationSchema}
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
                <Checkbox name="r033_partner_kupele" title="Partner kupele?" />
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

export default Partner;
