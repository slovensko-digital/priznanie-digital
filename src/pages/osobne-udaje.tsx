import React, { useEffect } from 'react';
import { Formik, Form, FormikProps } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as Yup from 'yup';
import { NextPage } from 'next';
import { Input } from '../components/FormComponents';
import styles from './osobne-udaje.module.css';
import { PersonalInformationUserInput } from '../types/PageUserInputs';
import { TaxFormUserInput } from '../types/TaxFormUserInput';
import { getCity } from '../lib/api';
import { AutoformResponseBody } from '../types/api';
import { getRoutes } from '../lib/routes';
import { FullNameAutoCompleteInput } from '../components/FullNameAutoCompleteInput';

const { nextRoute, previousRoute } = getRoutes('/osobne-udaje');

const makeHandlePersonAutoform = ({
  setValues,
  values,
}: FormikProps<PersonalInformationUserInput>) => {
  return (person: AutoformResponseBody) => {
    setValues({
      ...values,
      meno_priezvisko: person.name,
      r001_dic: person?.tin ?? '',
      r007_ulica: person.street ?? person.municipality,
      r008_cislo: person.street_number,
      r009_psc: person.postal_code ? person.postal_code.replace(/\D/g, '') : '',
      r010_obec: person.municipality,
      r011_stat: person.country,
    });
  };
};

interface Props {
  setTaxFormUserInput: (values: PersonalInformationUserInput) => void;
  taxFormUserInput: TaxFormUserInput;
}
const OsobneUdaje: NextPage<Props> = ({
  setTaxFormUserInput,
  taxFormUserInput,
}: Props) => {
  const router = useRouter();

  useEffect(() => {
    router.prefetch(nextRoute);
  });

  return (
    <>
      <Link href={previousRoute}>
        <a data-test="back" className="govuk-back-link">
          Späť
        </a>
      </Link>
      <Formik<PersonalInformationUserInput>
        initialValues={taxFormUserInput}
        validationSchema={validationSchema}
        onSubmit={values => {
          setTaxFormUserInput(values);
          router.push(nextRoute);
        }}
      >
        {props => (
          <Form className="form">
            <h2>Údaje o daňovníkovi</h2>
            <p>
              Údaje môžete vyhladať a automaticky vyplniť podľa mena a
              priezviska.
            </p>

            <FullNameAutoCompleteInput
              handlePersonAutoform={makeHandlePersonAutoform(props)}
              handleChange={props.handleChange}
            />

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
  meno_priezvisko: Yup.string().required(),
  r007_ulica: Yup.string().required(),
  r008_cislo: Yup.string().required(),
  r009_psc: Yup.string().required(),
  r010_obec: Yup.string().required(),
  r011_stat: Yup.string().required(),
});
export default OsobneUdaje;
