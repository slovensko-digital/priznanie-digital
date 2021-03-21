import React from 'react'
import {Page} from '../components/Page'
import {TaxForm} from '../types/TaxForm'
import {convertToXML} from '../lib/xml/xmlConverter'
import {RedirectField, RedirectForm} from '../components/RedirectForm'
import {setDate, toBase64, formatCurrency} from '../lib/utils'

const buildXml = (taxForm) => convertToXML(setDate(taxForm))

const buildFields = (taxForm: TaxForm): RedirectField[] => {
  const fullName = `${taxForm.r005_meno}\u00A0${taxForm.r004_priezvisko}`

  const xmlFile = toBase64(buildXml(taxForm))

  const formatResult = (input): string => { return input.gt(0) ? formatCurrency(input.toNumber()) : '0,00 EUR' }
  // const summaryParams = Object.keys(taxForm.summary).map(key => (
  //   {
  //     name: `submission[extra][params][summary][${key}]`,
  //     value: taxForm.summary[key].gt(0) ? formatCurrency(taxForm.summary[key].toNumber()) : '0,00 EUR'
  //   }
  // ))

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
    { name: 'submission[extra][template_id', value: '166' },
    {
      name: 'submission[extra][params][recipient_name]',
      value: fullName,
    },
    {
      name: `submission[extra][params][summary][prijmy]`,
      value: formatResult(taxForm.prijmy)
    },
    {
      name: `submission[extra][params][summary][zdravotnePoistne]`,
      value: formatResult(taxForm.zdravotnePoistne)
    },
    {
      name: `submission[extra][params][summary][socialnePoistne]`,
      value: formatResult(taxForm.socialnePoistne)
    },
    {
      name: `submission[extra][params][summary][zaplatenePoistneSpolu]`,
      value: formatResult(taxForm.zaplatenePoistneSpolu)
    },
    {
      name: `submission[extra][params][summary][zvyhodnenieNaManz]`,
      value: formatResult(taxForm.zvyhodnenieNaManz)
    },
    {
      name: `submission[extra][params][summary][danovyBonusNaDieta]`,
      value: formatResult(taxForm.danovyBonusNaDieta)
    },    {
      name: `submission[extra][params][summary][prispevokNaDochodkovePoistenie]`,
      value: formatResult(taxForm.prispevokNaDochodkovePoistenie)
    },
    {
      name: `submission[extra][params][summary][uhradyZaKupeleSpolu]`,
      value: formatResult(taxForm.uhradyZaKupeleSpolu)
    },
    {
      name: `submission[extra][params][summary][zakladDane]`,
      value: formatResult(taxForm.zakladDane)
    },
    {
      name: `submission[extra][params][summary][danovyPreplatok]`,
      value: formatResult(taxForm.danovyPreplatok)
    },
    {
      name: `submission[extra][params][summary][danNaUhradu]`,
      value: formatResult(taxForm.danNaUhradu)
    },
  ]
}

const ContinuePage: Page<{}> = ({taxForm, taxFormUserInput}) => {
  return (
    <RedirectForm
      fields={buildFields(taxForm)}
      canContinue={!!taxFormUserInput.r004_priezvisko}
      debugDownload={buildXml(taxForm)}
    />
  )
}

export default ContinuePage
