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
        expected: ['r032_partner_vlastne_prijmy'],
      },
      {
        input: {
          r032_uplatnujem_na_partnera: true,
          r032_partner_vlastne_prijmy: '1000',
          partner_podmienky: {},
          partner_step: 1,
        },
        expected: ['partner_spolocna_domacnost'],
      },
      {
        input: {
          r032_uplatnujem_na_partnera: true,
          r032_partner_vlastne_prijmy: '1000',
          partner_podmienky: {},
          partner_step: 1,
          partner_spolocna_domacnost: true,
        },
        expected: [],
      },
      {
        input: {
          r032_uplatnujem_na_partnera: true,
          r032_partner_vlastne_prijmy: '1000',
          partner_spolocna_domacnost: true,
          partner_podmienky: {},
          partner_step: 2,
        },
        expected: ['partner_bonus_uplatneny'],
      },
      {
        input: {
          r032_uplatnujem_na_partnera: true,
          r032_partner_vlastne_prijmy: '1000',
          partner_podmienky: {},
          partner_step: 2,
          partner_bonus_uplatneny: false,
        },
        expected: [],
      },
      {
        input: {
          r032_uplatnujem_na_partnera: true,
          partner_podmienky: { 1: true },
          partner_step: 4,
        },
        expected: [
          'r032_partner_vlastne_prijmy',
          'r031_priezvisko_a_meno',
          'r031_rodne_cislo',
          'r032_partner_pocet_mesiacov',
        ],
      },
      {
        input: {
          r032_uplatnujem_na_partnera: true,
          partner_podmienky: {},
          partner_step: 4,
          r031_priezvisko_a_meno: 'Jenny Bravo',
          r031_rodne_cislo: '020314 / 8286',
          r032_partner_vlastne_prijmy: '1000',
          r032_partner_pocet_mesiacov: '1',
        },
        expected: [],
      },
    ])
  })
})
