import { executeAllPostponeCases } from './executeCase'

// testy na podavanie odkladu padaju ked sa pustia po lehote na podanie odkladu kvoli datumu
// datum sa da namockovat v setDate() (src/lib/utils.js)
describe('Postpone cases', () => {
  executeAllPostponeCases(['basic', 'foreignIncome'])
})
