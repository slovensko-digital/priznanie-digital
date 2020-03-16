import React from 'react';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import classNames from 'classnames';
import styles from './EmailForm.module.css';
import { CheckboxSmall, Input } from './FormComponents';
import { saveEmail } from '../lib/api';
import { EmailUserInput } from '../types/UserInput';
import { PostponeUserInput } from '../types/PostponeUserInput';
import { setDate } from '../lib/utils';

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
  postponeUserInput: PostponeUserInput;
  setPostponeUserInput: (values: Partial<PostponeUserInput>) => void;
}
export const EmailForm = ({
  applicantFullName,
  deadline,
  formName,
  postponeUserInput,
  setPostponeUserInput,
}: EmailFormProps) => {
  const handleSubmit = async ({ email, newsletter }, { setFieldError }) => {
    const [firstName, ...lastName] = applicantFullName.split(' ');
    const { id, code, message } = await saveEmail(
      email,
      {
        firstname: firstName,
        lastname: lastName.join(' '),
        newsletter: !!newsletter,
        deadline,
        form: formName,
      },
      setDate(postponeUserInput),
    );
    if (id) {
      setPostponeUserInput({ ...postponeUserInput, email, newsletter });
    } else {
      setFieldError('email', getErrorMessage(code, message));
    }
  };

  if (postponeUserInput.email) {
    return (
      <div className={styles.newsletterFormWrapper}>
        <p className={styles.newsletterFormSuccess}>
          Váš email <strong>{postponeUserInput.email}</strong> sme úspešne
          zaregistrovali.
          <br />
          Pošleme vám notifikáciu pred novým termínom{' '}
          {postponeUserInput.prijmy_zo_zahranicia
            ? '(30. jún 2020)'
            : '(30. september 2020)'}
          .
          <br />
          {postponeUserInput.newsletter && ' Pošleme vám aj newsletter.'}
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
