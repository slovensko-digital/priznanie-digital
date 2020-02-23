import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Link from "next/link";
import { personalInformationUserInputInitialValues } from "../lib/initialValues";
import { useRouter } from "next/router";
import { Input } from "../components/FormComponents";
import * as Yup from "yup";
import { PersonalInformationUserInput } from "../lib/types";
import { assignOnlyExistingKeys } from "../lib/utils";

const nextUrl = "/vysledky";
const backUrl = "/partner";

const requiredMessege = "Pole je povinné";
const validationSchema = Yup.object<PersonalInformationUserInput>().shape({
  r001_dic: Yup.string()
    .length(9)
    .required(requiredMessege),
  r002_datum_narodenia: Yup.string().required(requiredMessege),
  r003_nace: Yup.string().required(requiredMessege),
  r004_priezvisko: Yup.string().required(requiredMessege),
  r005_meno: Yup.string().required(requiredMessege),
  r007_ulica: Yup.string().required(requiredMessege),
  r008_cislo: Yup.string().required(requiredMessege),
  r009_psc: Yup.string().required(requiredMessege),
  r010_obec: Yup.string().required(requiredMessege),
  r011_stat: Yup.string().required(requiredMessege),
});

const OsobneUdaje = ({ taxForm, updateTaxForm }) => {
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
          personalInformationUserInputInitialValues,
          taxForm,
        )}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
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

export default OsobneUdaje;
