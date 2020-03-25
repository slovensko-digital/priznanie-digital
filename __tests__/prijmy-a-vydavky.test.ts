import { validate } from '../src/pages/prijmy-a-vydavky'
import { testValidation } from './utils/testValidation'

describe('prijmy-a-vydavky', () => {
  describe('#validate', () => {
    testValidation(validate, [
      {
        input: {},
        expected: [
          't1r10_prijmy',
          'priloha3_r11_socialne',
          'priloha3_r13_zdravotne',
        ],
      },
      {
        input: {
          t1r10_prijmy: '-1',
          priloha3_r11_socialne: 'a',
          priloha3_r13_zdravotne: '10',
        },
        expected: ['t1r10_prijmy', 'priloha3_r11_socialne'],
      },
      {
        input: {
          t1r10_prijmy: '10',
          priloha3_r11_socialne: '12.3',
          priloha3_r13_zdravotne: '45,6',
        },
        expected: [],
      },
    ])
  })
})
