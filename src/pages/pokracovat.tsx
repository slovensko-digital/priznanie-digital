import React from 'react'
import { Page } from '../components/Page'
import { TaxForm } from '../types/TaxForm'
import { convertToXML } from '../lib/xml/xmlConverter'
import { RedirectField, RedirectForm } from '../components/RedirectForm'
import { setDate, toBase64, formatCurrency } from '../lib/utils'

const buildXml = (taxForm) => convertToXML(setDate(taxForm))

const buildSummaryParams = (params) => {
  return Object.keys(params).map((key) => ({
    name: `submission[extra][params][summary][${key}]`,
    value: params[key].gt(0)
      ? formatCurrency(params[key].toNumber())
      : '0,00 EUR',
  }))
}

const buildFields = (taxForm: TaxForm): RedirectField[] => {
  const CALLBACK_PATH = '/zivotne-situacie/elektronicke-podanie-danoveho-priznania/krok/prihlasit-sa-na-financnu-spravu'

  const xmlFile = toBase64(buildXml(taxForm))
  const fullName = `${taxForm.r005_meno}\u00A0${taxForm.r004_priezvisko}`

  return [
    { name: 'submission[type]', value: 'EmailMeSubmissionInstructionsEmail' },
    {
      name: 'submission[callback_url]',
      value: CALLBACK_PATH,
    },
    {
      name: 'submission[callback_step_path]',
      value: CALLBACK_PATH,
    },
    {
      name: 'submission[callback_step_status]',
      value: 'not_started',
    },
    {
      name: 'submission[attachments[]filename]',
      value: 'danove-priznanie.xml',
    },
    { name: 'submission[attachments[]body_base64]', value: xmlFile },
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
    { name: 'submission[extra][template_id]', value: '139' },
    {
      name: 'submission[extra][params][recipient_name]',
      value: fullName,
    },
    ...buildSummaryParams(taxForm.summary),
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
