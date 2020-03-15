import { AppProps } from 'next/app';

/* eslint-disable import/no-unassigned-import */
import '../styles/global.css';
import '../styles/navody-digital-0.1.8.min.css';
import '../styles/libs.css';
/* eslint-enable import/no-unassigned-import */

import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { setLocale } from 'yup';
import { calculate } from '../lib/calculation';
import { TaxFormUserInput } from '../types/TaxFormUserInput';
import { TaxForm } from '../types/TaxForm';
import Layout from '../components/Layout';
import {
  initialPostponeUserInput,
  initTaxFormUserInputValues,
} from '../lib/initialValues';
import { setDate } from '../lib/utils';
import { PostponeUserInput } from '../types/PostponeUserInput';

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
  const [postponeUserInput, setPostponeUserInput] = useState<PostponeUserInput>(
    initialPostponeUserInput,
  );

  const updateTaxFormUserInput = (values: Partial<TaxFormUserInput>): void => {
    setTaxFormUserInput(prevUserInput => {
      const newUserInput: TaxFormUserInput = { ...prevUserInput, ...values };
      setTaxForm(calculate(setDate(newUserInput)));
      return newUserInput;
    });
  };

  const { pathname } = useRouter();

  const headline = /^\/odklad\//.test(pathname)
    ? 'Odklad daňového priznania'
    : 'Daňové priznanie pre živostníkov s paušálnymi výdavkami (DPFO typ B)';

  return (
    <Layout
      headline={headline}
      taxFormUserInput={taxFormUserInput}
      postponeUserInput={postponeUserInput}
    >
      <Component
        taxForm={taxForm}
        taxFormUserInput={taxFormUserInput}
        setTaxFormUserInput={updateTaxFormUserInput}
        postponeUserInput={postponeUserInput}
        setPostponeUserInput={setPostponeUserInput}
        {...pageProps}
      />
    </Layout>
  );
};

export default MyApp;
