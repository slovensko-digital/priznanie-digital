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
  publicRuntimeConfig: { priznanieEmailTemplateId, navodyBaseUrl, priznanieStepUrl },
} = getConfig()

const action_url = `${navodyBaseUrl}${priznanieStepUrl}`

const buildXml = (taxForm: TaxForm) => convertToXML(setDate(taxForm))

const buildSummaryFields = (obj: Summary) => {
  return Object.keys(obj).map((key) => ({
    name: `submission[extra][params][summary][${key}]`,
    value: obj[key].eq(0) ? '0,00 EUR' : formatCurrency(obj[key].toNumber()),
  }))
}

const buildFields = (taxForm: TaxForm): RedirectField[] => {
  const xmlFile = toBase64(buildXml(taxForm))
  const fullName = `${taxForm.r005_meno}\u00A0${taxForm.r004_priezvisko}`
  const summaryFields = buildSummaryFields(buildSummary(taxForm))

  return [
    { name: 'submission[type]', value: 'EmailMeSubmissionInstructionsEmail' },
    {
      name: 'submission[callback_url]',
      value: priznanieStepUrl,
    },
    {
      name: 'submission[callback_step_path]',
      value: priznanieStepUrl,
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
    {
      name: 'submission[extra][params][action_url]',
      value: action_url,
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
