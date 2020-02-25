import React, { useEffect } from "react";
import { Formik, Form } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import { Input } from "../components/FormComponents";
import * as Yup from "yup";
import { PersonalInformationUserInput } from "../lib/types";

const nextUrl = "/vysledky";
const backUrl = "/partner";

const OsobneUdaje = ({ setTaxFormUserInput, taxFormUserInput }) => {
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
        <a className="govuk-back-link">Naspat</a>
      </Link>
      <Formik
        initialValues={taxFormUserInput}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <Form className="form">
          <h2>Údaje o daňovníkovi</h2>

          <Input name="r005_meno" type="text" label="Meno" />
          <Input name="r004_priezvisko" type="text" label="Priezvisko" />
          <Input name="r003_nace" type="text" label="NACE" />

          <Input name="r001_dic" type="text" label="DIČ" />
          <Input
            name="r002_datum_narodenia"
            type="text"
            label="Dátum narodenia"
          />

          <h3>Adresa trvalého pobytu</h3>
          <Input name="r007_ulica" type="text" label="Ulica" />
          <Input
            name="r008_cislo"
            type="text"
            label="Súpisné/orientačné číslo"
          />
          <Input name="r009_psc" type="text" label="PSČ" />
          <Input name="r010_obec" type="text" label="Obec" />
          <Input name="r011_stat" type="text" label="Štát" />

          <button className="govuk-button" type="submit">
            Dalej
          </button>
        </Form>
      </Formik>
    </>
  );
};

const validationSchema = Yup.object().shape<PersonalInformationUserInput>({
  r001_dic: Yup.string()
    .required()
    .min(9)
    .max(10),
  r002_datum_narodenia: Yup.string(),
  r003_nace: Yup.string(),
  r004_priezvisko: Yup.string().required(),
  r005_meno: Yup.string().required(),
  r007_ulica: Yup.string().required(),
  r008_cislo: Yup.string().required(),
  r009_psc: Yup.string().required(),
  r010_obec: Yup.string().required(),
  r011_stat: Yup.string().required(),
});
export default OsobneUdaje;
