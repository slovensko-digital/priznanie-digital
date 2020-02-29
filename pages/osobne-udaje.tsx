import React, { useEffect, useState } from "react";
import { Formik, Form, FormikProps } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import * as Yup from "yup";
import { NextPage } from "next";
import { Input } from "../components/FormComponents";
import styles from "./osobne-udaje.module.css";
import { PersonalInformationUserInput, TaxFormUserInput } from "../lib/types";

const nextUrl = "/vysledky";
const backUrl = "/deti";

const getCity = (zip: string) => {
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
const getAutoformByPersonName = (firstName: string, lastName: string) => {
  return fetch(
    `api/autoform?firstName=${firstName}&lastName=${lastName}`,
  ).then(response => response.json());

  /** In case of just testing on localhost
    return [
      {
        id: 1358414,
        cin: "50 158 635",
        tin: 2120264674,
        vatin: null,
        name: "Slovensko.Digital",
        datahub_corporate_body: {
          id: 1358414,
          url:
            "https://datahub.ekosystem.slovensko.digital/api/datahub/corporate_bodies/1358414",
        },
        formatted_address:
          "Staré Grunty 6207/12, 841 04 Bratislava - mestská časť Karlova Ves",
        street: "Staré Grunty",
        reg_number: 6207,
        building_number: "12",
        street_number: "6207/12",
        formatted_street: "Staré Grunty 6207/12",
        postal_code: "841 04",
        municipality: "Bratislava - mestská časť Karlova Ves",
        country: "Slovenská republika",
        established_on: "2016-01-29",
        terminated_on: null,
        vatin_paragraph: null,
        registration_office: "MV SR",
        registration_number: "VVS/1-900/90-48099",
      },
    ];
     */
};
interface AutoformPerson {
  name: string;
  id: string;
  tin: string;
  formatted_address: string;
  street: string;
  street_number: string;
  postal_code: string;
  municipality: string;
  country: string;
}
const handlePersonAutoform = (
  person: AutoformPerson,
  { setValues, values }: FormikProps<Partial<PersonalInformationUserInput>>,
) => {
  setValues({
    r001_dic: person.tin ? person.tin : values.r001_dic,
    r007_ulica: person.street,
    r008_cislo: person.street_number,
    r009_psc: person.postal_code,
    r010_obec: person.municipality,
    r011_stat: person.country,
  });
};

interface Props {
  setTaxFormUserInput: (values: PersonalInformationUserInput) => void;
  taxFormUserInput: TaxFormUserInput;
}
const OsobneUdaje: NextPage<Props> = ({
  setTaxFormUserInput,
  taxFormUserInput,
}: Props) => {
  const [autoformPersons, setAutoFormPersons] = useState<AutoformPerson[]>([]);
  const router = useRouter();

  const handleAutoform = async (values: PersonalInformationUserInput) => {
    if (values.r005_meno.length > 0 && values.r004_priezvisko.length > 1) {
      const personsData = await getAutoformByPersonName(
        values.r005_meno,
        values.r004_priezvisko,
      );
      if (personsData) {
        setAutoFormPersons(personsData);
      }
    }
  };

  useEffect(() => {
    router.prefetch(nextUrl);
  });

  return (
    <>
      <Link href={backUrl}>
        <a className="govuk-back-link">Späť</a>
      </Link>
      <Formik<PersonalInformationUserInput>
        initialValues={taxFormUserInput}
        onSubmit={values => {
          setTaxFormUserInput(values);
          router.push(nextUrl);
        }}
        validationSchema={validationSchema}
      >
        {props => (
          <Form className="form">
            <h2>Údaje o daňovníkovi</h2>
            <div className={styles.inlineFieldContainer}>
              <Input
                className={styles.inlineField}
                name="r001_dic"
                type="text"
                label="DIČ"
              />

              <Input
                className={styles.inlineField}
                name="r003_nace"
                type="text"
                label="NACE"
              />
            </div>
            <div className={styles.inlineFieldContainer}>
              <Input
                className={styles.inlineField}
                name="r005_meno"
                type="text"
                label="Meno"
                onChange={e => {
                  props.handleChange(e);
                  handleAutoform({
                    ...props.values,
                    ...{ r005_meno: e.currentTarget.value },
                  });
                }}
              />
              <Input
                className={styles.inlineField}
                name="r004_priezvisko"
                type="text"
                label="Priezvisko"
                onChange={e => {
                  props.handleChange(e);
                  handleAutoform({
                    ...props.values,
                    ...{ r004_priezvisko: e.currentTarget.value },
                  });
                }}
              />
            </div>

            {autoformPersons.length > 0 && (
              <div>
                <h2>Udaje nemusite vypisovat, staci si vybrat osobu:</h2>
                <ol className="govuk-list govuk-list--number">
                  {autoformPersons.map(person => (
                    <li
                      key={person.id}
                      className={styles.clickable}
                      onClick={() => handlePersonAutoform(person, props)}
                    >
                      {person.name} : {person.formatted_address}
                    </li>
                  ))}
                </ol>
              </div>
            )}

            <h2>Adresa trvalého pobytu</h2>
            <div className={styles.inlineFieldContainer}>
              <Input
                className={styles.inlineField}
                name="r007_ulica"
                type="text"
                label="Ulica"
              />
              <Input
                className={styles.inlineField}
                name="r008_cislo"
                type="text"
                label="Súpisné/orientačné číslo"
              />
            </div>
            <div className={styles.inlineFieldContainer}>
              <Input
                className={styles.inlineField}
                name="r009_psc"
                type="text"
                label="PSČ"
                onChange={async e => {
                  props.handleChange(e);
                  const pscValue = e.currentTarget.value;
                  const trimmedPSC = pscValue.replace(/ /g, "");

                  if (trimmedPSC.length === 5) {
                    const city = await getCity(trimmedPSC);
                    props.setFieldValue("r010_obec", city);
                  }
                }}
              />

              <Input
                className={styles.inlineField}
                name="r010_obec"
                type="text"
                label="Obec"
              />
            </div>

            <Input name="r011_stat" type="text" label="Štát" />

            <button className="govuk-button" type="submit">
              Pokračovať
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
    .min(9)
    .max(10),
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
