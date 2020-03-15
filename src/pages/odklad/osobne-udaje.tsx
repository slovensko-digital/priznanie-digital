import React, { useEffect } from 'react';
import { Formik, Form, FormikProps } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as Yup from 'yup';
import { NextPage } from 'next';
import { Input } from '../../components/FormComponents';
import styles from '../osobne-udaje.module.css';
import { PersonalInformationPostponePage } from '../../types/PageUserInputs';
import { getCity } from '../../lib/api';
import { AutoformResponseBody } from '../../types/api';
import { getPostponeRoutes } from '../../lib/routes';
import { FullNameAutoCompleteInput } from '../../components/FullNameAutoCompleteInput';
import { PostponeUserInput } from '../../types/PostponeUserInput';

const { nextRoute, previousRoute } = getPostponeRoutes('/odklad/osobne-udaje');

const makeHandlePersonAutoform = ({
  setValues,
  values,
}: FormikProps<PersonalInformationPostponePage>) => {
  return (person: AutoformResponseBody) => {
    setValues({
      ...values,
      meno_priezvisko: person.name,
      dic: person?.tin ?? '',
      ulica: person.street ?? person.municipality,
      cislo: person.street_number,
      psc: person.postal_code ? person.postal_code.replace(/\D/g, '') : '',
      obec: person.municipality,
      stat: person.country,
    });
  };
};

interface Props {
  setPostponeUserInput: (values: PersonalInformationPostponePage) => void;
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
      <Formik<PersonalInformationPostponePage>
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
              {/* <Input
                className={styles.inlineField}
                name="rodne_cislo"
                type="text"
                label="Rodné číslo"
              /> */}
            </div>

            <h2>Adresa trvalého pobytu</h2>
            <div className={styles.inlineFieldContainer}>
              <Input
                className={styles.inlineField}
                name="ulica"
                type="text"
                label="Ulica"
              />
              <Input
                className={styles.inlineField}
                name="cislo"
                type="text"
                label="Súpisné/orientačné číslo"
              />
            </div>
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
/** https://github.com/kub1x/rodnecislo */
// const rodneCisloRegexp = /^\d{0,2}((0[1-9]|1[0-2])|(2[1-9]|3[0-2])|(5[1-9]|6[0-2])|(7[1-9]|8[0-2]))(0[1-9]|[12]\d|3[01])\/?\d{3,4}$/;

const validationSchema = Yup.object().shape<PersonalInformationPostponePage>({
  dic: Yup.string()
    .required()
    .min(9)
    .max(10),
  meno_priezvisko: Yup.string().required(),
  psc: Yup.string().required(),
  // rodne_cislo: Yup.string()
  //   .matches(rodneCisloRegexp, 'Zadajte valídne rodné číslo')
  //   .required(),
  obec: Yup.string().required(),
  ulica: Yup.string().required(),
  cislo: Yup.string().required(),
  stat: Yup.string().required(),
});
export default OsobneUdaje;
