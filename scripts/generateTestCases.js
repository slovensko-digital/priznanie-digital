const {writeFileSync} = require('fs')
const path = require('path')

const testCases = [
  'base',
  'complete',
  'completeDecimal',
  'withPartner',
  'withEmployment',
  'withPension',
  // 'withMortgage',
  'withChildren',
  'with2percent',
  'with3percent',
  'withSpa',
  'withBonus',
  'withTaxReturn',
  'withEmploymentBonus',
  'withHighIncome',
  'bugReport1',
  'bugReport2',
  'bugReport3',
  'bugReport4',
]

testCases.forEach(testCase => {
  writeFileSync(
    path.join(__dirname, '..', 'cypress', 'integration', 'cases', `${testCase}.spec.ts`),
    `import { executeTestCase } from '../../utils/executeCase'
describe('Test case - ${testCase}', () => {
  executeTestCase('${testCase}')
})`
  )

})
