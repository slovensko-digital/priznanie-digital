import { validate } from '../src/pages/kupele'
import { testValidation } from './utils/testValidation'

describe('hypoteka', () => {
  describe('#validate', () => {
    testValidation(validate, [
      {
        input: { kupele: undefined },
        expected: ['kupele'],
      },
      {
        input: { kupele: true, danovnikInSpa: true, r076a_kupele_danovnik: '30' },
        expected: [],
      },
      {
        input: { kupele: true, danovnikInSpa: true, r076a_kupele_danovnik: '60' },
        expected: ['r076a_kupele_danovnik'],
      },
      {
        input: { kupele: true, danovnikInSpa: true, r076a_kupele_danovnik: '60,2' },
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
        expected: ['r033_partner_kupele_uhrady'],
      },
      {
        input: {
          kupele: true,
          r033_partner_kupele: true,
          r033_partner_kupele_uhrady: '-10',
        },
        expected: ['r033_partner_kupele_uhrady'],
      },
      {
        input: {
          kupele: true,
          childrenInSpa: true,
          r036_deti_kupele: '30',
          children: [{}],
        },
        expected: [],
      },
      {
        input: {
          kupele: true,
          childrenInSpa: true,
          r036_deti_kupele: '60',
          children: [{}],
        },
        expected: ['r036_deti_kupele'],
      },
      {
        input: {
          kupele: true,
          childrenInSpa: true,
          r036_deti_kupele: '60',
          children: [{}, {}],
        },
        expected: [],
      },
      {
        input: {
          kupele: true,
          childrenInSpa: true,
          r036_deti_kupele: '-10',
        },
        expected: ['r036_deti_kupele'],
      },
    ])
  })
})
