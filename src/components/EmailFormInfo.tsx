import React from 'react';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import classNames from 'classnames';
import styles from './EmailForm.module.css';
import { CheckboxSmall, Input } from './FormComponents';
import { saveEmailInfo } from '../lib/api';
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
  formName: string;
}
export const EmailFormInfo = ({ formName }: EmailFormProps) => {
  const handleSubmit = async ({ email, newsletter }, { setFieldError }) => {
    const { messageId, code, message } = await saveEmailInfo(email, {
      newsletter: !!newsletter,
      form: formName,
    });

    if (!messageId) {
      setFieldError('email', getErrorMessage(code, message));
    }
  };

  return (
    <Formik<EmailUserInput>
      initialValues={{ email: '', newsletter: false }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, values }) => {
        if (values.email) {
          return (
            <div className={styles.newsletterFormWrapper}>
              <p className={styles.newsletterFormSuccess}>
                Váš email <strong>{values.email}</strong> sme úspešne
                zaregistrovali.
                <br />
                Pošleme vám notifikáciu ked nasu aplikaciu spustime
                <br />
                {values.newsletter && ' Pošleme vám aj newsletter.'}
              </p>
            </div>
          );
        }
        return (
          <div>
            <Form className="box">
              <Input
                name="email"
                type="email"
                label="Chcete dostať upozornenie ked spustime?"
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
                data-test="send-email"
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
          </div>
        );
      }}
    </Formik>
  );
};

const validationSchema = Yup.object().shape<EmailUserInput>({
  email: Yup.string()
    .required('Zadajte email')
    .email('Nesprávny formát'),
  newsletter: Yup.boolean(),
});
