/* eslint-disable import/no-default-export */
import { AppProps } from 'next/app';

import '../styles/global.css';
import '../styles/navody-digital-0.1.8.min.css';
import '../styles/libs.css';

import React, { useState } from 'react';
import { setLocale } from 'yup';
import { calculate } from '../lib/calculation';
import { TaxForm, TaxFormUserInput } from '../lib/types';
import Layout from '../components/Layout';
import { initTaxFormUserInputValues } from '../lib/initialValues';
import { sortObjectKeys } from '../lib/utils';

/* eslint-disable no-template-curly-in-string */
setLocale({
  mixed: {
    default: 'Hodnota nie je správna',
    required: 'Toto pole musí byť vyplnené',
  },
  number: {
    min: 'Môže mať hodnotu najmenej  ${min}',
    max: 'Môže mať hodnotu najviac ${max}',
  },
  string: {
    min: 'Musí mať aspoň ${min} znakov',
    max: 'Môže mať maximálne ${max} znakov',
  },
});
/* eslint-enable no-template-curly-in-string */

const MyApp: React.FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  const [taxForm, setTaxForm] = useState<TaxForm | Record<string, unknown>>({});
  const [taxFormUserInput, setTaxFormUserInput] = useState<TaxFormUserInput>(
    initTaxFormUserInputValues,
  );

  const updateTaxFormUserInput = (values: Partial<TaxFormUserInput>): void => {
    setTaxFormUserInput(prevUserInput => {
      const newUserInput = { ...prevUserInput, ...values };
      setTaxForm(calculate(newUserInput));
      return newUserInput;
    });
  };

  return (
    <Layout
      debug={
        <div>
          TaxFormUserInput
          <pre>{JSON.stringify(sortObjectKeys(taxFormUserInput), null, 2)}</pre>
          TaxForm
          <pre id="TaxForm">
            {JSON.stringify(sortObjectKeys(taxForm), null, 2)}
          </pre>
        </div>
      }
    >
      <Component
        taxForm={taxForm}
        taxFormUserInput={taxFormUserInput}
        setTaxFormUserInput={updateTaxFormUserInput}
        {...pageProps}
      />
    </Layout>
  );
};

export default MyApp;
