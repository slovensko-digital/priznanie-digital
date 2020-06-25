import { validate } from '../src/pages/kupele'
import { testValidation } from './utils/testValidation'

describe('kupele', () => {
  describe('#validate', () => {
    testValidation(validate, [
      {
        input: { kupele: undefined },
        expected: ['kupele'],
      },
      {
        input: {
          kupele: true,
          danovnikInSpa: true,
          r076a_kupele_danovnik: '30',
        },
        expected: [],
      },
      {
        input: {
          kupele: true,
          danovnikInSpa: true,
          r076a_kupele_danovnik: '60',
        },
        expected: ['r076a_kupele_danovnik'],
      },
      {
        input: {
          kupele: true,
          danovnikInSpa: true,
          r076a_kupele_danovnik: '60,2',
        },
        expected: ['r076a_kupele_danovnik'],
      },
      {
        input: {
          kupele: true,
          danovnikInSpa: true,
          r076a_kupele_danovnik: '-10',
        },
        expected: ['r076a_kupele_danovnik'],
      },
      {
        input: {
          kupele: true,
          r033_partner_kupele: true,
          r031_priezvisko_a_meno: 'Fake Name',
          r031_rodne_cislo: '020314 / 8286',
          r033_partner_kupele_uhrady: '30',
        },
        expected: [],
      },
      {
        input: {
          kupele: true,
          r033_partner_kupele: true,
          r033_partner_kupele_uhrady: '60',
        },
        expected: [
          'r031_priezvisko_a_meno',
          'r031_rodne_cislo',
          'r033_partner_kupele_uhrady',
        ],
      },
      {
        input: {
          kupele: true,
          r033_partner_kupele: true,
          r031_priezvisko_a_meno: 'Fake Name',
          r031_rodne_cislo: '020314 / 8286',
          r033_partner_kupele_uhrady: '-10',
        },
        expected: ['r033_partner_kupele_uhrady'],
      },
      {
        input: {
          kupele: true,
          childrenInSpa: true,
          r036_deti_kupele: '30',
          children: [
            {
              kupelnaStarostlivost: true,
              priezviskoMeno: 'Fake Name',
              rodneCislo: '020314 / 8286',
            },
          ],
        },
        expected: [],
      },
      {
        input: {
          kupele: true,
          childrenInSpa: true,
          r036_deti_kupele: '60',
          children: [
            {
              kupelnaStarostlivost: true,
              priezviskoMeno: 'Fake Name',
              rodneCislo: '020314 / 8286',
            },
          ],
        },
        expected: ['r036_deti_kupele'],
      },
      {
        input: {
          kupele: true,
          childrenInSpa: true,
          r036_deti_kupele: '60',
          children: [
            {
              kupelnaStarostlivost: true,
              priezviskoMeno: 'Fake Name',
              rodneCislo: '020314 / 8286',
            },
            {
              kupelnaStarostlivost: true,
              priezviskoMeno: 'Fake Name',
              rodneCislo: '985820 / 1903',
            },
          ],
        },
        expected: [],
      },
      {
        input: {
          kupele: true,
          childrenInSpa: true,
          r036_deti_kupele: '-10',
          children: [
            {
              kupelnaStarostlivost: true,
              priezviskoMeno: 'Fake Name',
              rodneCislo: '985820 / 1903',
            },
          ],
        },
        expected: ['r036_deti_kupele'],
      },
      {
        input: {
          kupele: true,
          childrenInSpa: true,
          r036_deti_kupele: '10',
          children: [
            {
              kupelnaStarostlivost: true,
              priezviskoMeno: '',
              rodneCislo: '',
            },
          ],
        },
        expected: ['children'],
      },
    ])
  })
})
