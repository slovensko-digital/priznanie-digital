import React, { useEffect } from 'react';
import Link from 'next/link';
import { Formik, Form } from 'formik';
import { useRouter } from 'next/router';
import { NextPage } from 'next';
import { BooleanRadio, Input } from '../components/FormComponents';
import { PensionUserInput } from '../types/PageUserInputs';
import { TaxFormUserInput } from '../types/TaxFormUserInput';
import { getRoutes } from '../lib/routes';
import { numberInputRegexp } from '../lib/utils';

const { nextRoute, previousRoute } = getRoutes('/dochodok');

interface Props {
  setTaxFormUserInput: (values: PensionUserInput) => void;
  taxFormUserInput: TaxFormUserInput;
}

const Dochodok: NextPage<Props> = ({
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
      <Formik<PensionUserInput>
        initialValues={taxFormUserInput}
        validate={validate}
        // validationSchema={validationSchema}
        onSubmit={values => {
          setTaxFormUserInput(values);
          router.push(nextRoute);
        }}
      >
        {({ values }) => (
          <Form className="form">
            <BooleanRadio
              title="Platili ste príspevky na doplnkové dôchodkové poistenie (III. pilier) v roku 2019?"
              name="r029_poberal_dochodok"
            />
            {values.r029_poberal_dochodok && (
              <>
                <Input
                  name="r030_vyska_dochodku"
                  type="number"
                  label="Vyska dochodku"
                />
              </>
            )}
            <button data-test="next" className="govuk-button" type="submit">
              Pokračovať
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};

const validate = (values: PensionUserInput): any => {
  const errors: any = {};

  if (
    values.r029_poberal_dochodok &&
    !values.r030_vyska_dochodku &&
    !values.r030_vyska_dochodku.match(numberInputRegexp)
  ) {
    errors.r030_vyska_dochodku = 'Zadajte vysku dochodku';
  }

  return errors;
};

// const validationSchema = Yup.object().shape<PensionUserInput<number>>({
//   r029_poberal_dochodok: Yup.boolean()
//     .required()
//     .nullable(),
//   r030_vyska_dochodku: Yup.number().when('r029_poberal_dochodok', {
//     is: true,
//     then: Yup.number().required(),
//   }),
// });

export default Dochodok;
