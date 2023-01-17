import React from 'react'
import getConfig from 'next/config'
import { Page } from '../components/Page'
import { TaxForm } from '../types/TaxForm'
import { convertToXML } from '../lib/xml/xmlConverter'
import { RedirectField, RedirectForm } from '../components/RedirectForm'
import { setDate, toBase64, formatCurrency } from '../lib/utils'
import { buildSummary } from '../lib/calculation'
import { Summary } from '../types/Summary'

const {
  publicRuntimeConfig: { priznanieEmailTemplateId },
} = getConfig()

const buildXml = (taxForm: TaxForm) => convertToXML(setDate(taxForm))

const buildSummaryFields = (obj: Summary) => {
  return Object.keys(obj).map((key) => ({
    name: `submission[extra][params][summary][${key}]`,
    value: obj[key].gt(0) ? formatCurrency(obj[key].toNumber()) : '0,00 EUR',
  }))
}

const buildFields = (taxForm: TaxForm): RedirectField[] => {
  const CALLBACK_PATH =
    '/zivotne-situacie/elektronicke-podanie-danoveho-priznania/krok/prihlasit-sa-na-financnu-spravu'

  const xmlFile = toBase64(buildXml(taxForm))
  const fullName = `${taxForm.r005_meno}\u00A0${taxForm.r004_priezvisko}`
  const summaryFields = buildSummaryFields(buildSummary(taxForm))

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
    {
      name: 'submission[extra][template_id]',
      value: priznanieEmailTemplateId,
    },
    {
      name: 'submission[extra][params][recipient_name]',
      value: fullName,
    },
    ...summaryFields,
  ]
}

const ContinuePage: Page<{}> = ({ taxForm, taxFormUserInput, isDebug }) => {
  return (
    <RedirectForm
      isDebug={isDebug}
      fields={buildFields(taxForm)}
      canContinue={!!taxFormUserInput.r004_priezvisko}
      debugDownload={buildXml(taxForm)}
    />
  )
}

export default ContinuePage
