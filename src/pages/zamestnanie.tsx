import { makePotvrdeniaPage } from '../components/PotvrdeniaPage'
import { employmentUserInputInitialValues } from '../lib/initialValues'
import { TAX_YEAR } from '../lib/calculation'
import { ZAMESTNANIE_TOTALS } from '../lib/potvrdenia'

const { PotvrdeniaPage, validate, validateItem } = makePotvrdeniaPage({
  flag: 'employed',
  list: 'zamestnavatelia',
  totals: ZAMESTNANIE_TOTALS,
  emptyValues: employmentUserInputInitialValues,
  question: `Mali ste v roku ${TAX_YEAR} príjmy zo zamestnania v SR?`,
  prijmy: {
    label: 'Úhrn vyplatených zdaniteľných príjmov',
    hint: 'Tento údaj nájdete v riadku 01.',
    required: 'Zadajte úhrn vyplatených zdaniteľných príjmov',
  },
  itemName: 'Zamestnávateľ',
  nameLabel: 'Názov zamestnávateľa (nepovinné)',
  addButton: 'Pridať zamestnávateľa',
  saveButton: 'Uložiť zamestnávateľa',
  addAnotherQuestion: 'Potrebujete pridať ďalšieho zamestnávateľa?',
  addedHeading: (count) =>
    `Pridali ste ${count} ${count === 1 ? 'zamestnávateľa' : 'zamestnávateľov'}`,
  atLeastOneError: 'Pridajte aspoň jedného zamestnávateľa',
  testId: 'zamestnavatel',
  addAnotherId: 'addAnother',
})

export { validate, validateItem }
export default PotvrdeniaPage
