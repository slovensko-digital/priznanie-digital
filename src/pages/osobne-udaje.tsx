import React, { useEffect, useState } from 'react';
import { Formik, Form, FormikProps } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as Yup from 'yup';
import { NextPage } from 'next';
import { Input } from '../components/FormComponents';
import styles from './osobne-udaje.module.css';
import { PersonalInformationUserInput } from '../types/PageUserInputs';
import { TaxFormUserInput } from "../types/TaxFormUserInput";
import { getCity, getAutoformByPersonName, AutoformPerson } from '../lib/api';

const nextUrl = '/vysledky';
const backUrl = '/deti';

const handlePersonAutoform = (
  person: AutoformPerson,
  { setValues, values }: FormikProps<PersonalInformationUserInput>,
) => {
  setValues({
    ...values,
    r001_dic: person.tin ? person.tin : values.r001_dic,
    r007_ulica: person.street,
    r008_cislo: person.street_number,
    r009_psc: person.postal_code.replace(/\D/g, ''),
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
        validationSchema={validationSchema}
        onSubmit={values => {
          setTaxFormUserInput(values);
          router.push(nextUrl);
        }}
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
                onBlur={event => {
                  props.handleBlur(event);
                  const pscValue = event.target.value;
                  props.setFieldValue('r009_psc', pscValue.replace(/\D/g, ''));
                }}
                onChange={async event => {
                  props.handleChange(event);
                  const pscValue = event.currentTarget.value;
                  const trimmedPSC = pscValue.replace(/\D/g, '');

                  if (trimmedPSC.length === 5) {
                    const city = await getCity(trimmedPSC);
                    props.setFieldValue('r010_obec', city);
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
