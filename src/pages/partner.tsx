import React, { useEffect } from 'react';
import Link from 'next/link';
import { Form } from 'formik';
import { useRouter } from 'next/router';
import { NextPage } from 'next';
import { rodnecislo } from 'rodnecislo';
import { BooleanRadio, FormWrapper, Input } from '../components/FormComponents';
import { FormErrors, PartnerUserInput } from '../types/PageUserInputs';
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
        onSubmit={(values) => {
          setTaxFormUserInput(values);
          router.push(nextRoute);
        }}
      >
        {({ values, errors, touched }) => (
          <Form className="form" noValidate>
            <BooleanRadio
              title="Uplatňujete si daňový bonus na manželku/manžela?"
              name="r032_uplatnujem_na_partnera"
            />
            {values.r032_uplatnujem_na_partnera && (
              <>
                <ErrorSummary<PartnerUserInput>
                  errors={errors}
                  touched={touched}
                />
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
                  placeholder="Počet mesiacov"
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

export const validate = (values: PartnerUserInput) => {
  const errors: Partial<FormErrors<PartnerUserInput>> = {};

  if (typeof values.r032_uplatnujem_na_partnera === 'undefined') {
    errors.r032_uplatnujem_na_partnera = 'Vyznačte odpoveď';
  }

  if (values.r032_uplatnujem_na_partnera) {
    if (!values.r031_priezvisko_a_meno) {
      errors.r031_priezvisko_a_meno = 'Zadajte meno manžela/manželky.';
    }
    if (!values.r031_rodne_cislo) {
      errors.r031_rodne_cislo = 'Zadajte rodné číslo manžela/manželky';
    } else if (!rodnecislo(values.r031_rodne_cislo).isValid()) {
      errors.r031_rodne_cislo = 'Zadajte rodné číslo (bez medzier)';
    }

    if (!values.r032_partner_vlastne_prijmy) {
      errors.r032_partner_vlastne_prijmy =
        'Zadajte vlastné príjmy manžela/manželky';
    } else if (!values.r032_partner_vlastne_prijmy.match(numberInputRegexp)) {
      errors.r032_partner_vlastne_prijmy = 'Zadajte príjmy vo formáte 123,45';
    }
    if (!values.r032_partner_pocet_mesiacov) {
      errors.r032_partner_pocet_mesiacov =
        'Zadajte počet mesiacov, kedy mal/a manžel/manželka príjem.';
    } else if (
      !values.r032_partner_pocet_mesiacov.match(/^\d+$/) ||
      parseInt(values.r032_partner_pocet_mesiacov, 10) < 0 ||
      parseInt(values.r032_partner_pocet_mesiacov, 10) > 12
    ) {
      errors.r032_partner_pocet_mesiacov =
        'Zadajte počet mesiacov - číslo od 0 do 12';
    }
  }

  return errors;
};

export default Partner;
