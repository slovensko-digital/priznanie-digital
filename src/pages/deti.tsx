import React, { useEffect } from 'react';
import Link from 'next/link';
import { Form } from 'formik';
import { useRouter } from 'next/router';
import { NextPage } from 'next';
import styles from './deti.module.css';
import {
  BooleanRadio,
  Input,
  CheckboxSmall,
  FormWrapper,
} from '../components/FormComponents';
import { ChildrenUserInput } from '../types/PageUserInputs';
import { TaxFormUserInput } from '../types/TaxFormUserInput';
import { getRoutes } from '../lib/routes';
import { emptyChild } from '../lib/initialValues';

const { nextRoute, previousRoute } = getRoutes('/deti');

interface Props {
  setTaxFormUserInput: (values: ChildrenUserInput) => void;
  taxFormUserInput: TaxFormUserInput;
}
const Deti: NextPage<Props> = ({
  setTaxFormUserInput,
  taxFormUserInput,
}: Props) => {
  const router = useRouter();
  useEffect(() => {
    router.prefetch(nextRoute);
  });

  const addEmptyChild = () => {
    setTaxFormUserInput({
      r034: taxFormUserInput?.r034?.concat([emptyChild]),
    });
  };
  return (
    <>
      <Link href={previousRoute}>
        <a data-test="back" className="govuk-back-link">
          Späť
        </a>
      </Link>
      <FormWrapper<ChildrenUserInput>
        initialValues={taxFormUserInput}
        // validationSchema={validationSchema}
        onSubmit={values => {
          setTaxFormUserInput(values);
          router.push(nextRoute);
        }}
      >
        {({ values }) => (
          <Form className="form">
            <BooleanRadio
              title="Máte dieťa do 16 rokov alebo študenta do 25 rokov, s ktorým žijete v spoločnej domácnosti?"
              name="children"
            />
            <p>
              V prípade, že sa staráte o nezaopatrené dieťa do 16 rokov,
              študenta do 25 rokov alebo o nezaopatrené dieťa do 25 rokov, ktoré
              je dlhodobo choré, máte právo na zľavu na dani vo výške 21.56 €
              mesačne. Ročný bonus na dieťa činí 258.72 €. Daňový bonus na dieťa
              si môže uplatniť iba jeden z rodičov.
            </p>
            {values.children && (
              <div className={styles.childrenInputGroup}>
                {taxFormUserInput?.r034?.map((child, index) => (
                  <div key={child.rodneCislo}>
                    <Input
                      name={`r034[${index}].priezviskoMeno` as any}
                      type="text"
                      label="Meno a priezvisko"
                    />
                    <Input
                      name={`r034[${index}].rodneCislo` as any}
                      type="text"
                      label="Rodné číslo"
                    />
                    <div className="govuk-form-group">
                      <fieldset
                        className="govuk-fieldset"
                        aria-describedby="waste-hint"
                      >
                        <legend className="govuk-fieldset__legend govuk-fieldset__legend--s">
                          <h1 className="govuk-fieldset__heading">
                            Daňový bonus podľa § 33 zákona uplatňujem v
                            mesiacoch
                          </h1>
                        </legend>
                        <span id="waste-hint" className="govuk-hint">
                          Select all that apply.
                        </span>
                        <div className="govuk-checkboxes">
                          {[
                            [`r034[${index}].m00`, 'Januar az december'],
                            [`r034[${index}].m01`, 'Januar'],
                            [`r034[${index}].m02`, 'Feburar'],
                            [`r034[${index}].m03`, 'Marec'],
                            [`r034[${index}].m04`, 'April'],
                            [`r034[${index}].m05`, 'Maj'],
                            [`r034[${index}].m06`, 'Jun'],
                            [`r034[${index}].m07`, 'Jul'],
                            [`r034[${index}].m08`, 'August'],
                            [`r034[${index}].m09`, 'September'],
                            [`r034[${index}].m10`, 'Oktober'],
                            [`r034[${index}].m11`, 'November'],
                            [`r034[${index}].m12`, 'December'],
                          ].map(([name, label]) => (
                            <CheckboxSmall name={name} label={label} />
                          ))}
                        </div>
                      </fieldset>
                    </div>
                  </div>
                ))}
                <button
                  className="btn-secondary govuk-button"
                  type="button"
                  onClick={addEmptyChild}
                  data-test="add-child"
                >
                  Pridať ďalšie dieťa
                </button>
              </div>
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

// const validationSchema = Yup.object().shape<ChildrenUserInput>({
//   children: Yup.boolean()
//     .required()
//     .nullable(),
//   r034: Yup.mixed().when('childs', {
//     is: true,
//     then: Yup.mixed(),
//   }),
//   // R039: Yup.number().when("employed", {
//   //   is: true,
//   //   then: Yup.number().required(),
//   // }),
// });

export default Deti;
