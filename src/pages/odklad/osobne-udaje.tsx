import React, { useEffect } from 'react';
import { Formik, Form, FormikProps } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as Yup from 'yup';
import { NextPage } from 'next';
import classnames from 'classnames';
import { Input } from '../../components/FormComponents';
import styles from '../osobne-udaje.module.css';
import { PersonalInformationPostponePage } from '../../types/PageUserInputs';
import { getCity } from '../../lib/api';
import { AutoformResponseBody } from '../../types/api';
import { getPostponeRoutes } from '../../lib/routes';
import { FullNameAutoCompleteInput } from '../../components/FullNameAutoCompleteInput';
import { PostponeUserInput } from '../../types/PostponeUserInput';
import { ErrorSummary } from '../../components/ErrorSummary';
import { formatPsc } from '../../lib/utils';

const { nextRoute, previousRoute } = getPostponeRoutes('/odklad/osobne-udaje');

const makeHandlePersonAutoform = ({
  setValues,
  values,
}: FormikProps<PersonalInformationPostponePage>) => {
  return (person: AutoformResponseBody) => {
    setValues({
      ...values,
      meno_priezvisko: person.name,
      dic: person?.tin ?? values.dic,
      ulica: person.street ?? person.municipality,
      cislo: person.street_number,
      psc: person.postal_code ? formatPsc(person.postal_code) : '',
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
    if (postponeUserInput.prijmy_zo_zahranicia === undefined) {
      router.replace(previousRoute);
    }
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
          <>
            <ErrorSummary<PersonalInformationPostponePage>
              errors={props.errors}
              touched={props.touched}
            />
            <Form className="form">
              <h1 className="govuk-heading-l govuk-!-margin-top-3">
                Údaje o daňovníkovi
              </h1>

              <div className={styles.inlineFieldContainer}>
                <Input
                  className={styles.inlineField}
                  hint="Napríklad 1234567890"
                  name="dic"
                  type="text"
                  label="DIČ"
                  width={10}
                />
              </div>

              <p>
                Údaje môžete vyhladať a automaticky vyplniť podľa mena a
                priezviska.
              </p>

              <FullNameAutoCompleteInput
                handlePersonAutoform={makeHandlePersonAutoform(props)}
              />

              <h2>Adresa trvalého pobytu</h2>
              <div className={styles.inlineFieldContainer}>
                <Input
                  name="ulica"
                  hint="Napríklad Obchodná"
                  type="text"
                  label="Ulica"
                  width="auto"
                  className={classnames(
                    styles.flexGrow,
                    'govuk-!-margin-right-5',
                  )}
                />
                <Input
                  name="cislo"
                  type="text"
                  hint="Napríklad 9"
                  label="Súpisné/orientačné číslo"
                  width="auto"
                />
              </div>
              <div className={styles.inlineFieldContainer}>
                <Input
                  className="govuk-!-margin-right-5"
                  name="psc"
                  hint="Napr. 811 06"
                  type="text"
                  label="PSČ"
                  width={5}
                  maxLength={6}
                  onChange={async event => {
                    const pscValue = formatPsc(
                      event.currentTarget.value,
                      props.values.psc,
                    );
                    props.setFieldValue('psc', pscValue);

                    if (
                      pscValue.length === 6 &&
                      props.values.obec.length === 0
                    ) {
                      const city = await getCity(pscValue);
                      props.setFieldValue('obec', city);
                    }
                  }}
                />

                <Input
                  name="obec"
                  type="text"
                  hint="Napríklad Bratislava"
                  label="Obec"
                  width="auto"
                  className={styles.flexGrow}
                />
              </div>

              <Input
                name="stat"
                type="text"
                label="Štát"
                width={10}
                hint="Napríklad Slovensko"
              />

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
/** https://github.com/kub1x/rodnecislo */
// const rodneCisloRegexp = /^\d{0,2}((0[1-9]|1[0-2])|(2[1-9]|3[0-2])|(5[1-9]|6[0-2])|(7[1-9]|8[0-2]))(0[1-9]|[12]\d|3[01])\/?\d{3,4}$/;

const validationSchema = Yup.object().shape<PersonalInformationPostponePage>({
  /**
   * @see https://ec.europa.eu/taxation_customs/tin/pdf/sk/TIN_-_subject_sheet_-_2_structure_and_specificities_sk.pdf
   */
  dic: Yup.string()
    .required('Zadajte pridelené DIČ')
    .min(9, 'DIČ môže mať minimálne 9 znakov')
    .max(10, 'DIČ môže mať maximálne 10 znakov'),
  meno_priezvisko: Yup.string().required('Zadajte vaše meno a priezvisko'),
  psc: Yup.string().required('Zadajte PSČ'),
  // rodne_cislo: Yup.string()
  //   .matches(rodneCisloRegexp, 'Zadajte valídne rodné číslo')
  //   .required(),
  obec: Yup.string().required('Zadajte obec'),
  ulica: Yup.string().required('Zadajte ulicu'),
  cislo: Yup.string().required('Zadajte číslo domu'),
  stat: Yup.string().required('Zadajte štát'),
});
export default OsobneUdaje;
