import React from 'react'
import { Page } from '../../components/Page'
import { PostponeUserInput } from '../../types/PostponeUserInput'
import { convertPostponeToXML } from '../../lib/postpone/postponeConverter'
import { RedirectField, RedirectForm } from '../../components/RedirectForm'
import { setDate, toBase64 } from '../../lib/utils'

const buildXml = (userInput) => convertPostponeToXML(setDate(userInput))

const buildFields = (userInput: PostponeUserInput): RedirectField[] => {
  const fullName = `${userInput.meno} ${userInput.priezvisko}`
  const xmlFile = toBase64(buildXml(userInput))
  const deadline = userInput.prijmy_zo_zahranicia
    ? '30. september 2021'
    : '30. jún 2021'

  return [
    { name: 'submission[type]', value: 'EmailMeSubmissionInstructionsEmail' },
    {
      name: 'submission[callback_url]',
      value:
        'https://navody.digital/zivotne-situacie/odklad-danoveho-priznania/krok/registrovat-sa-na-financnej-sprave',
    },
    { name: 'submission[recipient_name]', value: fullName },
    {
      name: 'submission[attachments[]filename]',
      value: 'odklad-danoveho-priznania.xml',
    },
    { name: 'submission[attachments[]body_base64]', value: xmlFile },
    { name: 'submission[extra][template_id', value: '166' },
    {
      name: 'submission[extra][params][recipient_name]',
      value: fullName,
    },
    {
      name: 'submission[extra][params][deadline]',
      value: deadline,
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
