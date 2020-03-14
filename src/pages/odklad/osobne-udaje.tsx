import React, { useEffect } from 'react';
import { Formik, Form, FormikProps } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as Yup from 'yup';
import { NextPage } from 'next';
import { Input } from '../../components/FormComponents';
import styles from '../osobne-udaje.module.css';
import { PersonalInformationPostpone } from '../../types/PageUserInputs';
import { getCity } from '../../lib/api';
import { AutoformResponseBody } from '../../types/api';
import { getPostponeRoutes } from '../../lib/routes';
import { FullNameAutoCompleteInput } from '../../components/FullNameAutoCompleteInput';
import { PostponeUserInput } from '../../types/PostponeUserInput';

const { nextRoute, previousRoute } = getPostponeRoutes('/odklad/osobne-udaje');

const makeHandlePersonAutoform = ({
  setValues,
  values,
}: FormikProps<PersonalInformationPostpone>) => {
  return (person: AutoformResponseBody) => {
    setValues({
      ...values,
      meno_priezvisko: person.name,
      dic: person?.tin ?? '',
      psc: person.postal_code ? person.postal_code.replace(/\D/g, '') : '',
      obec: person.municipality,
      stat: person.country,
    });
  };
};

interface Props {
  setPostponeUserInput: (values: PersonalInformationPostpone) => void;
  postponeUserInput: PostponeUserInput;
}
const OsobneUdaje: NextPage<Props> = ({
  setPostponeUserInput,
  postponeUserInput,
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
      <Formik<PersonalInformationPostpone>
        initialValues={postponeUserInput}
        validationSchema={validationSchema}
        onSubmit={values => {
          setPostponeUserInput(values);
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
                name="dic"
                type="text"
                label="DIČ"
              />
            </div>

            <h2>Adresa trvalého pobytu</h2>
            {/* <div className={styles.inlineFieldContainer}>
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
            </div> */}
            <div className={styles.inlineFieldContainer}>
              <Input
                className={styles.inlineField}
                name="psc"
                type="text"
                label="PSČ"
                onBlur={event => {
                  props.handleBlur(event);
                  const pscValue = event.target.value;
                  props.setFieldValue('psc', pscValue.replace(/\D/g, ''));
                }}
                onChange={async event => {
                  props.handleChange(event);
                  const pscValue = event.currentTarget.value;
                  const trimmedPSC = pscValue.replace(/\D/g, '');

                  if (trimmedPSC.length === 5) {
                    const city = await getCity(trimmedPSC);
                    props.setFieldValue('obec', city);
                  }
                }}
              />

              <Input
                className={styles.inlineField}
                name="obec"
                type="text"
                label="Obec"
              />
            </div>

            <Input name="stat" type="text" label="Štát" />

            <button className="govuk-button" type="submit">
              Pokračovať
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};

const validationSchema = Yup.object().shape<PersonalInformationPostpone>({
  dic: Yup.string()
    .required()
    .min(9)
    .max(10),
  meno_priezvisko: Yup.string().required(),
  psc: Yup.string().required(),
  obec: Yup.string().required(),
  stat: Yup.string().required(),
});
export default OsobneUdaje;
