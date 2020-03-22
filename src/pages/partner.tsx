import React, { useEffect } from 'react';
import Link from 'next/link';
import { Form } from 'formik';
import { useRouter } from 'next/router';
import { NextPage } from 'next';
import { BooleanRadio, FormWrapper, Input } from '../components/FormComponents';
import {
  EmployedUserInput,
  FormErrors,
  PartnerUserInput,
} from '../types/PageUserInputs';
import { TaxFormUserInput } from '../types/TaxFormUserInput';
import { ErrorSummary } from '../components/ErrorSummary';
import { getRoutes } from '../lib/routes';
import { numberInputRegexp } from '../lib/utils';

const { nextRoute, previousRoute } = getRoutes('/partner');

interface Props {
  setTaxFormUserInput: (values: PartnerUserInput) => void;
  taxFormUserInput: TaxFormUserInput;
}

const Partner: NextPage<Props> = ({
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
        <a className="govuk-back-link">Späť</a>
      </Link>
      <FormWrapper<PartnerUserInput>
        initialValues={taxFormUserInput}
        validate={validate}
        // validationSchema={validationSchema}
        onSubmit={values => {
          setTaxFormUserInput(values);
          router.push(nextRoute);
        }}
      >
        {({ values, errors, touched }) => (
          <Form className="form">
            <BooleanRadio
              title="Uplatňujete si daňový bonus na manželku/manžela?"
              name="r032_uplatnujem_na_partnera"
            />
            <ErrorSummary<PartnerUserInput> errors={errors} touched={touched} />
            {values.r032_uplatnujem_na_partnera && (
              <>
                <Input
                  name="r031_priezvisko_a_meno"
                  type="text"
                  label="Meno a priezvisko manželky/manžela"
                />
                <Input
                  name="r031_rodne_cislo"
                  type="text"
                  label="Rodné číslo"
                />
                <Input
                  name="r032_partner_vlastne_prijmy"
                  type="number"
                  label="Vlastné príjmy manželky/manžela"
                />
                <Input
                  name="r032_partner_pocet_mesiacov"
                  type="number"
                  label="Počet mesiacov, kedy mala manželka príjem?"
                />
                {/* <Checkbox name="r033_partner_kupele" title="Partner kupele?" />
                {values.r033_partner_kupele && (
                  <>
                    <Input
                      name="r033_partner_kupele_uhrady"
                      type="number"
                      label="Partner kupele uhrady"
                    />
                  </>
                )} */}
              </>
            )}
            <button className="govuk-button" type="submit">
              Pokračovať
            </button>
          </Form>
        )}
      </FormWrapper>
    </>
  );
};

const validate = (values: PartnerUserInput) => {
  const errors: Partial<FormErrors<PartnerUserInput>> = {};

  if (values.r032_uplatnujem_na_partnera) {
    if (!values.r031_priezvisko_a_meno) {
      errors.r031_priezvisko_a_meno =
        'Zadajte meno vasho/vasej manzela/manzelky.';
    }
    if (!values.r031_rodne_cislo) {
      errors.r031_rodne_cislo = 'Zadajte rodne cislo manzela/manzelky';
    }

    if (
      !values.r032_partner_vlastne_prijmy &&
      !values.r032_partner_vlastne_prijmy.match(numberInputRegexp)
    ) {
      errors.r032_partner_vlastne_prijmy =
        'Zadajte vlastne prijmy manzela/manzelky';
    }
    if (!values.r032_partner_pocet_mesiacov) {
      errors.r032_partner_pocet_mesiacov =
        'Zadajte pocet mesiacov, kedy mal/a manzel/manzelka prijem.';
    }
  }

  return errors;
};

export default Partner;
