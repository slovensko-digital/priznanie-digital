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

const OsobneUdaje = ({ taxForm, updateTaxForm }) => {
  const router = useRouter();
  const handleSubmit = values => {
    updateTaxForm(values);
    router.push(nextUrl);
  };

  const getCity = zip => {
    return fetch(`https://api.posta.sk/private/search?q=${zip}&m=zip`)
      .then(response => response.json())
      .then(pscData => {
        return pscData &&
          pscData.offices &&
          pscData.offices[0] &&
          pscData.offices[0].name
          ? pscData.offices[0].name
          : "";
      });
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
        getCity={getCity}
        // validationSchema={validationSchema}
      >
        {props => (
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
            <Input
              name="r009_psc"
              type="text"
              label="PSČ"
              onChange={async e => {
                props.handleChange(e);
                const pscValue = e.target["value"];
                const trimmedPSC = pscValue.replace(/ /g, "");

                if (trimmedPSC.length === 5) {
                  const city = await getCity(trimmedPSC);
                  props.setFieldValue("r010_obec", city);
                }
              }}
            />
            <Input name="r010_obec" type="text" label="Obec" />
            <Input name="r011_stat" type="text" label="Štát" />

            <button className="govuk-button" type="submit">
              Dalej
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};

const validationSchema = Yup.object().shape<PersonalInformationUserInput>({
  r001_dic: Yup.string()
    .required()
    .min(9),
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
