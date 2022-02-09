import React from 'react'
import { Page } from '../../components/Page'
import { PostponeUserInput } from '../../types/PostponeUserInput'
import { convertPostponeToXML } from '../../lib/postpone/postponeConverter'
import { RedirectField, RedirectForm } from '../../components/RedirectForm'
import { setDate, toBase64 } from '../../lib/utils'
import { TAX_YEAR } from '../../lib/calculation'

const buildXml = (userInput) => convertPostponeToXML(setDate(userInput))

const buildFields = (userInput: PostponeUserInput): RedirectField[] => {
  const CALLBACK_PATH =
    '/zivotne-situacie/odklad-danoveho-priznania/krok/registrovat-sa-na-financnej-sprave'

  const fullName = `${userInput.meno} ${userInput.priezvisko}`
  const xmlFile = toBase64(buildXml(userInput))
  const deadline = userInput.prijmy_zo_zahranicia
    ? `30. september ${TAX_YEAR}`
    : `30. jún ${TAX_YEAR}`

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
    { name: 'submission[extra][template_id]', value: '166' },
    {
      name: 'submission[extra][params][recipient_name]',
      value: fullName,
    },
    {
      name: 'submission[extra][params][deadline]',
      value: deadline,
    },
  ]
}

const ContinuePage: Page<{}> = ({ postponeUserInput }) => {
  return (
    <RedirectForm
      fields={buildFields(postponeUserInput)}
      canContinue={!!postponeUserInput.priezvisko}
      debugDownload={buildXml(postponeUserInput)}
    />
  )
}

export default ContinuePage
