import React, { useEffect } from "react";
import Link from "next/link";
import * as Yup from "yup";
import { Formik, Form, Field, yupToFormErrors } from "formik";
import { useRouter } from "next/router";
import { BooleanRadio, Input, Checkbox } from "../components/FormComponents";
import { PartnerUserInput } from "../lib/types";

const nextUrl = "/partner";
const backUrl = "/prijmy-a-vydavky";

const Zamestnanie = ({ setTaxFormUserInput, taxFormUserInput }) => {
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
        initialValues={{ zamestnany: false }}
        onSubmit={handleSubmit}
        // validationSchema={validationSchema}
      >
        {({ values }) => (
          <Form className="form">
            <BooleanRadio
              title="Boli ste v roku 2019 zamestnaný/á v SR?"
              name="employed"
            ></BooleanRadio>
            {values.zamestnany && (
              <>
                <Input
                  name="r038"
                  type="text"
                  label="Úhrn príjmov od všetkých zamestnávateľov"
                />
                <Input
                  name="r039"
                  type="text"
                  label="Úhrn povinného poistného"
                />
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

// const validationSchema = Yup.object().shape<PartnerUserInput>({
//   r032_uplatnujem_na_partnera: Yup.boolean()
//     .required()
//     .nullable(),
//   r031_priezvisko_a_meno: Yup.string().when("r032_uplatnujem_na_partnera", {
//     is: true,
//     then: Yup.string().required(),
//   }),
//   r031_rodne_cislo: Yup.string().when("r032_uplatnujem_na_partnera", {
//     is: true,
//     then: Yup.string()
//       .required()
//       .min(9)
//       .max(11),
//   }),
//   r032_partner_vlastne_prijmy: Yup.number().when(
//     "r032_uplatnujem_na_partnera",
//     {
//       is: true,
//       then: Yup.number().required(),
//     },
//   ),
//   r032_partner_pocet_mesiacov: Yup.number().when(
//     "r032_uplatnujem_na_partnera",
//     {
//       is: true,
//       then: Yup.number()
//         .min(0)
//         .max(12)
//         .required(),
//     },
//   ),
//   r033_partner_kupele_uhrady: Yup.number().when("r033_partner_kupele", {
//     is: true,
//     then: Yup.number()
//       .max(50)
//       .required(),
//   }),
//   r033_partner_kupele: Yup.boolean().required(),
// });

export default Zamestnanie;
