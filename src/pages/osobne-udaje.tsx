import React, { useEffect } from 'react';
import { Formik, Form, FormikProps } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { NextPage } from 'next';
import { Input } from '../components/FormComponents';
import styles from './osobne-udaje.module.css';
import {
  PersonalInformationUserInput,
  FormErrors,
} from '../types/PageUserInputs';
import { TaxFormUserInput } from '../types/TaxFormUserInput';
import { getCity } from '../lib/api';
import { AutoformResponseBody } from '../types/api';
import { getRoutes } from '../lib/routes';
import { ErrorSummary } from '../components/ErrorSummary';
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
              <p>
                Údaje môžete vyhladať a automaticky vyplniť podľa mena a
                priezviska.
              </p>

              <FullNameAutoCompleteInput
                handlePersonAutoform={makeHandlePersonAutoform(props)}
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

const validate = (values: PersonalInformationUserInput): any => {
  const errors: Partial<FormErrors<PersonalInformationUserInput>> = {};

  if (!values.r001_dic) {
    errors.r001_dic = 'Zadajte pridelené DIČ';
  }

  /**
   * @see https://ec.europa.eu/taxation_customs/tin/pdf/sk/TIN_-_subject_sheet_-_2_structure_and_specificities_sk.pdf
   */
  if (values.r001_dic.length < 9) {
    errors.r001_dic = 'DIČ môže mať minimálne 9 znakov';
  }
  if (values.r001_dic.length > 10) {
    errors.r001_dic = 'DIČ môže mať maximálne 10 znakov';
  }

  if (!values.meno_priezvisko) {
    errors.meno_priezvisko = 'Zadajte vaše meno a priezvisko';
  }

  if (!values.r007_ulica) {
    errors.r007_ulica = 'Zadajte ulicu';
  }

  if (!values.r008_cislo) {
    errors.r008_cislo = 'Zadajte číslo domu';
  }

  if (!values.r009_psc) {
    errors.r009_psc = 'Zadajte PSČ';
  }

  if (!values.r010_obec) {
    errors.r010_obec = 'Zadajte obec';
  }

  if (!values.r011_stat) {
    errors.r011_stat = 'Zadajte štát';
  }

  return errors;
};

export default OsobneUdaje;
