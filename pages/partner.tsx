import React from "react";
import Link from "next/link";
import { Field, ErrorMessage } from "formik";

export default ({ formikBag }) => (
  <main>
    <h2>Partner</h2>
    <label htmlFor="r007_ulica">Uplatnujem na partnera</label>
    <Field name="r032_uplatnujem_na_partnera" type="checkbox" />
    {formikBag.values.r032_uplatnujem_na_partnera && (
      <>
        <label htmlFor="r031_priezvisko_a_meno">Prizevisko a meno</label>
        <Field name="r031_priezvisko_a_meno" type="text" />

        <label htmlFor="r031_rodne_cislo">Rodne cislo</label>
        <Field name="r031_rodne_cislo" type="text" />

        <label htmlFor="r032_partner_vlastne_prijmy">Vlastne prijmy</label>
        <Field name="r032_partner_vlastne_prijmy" type="number" />

        <label htmlFor="r032_partner_pocet_mesiacov">Pocet mesiacov</label>
        <Field name="r032_partner_pocet_mesiacov" type="number" />

        <label htmlFor="r033_partner_kupele">Partner kupele</label>
        <Field name="r033_partner_kupele" type="checkbox" />
        {formikBag.values.r033_partner_kupele && (
          <>
            <label htmlFor="r033_partner_kupele_uhrady">
              Partner kupele uhrady
            </label>
            <Field name="r033_partner_kupele_uhrady" type="number" />
          </>
        )}
      </>
    )}
    <Link href="/partner">
      <button>Back</button>
    </Link>
    <Link href="/osobne-udaje">
      <button>Next</button>
    </Link>
  </main>
);
