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
        expected: ['r038', 'r039'],
      },
      {
        input: {
          employed: true,
          r029_poberal_dochodok: true,
          r038: 'a',
          r039: '-1',
        },
        expected: ['r038', 'r039'],
      },
      {
        input: {
          employed: true,
          r029_poberal_dochodok: true,
          r038: '10',
          r039: '20',
        },
        expected: [],
      },
    ])
  })
})
