import React from 'react'
import getConfig from 'next/config'
import { Page } from '../../components/Page'
import { PostponeUserInput } from '../../types/PostponeUserInput'
import { convertPostponeToXML } from '../../lib/postpone/postponeConverter'
import { RedirectField, RedirectForm } from '../../components/RedirectForm'
import { setDate, toBase64 } from '../../lib/utils'
import { TAX_YEAR } from '../../lib/calculation'

const {
  publicRuntimeConfig: { odkladEmailTemplateId, navodyBaseUrl, odkladStepUrl },
} = getConfig()

const buildXml = (userInput) => convertPostponeToXML(setDate(userInput))

const callback_action = `${navodyBaseUrl}${odkladStepUrl}`

const buildFields = (userInput: PostponeUserInput): RedirectField[] => {
  const fullName = `${userInput.meno} ${userInput.priezvisko}`
  const xmlFile = toBase64(buildXml(userInput))
  const deadline = userInput.prijmy_zo_zahranicia
    ? `30. september ${TAX_YEAR + 1}`
    : `30. jún ${TAX_YEAR + 1}`

  return [
    { name: 'submission[type]', value: 'EmailMeSubmissionInstructionsEmail' },
    {
      name: 'submission[callback_url]',
      value: odkladStepUrl,
    },
    {
      name: 'submission[callback_step_path]',
      value: odkladStepUrl,
    },
    {
      name: 'submission[callback_step_status]',
      value: 'not_started',
    },
    {
      name: 'submission[attachments[]filename]',
      value: 'odklad-danoveho-priznania.xml',
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
      value: odkladEmailTemplateId,
    },
    {
      name: 'submission[extra][params][recipient_name]',
      value: fullName,
    },
    {
      name: 'submission[extra][params][deadline]',
      value: deadline,
    },
    {
      name: 'submission[extra][params][callback_action]',
      value: callback_action,
    },
  ]
}

const ContinuePage: Page<{}> = ({ postponeUserInput, isDebug }) => {
  return (
    <RedirectForm
      isDebug={isDebug}
      fields={buildFields(postponeUserInput)}
      canContinue={!!postponeUserInput.priezvisko}
      debugDownload={buildXml(postponeUserInput)}
    />
  )
}

export default ContinuePage
