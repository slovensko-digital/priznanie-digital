import React, { useEffect, useState } from 'react';
import { Formik, Form, FormikProps } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { NextPage } from 'next';
import { Input } from '../components/FormComponents';
import styles from './osobne-udaje.module.css';
import { PersonalInformationUserInput } from '../types/PageUserInputs';
import { TaxFormUserInput } from '../types/TaxFormUserInput';
import { getCity, getAutoformByPersonName } from '../lib/api';
import { AutoformResponseBody } from '../types/api';
import { getRoutes } from '../lib/routes';
import { ErrorSummary } from '../components/ErrorSummary';

const { nextRoute, previousRoute } = getRoutes('/osobne-udaje');

const handlePersonAutoform = (
  person: AutoformResponseBody,
  { setValues, values }: FormikProps<PersonalInformationUserInput>,
) => {
  setValues({
    ...values,
    r001_dic: person?.tin ?? values.r001_dic,
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
  const [autoformPersons, setAutoFormPersons] = useState<
    AutoformResponseBody[]
  >([]);
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
        validate={validate}
        onSubmit={values => {
          setTaxFormUserInput(values);
          router.push(nextRoute);
        }}
      >
        {props => (
          <>
            <ErrorSummary<PersonalInformationUserInput>
              errors={props.errors}
              touched={props.touched}
            />
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
                    props.setFieldValue(
                      'r009_psc',
                      pscValue.replace(/\D/g, ''),
                    );
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
          </>
        )}
      </Formik>
    </>
  );
};

const isValidDIC = (dic: string): boolean => {
  return true;
};

const validate = (values: PersonalInformationUserInput): any => {
  const errors: any = {};

  if (!values.r001_dic && isValidDIC(values.r001_dic)) {
    errors.r001_dic = 'Zadajte pridelene DIC';
  }

  if (!values.r004_priezvisko) {
    errors.r004_priezvisko = 'Zadajte Vase priezvisko.';
  }

  if (!values.r005_meno) {
    errors.r005_meno = 'Zadajte Vase meno';
  }

  if (!values.r007_ulica) {
    errors.r007_ulica = 'Zadajte ulicu.';
  }

  if (!values.r008_cislo) {
    errors.r008_cislo = 'Zadajte cislo domu.';
  }

  if (!values.r009_psc) {
    errors.r009_psc = 'Zadajte PSC.';
  }

  if (!values.r010_obec) {
    errors.r010_obec = 'Zadajte obec.';
  }

  if (!values.r011_stat) {
    errors.r011_stat = 'Zadajte stat.';
  }

  return errors;
};

export default OsobneUdaje;
