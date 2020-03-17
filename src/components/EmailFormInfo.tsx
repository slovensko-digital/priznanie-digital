import React, { useState } from 'react';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import classNames from 'classnames';
import styles from './EmailForm.module.css';
import { CheckboxSmall, Input } from './FormComponents';
import { saveEmailInfo } from '../lib/api';

const getErrorMessage = (code: string, message: string) => {
  switch (code) {
    case 'duplicate_parameter':
      return 'Tento email už v databáze existuje';
    case 'invalid_parameter':
      return 'Nesprávny formát emailovej adresy';
    default:
      return message ? `Chyba: ${message}` : 'Nastala chyba';
  }
};

interface EmailFormInfo {
  email: string;
  gdpr: boolean;
}

export interface EmailFormProps {
  formName: string;
}
export const EmailFormInfo = ({ formName }: EmailFormProps) => {
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const handleSubmit = async ({ email }, { setFieldError }) => {
    const { messageId, code, message } = await saveEmailInfo(email, {
      form: formName,
    });

    if (!messageId) {
      return setFieldError('email', getErrorMessage(code, message));
    }
    return setHasSubmitted(true);
  };

  return (
    <Formik<EmailFormInfo>
      initialValues={{ email: '', gdpr: false }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, values }) => {
        if (hasSubmitted) {
          return (
            <div className={styles.newsletterFormWrapper}>
              <p className={styles.newsletterFormSuccess}>
                Váš email <strong>{values.email}</strong> sme úspešne
                zaregistrovali.
                <br />
                Pošleme vám notifikáciu ked nasu aplikaciu spustime
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
                hint="Pripravujeme pre vás jednoduchý návod na vyplnenie daňového priznania zodpovedaním pár jednoduchých otázok.
Nechajte nám váš email a budete o tom vedieť ako prví."
              />
              <CheckboxSmall
                name="gdpr"
                label={
                  <p>
                    Oboznámil(a) som sa s informáciami v sekcii{' '}
                    <a href="#gdpr">Ochrana osobných údajov</a>
                  </p>
                }
              />

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

const validationSchema = Yup.object().shape<EmailFormInfo>({
  email: Yup.string()
    .required('Zadajte email')
    .email('Nesprávny formát'),
  gdpr: Yup.boolean().oneOf([true], 'Musíte súhlasit s GDPR'),
});
