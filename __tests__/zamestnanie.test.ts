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
        expected: ['r038', 'r039', 'r120', 'r108'],
      },
      {
        input: {
          employed: true,
          r029_poberal_dochodok: true,
          r038: 'a',
          r039: '-1',
          r108: 'a',
          r120: '-1',
        },
        expected: ['r038', 'r039', 'r120', 'r108'],
      },
      {
        input: {
          employed: true,
          r029_poberal_dochodok: true,
          r038: '10',
          r039: '20',
          r108: '30',
          r120: '40',
        },
        expected: [],
      },
    ])
  })
})
