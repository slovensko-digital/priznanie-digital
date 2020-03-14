import React, { useState } from 'react';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import classNames from 'classnames';
import styles from './EmailForm.module.css';
import { Checkbox, Input } from './FormComponents';
import { saveEmail } from '../lib/api';

interface EmailFormFields {
  email: string;
  newsletter: boolean;
}

export interface EmailFormProps {
  name: string;
}
export const EmailForm = ({ name }: EmailFormProps) => {
  const [savingInProgress, setSavingInProgress] = useState<boolean>(false);
  const [savedWithNewsletter, setSavedWithNewsletter] = useState<boolean>(
    undefined,
  );
  const [email, setEmail] = useState<string>('');

  if (savedWithNewsletter !== undefined) {
    return (
      <div className={styles.newsletterFormWrapper}>
        <p className={styles.newsletterFormSuccess}>
          Váš email <strong>{email}</strong> sme úspešne zaregistrovali.
          <br />
          Pošleme vám notifikáciu pred termínom.
          <br />
          {savedWithNewsletter && ' Pošleme vám aj newsletter.'}
        </p>
      </div>
    );
  }

  return (
    <Formik<EmailFormFields>
      initialValues={{ email: '', newsletter: false }}
      validationSchema={validationSchema}
      onSubmit={async values => {
        setSavingInProgress(true);
        await saveEmail(name, values.email, values.newsletter);
        setSavedWithNewsletter(values.newsletter);
        setEmail(values.email);
        setSavingInProgress(false);
      }}
    >
      <Form className={styles.newsletterFormWrapper}>
        <Input
          name="email"
          type="email"
          label="Chcete dostať upozornenie o novom termíne podania?"
          hint="Nechajte nám email a my vám včas pošleme notifikáciu"
        />
        <Checkbox
          name="newsletter"
          label="Mám záujem o zasielanie informačného newslettera s praktickými radami pre živnostníkov"
        />
        <p>
          Oboznámil(a) som sa s informáciami v sekcii{' '}
          <a href="#gdpr">Ochrana osobných údajov</a>
        </p>
        <button
          type="submit"
          className={classNames(
            'btn-secondary',
            'govuk-button',
            'govuk-button--large',
            { 'govuk-button--disabled': savingInProgress },
          )}
          disabled={savingInProgress}
        >
          {savingInProgress ? 'Posielam...' : 'Poslať'}
        </button>
      </Form>
    </Formik>
  );
};

const validationSchema = Yup.object().shape<EmailFormFields>({
  email: Yup.string()
    .required('Zadajte email')
    .email('Nesprávny formát'),
  newsletter: Yup.boolean(),
});
