import React from 'react'
import { Page } from '../components/Page'
import { TaxForm } from '../types/TaxForm'
import { convertToXML } from '../lib/xml/xmlConverter'
import { RedirectField, RedirectForm } from '../components/RedirectForm'
import { setDate, toBase64 } from '../lib/utils'

const buildXml = (taxForm) => convertToXML(setDate(taxForm))

const buildFields = (taxForm: TaxForm): RedirectField[] => {
  const fullName = `${taxForm.r005_meno} ${taxForm.r004_priezvisko}`

  const xmlFile = toBase64(buildXml(taxForm))

  return [
    { name: 'submission[type]', value: 'EmailMeSubmissionInstructionsEmail' },
    {
      name: 'submission[callback_url]',
      value:
        '/zivotne-situacie/elektronicke-podanie-danoveho-priznania/krok/prihlasit-sa-na-financnu-spravu',
    },
    { name: 'submission[recipient_name]', value: fullName },
    {
      name: 'submission[attachments[]filename]',
      value: 'danove-priznanie.xml',
    },
    { name: 'submission[attachments[]body_base64]', value: xmlFile },
    { name: 'submission[extra][template_id', value: '166' },
    {
      name: 'submission[extra][params][recipient_name]',
      value: fullName,
    },
    {
      name: 'submission[subscription_types][]',
      value: 'EmailMeSubmissionInstructionsEmail',
    },
    {
      name: 'submission[subscription_types][]',
      value: 'SelfEmployedSubscription',
    },
    {
      name: 'submission[subscription_types][]',
      value: 'NewsletterSubscription',
    },
  ]
}

const ContinuePage: Page<{}> = ({ taxForm, taxFormUserInput }) => {
  return (
    <RedirectForm
      fields={buildFields(taxForm)}
      canContinue={!!taxFormUserInput.r004_priezvisko}
      debugDownload={buildXml(taxForm)}
    />
  )
}

export default ContinuePage
