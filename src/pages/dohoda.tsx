import { makePotvrdeniaPage } from '../components/PotvrdeniaPage'
import { dohodaUserInputInitialValues } from '../lib/initialValues'
import { TAX_YEAR } from '../lib/calculation'
import { DOHODA_TOTALS } from '../lib/potvrdenia'

const { PotvrdeniaPage, validate, validateItem } = makePotvrdeniaPage({
  flag: 'dohoda',
  list: 'dohody',
  totals: DOHODA_TOTALS,
  emptyValues: dohodaUserInputInitialValues,
  question: `Mali ste v roku ${TAX_YEAR} príjmy z dohôd v SR?`,
  prijmy: {
    label: 'Úhrn príjmov plynúcich na základe dohody',
    hint: 'Na tlačive "Potvrdenie o zdaniteľných príjmoch" nájdete tento údaj v riadku 01a.',
    required: 'Zadajte úhrn príjmov z dohody',
  },
  itemName: 'Dohoda',
  nameLabel: 'Názov dohody (nepovinné)',
  nameHint: 'Napríklad "Dohoda o vykonaní práce – ABC s.r.o."',
  addButton: 'Pridať dohodu',
  saveButton: 'Uložiť dohodu',
  addAnotherQuestion: 'Potrebujete pridať ďalšiu dohodu?',
  addedHeading: (count) =>
    `Pridali ste ${count} ${count === 1 ? 'dohodu' : count < 5 ? 'dohody' : 'dohôd'}`,
  atLeastOneError: 'Pridajte aspoň jednu dohodu',
  testId: 'dohoda',
  addAnotherId: 'addAnotherDohoda',
})

export { validate, validateItem }
export default PotvrdeniaPage
