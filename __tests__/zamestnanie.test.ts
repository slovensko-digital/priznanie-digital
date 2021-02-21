import { validate } from '../src/pages/zamestnanie'
import { testValidation } from './utils/testValidation'

describe('zamestnanie', () => {
  describe('#validate', () => {
    testValidation(validate, [
      {
        input: { employed: undefined },
        expected: ['employed'],
      },
      { input: { employed: false }, expected: [] },
      {
        input: { employed: true },
        expected: ['r038', 'r039_socialne', 'r039_zdravotne', 'r120', 'r108'],
      },
      {
        input: {
          employed: true,
          r029_poberal_dochodok: true,
          r038: 'a',
          r039_socialne: '-1',
          r039_zdravotne: '-1',
          r108: 'a',
          r120: '-1',
        },
        expected: ['r038', 'r039_socialne', 'r039_zdravotne', 'r120', 'r108'],
      },
      {
        input: {
          employed: true,
          r029_poberal_dochodok: true,
          r038: '10',
          r039_socialne: '20',
          r039_zdravotne: '20',
          r108: '30',
          r120: '40',
        },
        expected: [],
      },
    ])
  })
})
