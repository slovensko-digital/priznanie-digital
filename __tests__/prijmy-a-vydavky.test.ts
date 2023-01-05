import { validate } from '../src/features/steps/1-prijmy/prijmy-a-vydavky'
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
          'zaplatenePreddavky',
        ],
      },
      {
        input: {
          t1r10_prijmy: '-1',
          priloha3_r11_socialne: 'a',
          priloha3_r13_zdravotne: '10',
          zaplatenePreddavky: '10',
        },
        expected: ['t1r10_prijmy', 'priloha3_r11_socialne'],
      },
      {
        input: {
          t1r10_prijmy: '10',
          priloha3_r11_socialne: '12.3',
          priloha3_r13_zdravotne: '45,6',
          zaplatenePreddavky: '0',
        },
        expected: [],
      },
    ])
  })
})
