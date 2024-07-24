import { executeAllPostponeCases } from './executeCase'

// formular na odklad funguje len v ramci obdobia ked sa da podat riadne danove priznanie
// inak formular hadze chyby
// v podstate nas zaujima len mesiac, nie rok ani den
const date = new Date()
const month = date.getMonth() + 1

// testy na podavanie odkladu padaju ked sa pustia po lehote na podanie odkladu kvoli datumu
// datum sa da namockovat v setDate() (src/lib/utils.js)
// test bezi len ak je formular o odklad aktualny od Januara do konca Marca
if (month >= 1 && month < 4) {
  describe('Postpone cases', () => {
    executeAllPostponeCases(['basic', 'foreignIncome'])
  })
}
