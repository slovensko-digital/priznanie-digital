import { validate } from '../src/pages/partner'
import { testValidation } from './utils/testValidation'

describe('partner', () => {
  describe('#validate', () => {
    testValidation(validate, [
      {
        input: { r032_uplatnujem_na_partnera: undefined },
        expected: ['r032_uplatnujem_na_partnera'],
      },
      { input: { r032_uplatnujem_na_partnera: false }, expected: [] },
      {
        input: { r032_uplatnujem_na_partnera: true },
        expected: [
          'r031_priezvisko_a_meno',
          'r031_rodne_cislo',
          'r032_partner_vlastne_prijmy',
          'r032_partner_pocet_mesiacov',
        ],
      },
      {
        input: {
          r032_uplatnujem_na_partnera: true,
          r031_priezvisko_a_meno: 'Jenny Bravo',
          r031_rodne_cislo: '123',
          r032_partner_vlastne_prijmy: 'foo',
          r032_partner_pocet_mesiacov: '20',
        },
        expected: [
          'r031_rodne_cislo',
          'r032_partner_vlastne_prijmy',
          'r032_partner_pocet_mesiacov',
        ],
      },
      {
        input: {
          r032_uplatnujem_na_partnera: true,
          r031_priezvisko_a_meno: 'Jenny Bravo',
          r031_rodne_cislo: '020314/8286',
          r032_partner_vlastne_prijmy: '500',
          r032_partner_pocet_mesiacov: '1',
        },
        expected: [],
      },
      {
        input: {
          r032_uplatnujem_na_partnera: true,
          r031_priezvisko_a_meno: 'Jenny Bravo',
          r031_rodne_cislo: '0203148286',
          r032_partner_vlastne_prijmy: '500',
          r032_partner_pocet_mesiacov: '1',
        },
        expected: [],
      },
    ])
  })
})
