import { validate } from '../src/pages/partner'
import { testValidation } from './utils/testValidation'
import { PARTNER_MAX_ODPOCET } from '../src/lib/calculation'

describe('partner', () => {
  describe('#validate', () => {
    testValidation(validate, [
      {
        input: { r032_uplatnujem_na_partnera: undefined },
        expected: ['r032_uplatnujem_na_partnera'],
      },
      { input: { r032_uplatnujem_na_partnera: false }, expected: [] },
      {
        input: {
          r032_uplatnujem_na_partnera: true,
          partner_podmienky: {},
          partner_step: 1,
        },
        expected: ['partner_spolocna_domacnost'],
      },
      {
        input: {
          r032_uplatnujem_na_partnera: true,
          partner_spolocna_domacnost: true,
          partner_podmienky: {},
          partner_step: 1,
        },
        expected: [],
      },
      {
        input: {
          r032_uplatnujem_na_partnera: true,
          partner_spolocna_domacnost: true,
          partner_podmienky: {},
          partner_step: 1,
        },
        expected: [],
      },
      {
        input: {
          r032_uplatnujem_na_partnera: true,
          partner_spolocna_domacnost: true,
          partner_podmienky: { 1: ['on'] },
          partner_step: 3,
        },
        expected: ['r032_partner_vlastne_prijmy'],
      },
      {
        input: {
          r032_uplatnujem_na_partnera: true,
          r032_partner_vlastne_prijmy: 'a',
          partner_spolocna_domacnost: true,
          partner_podmienky: { 1: ['on'] },
          partner_step: 3,
        },
        expected: ['r032_partner_vlastne_prijmy'],
      },
      {
        input: {
          r032_uplatnujem_na_partnera: true,
          r032_partner_vlastne_prijmy: '1000',
          partner_spolocna_domacnost: true,
          partner_podmienky: { 1: true },
          partner_step: 3,
        },
        expected: [],
      },
      {
        input: {
          r032_uplatnujem_na_partnera: true,
          r032_partner_vlastne_prijmy: `${PARTNER_MAX_ODPOCET}`,
          partner_spolocna_domacnost: true,
          partner_podmienky: { 1: ['on'] },
          partner_step: 4,
        },
        expected: [],
      },
      {
        input: {
          r032_uplatnujem_na_partnera: true,
          r032_partner_vlastne_prijmy: '1000',
          partner_spolocna_domacnost: true,
          partner_podmienky: { 1: ['on'] },
          partner_step: 4,
        },
        expected: [
          'r031_priezvisko_a_meno',
          'r031_rodne_cislo',
          'r032_partner_pocet_mesiacov',
        ],
      },
      {
        input: {
          r032_uplatnujem_na_partnera: true,
          r031_priezvisko_a_meno: 'Jenny Bravo',
          r031_rodne_cislo: '020314 / 8286',
          r032_partner_vlastne_prijmy: '1000',
          r032_partner_pocet_mesiacov: '1',
          partner_spolocna_domacnost: true,
          partner_podmienky: { 1: ['on'] },
          partner_step: 3,
        },
        expected: [],
      },
    ])
  })
})
