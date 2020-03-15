import React, { useState } from 'react';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import classNames from 'classnames';
import styles from './EmailForm.module.css';
import { CheckboxSmall, Input } from './FormComponents';
import { saveEmail } from '../lib/api';
import { EmailUserInput } from '../types/UserInput';

const getErrorMessage = (code: string, message: string) => {
  switch (code) {
    case 'duplicate_parameter':
      return 'Tento email už v databáze existuje';
    case 'invalid_parameter':
      return 'Nesprávny formát emailovej adresy';
    default:
      return `Chyba: ${message}`;
  }
};

export interface EmailFormProps {
  applicantFullName: string;
  deadline: string;
  formName: string;
}
export const EmailForm = ({
  applicantFullName,
  deadline,
  formName,
}: EmailFormProps) => {
  const [savedWithNewsletter, setSavedWithNewsletter] = useState<boolean>(
    undefined,
  );
  const [savedEmail, setSavedEmail] = useState<string>('');

  const handleSubmit = async ({ email, newsletter }, { setFieldError }) => {
    const [firstName, ...lastName] = applicantFullName.split(' ');
    const { id, code, message } = await saveEmail(email, {
      firstname: firstName,
      lastname: lastName.join(' '),
      newsletter: !!newsletter,
      deadline,
      form: formName,
    });
    if (id) {
      setSavedWithNewsletter(newsletter);
      setSavedEmail(email);
    } else {
      setFieldError('email', getErrorMessage(code, message));
    }
  };

  if (savedWithNewsletter !== undefined) {
    return (
      <div className={styles.newsletterFormWrapper}>
        <p className={styles.newsletterFormSuccess}>
          Váš email <strong>{savedEmail}</strong> sme úspešne zaregistrovali.
          <br />
          Pošleme vám notifikáciu pred termínom.
          <br />
          {savedWithNewsletter && ' Pošleme vám aj newsletter.'}
        </p>
      </div>
    );
  }

  return (
    <Formik<EmailUserInput>
      initialValues={{ email: '', newsletter: false }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="box">
          <Input
            name="email"
            type="email"
            label="Chcete dostať upozornenie o novom termíne podania?"
            hint="Nechajte nám email a my vám včas pošleme notifikáciu"
          />
          <CheckboxSmall
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
              { 'govuk-button--disabled': isSubmitting },
            )}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Posielam...' : 'Poslať'}
          </button>
        </Form>
      )}
    </Formik>
  );
};

const validationSchema = Yup.object().shape<EmailUserInput>({
  email: Yup.string()
    .required('Zadajte email')
    .email('Nesprávny formát'),
  newsletter: Yup.boolean(),
});
