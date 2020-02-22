import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Link from "next/link";
import { personalInformationUserInputInitialValues } from "../lib/initialValues";
import { useRouter } from "next/router";
import { Input } from "../components/FormComponents";

const nextUrl = "/vysledky";
const backUrl = "/partner";

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
        initialValues={{
          ...personalInformationUserInputInitialValues,
          ...taxForm,
        }}
        onSubmit={handleSubmit}
      >
        <Form className="form">
          <h2>Údaje o daňovníkovi</h2>

          <Input name="r001_dic" type="text" label="DIČ" />
          <Input
            name="r002_datum_narodenia"
            type="text"
            label="Dátum narodenia"
          />
          <Input name="r005_meno" type="text" label="Meno" />
          <Input name="r004_priezvisko" type="text" label="Priezvisko" />

          <h3>Adresa trvalého pobytu</h3>
          <Input name="r007_ulica" type="text" label="Ulica" />
          <Input
            name="r008_cislo"
            type="text"
            label="Súpisné/orientačné číslo"
          />
          <Input name="r009_psc" type="text" label="PSČ" />
          <Input name="r010_mesto" type="text" label="Mesto" />
          <Input name="r011_stat" type="text" label="Štát" />
          <Input name="r007_ulica" type="text" label="Ulica" />

          <button className="govuk-button" type="submit">
            Next
          </button>
        </Form>
      </Formik>
    </>
  );
};
