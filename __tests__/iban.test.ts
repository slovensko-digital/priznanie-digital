import { makeValidate } from '../src/pages/iban'
import { testValidation } from './utils/testValidation'
import { TaxForm } from '../src/types/TaxForm'

describe('iban', () => {
  describe('#validate', () => {
    describe('mozeZiadatVyplatitDanovyBonus', () => {
      const taxFormMock = {
        mozeZiadatVyplatitDanovyBonus: true,
        mozeZiadatVratitDanovyPreplatok: false,
      } as TaxForm

      testValidation(makeValidate(taxFormMock), [
        {
          input: { ziadamVyplatitDanovyBonus: undefined },
          expected: ['ziadamVyplatitDanovyBonus'],
        },
        { input: { ziadamVyplatitDanovyBonus: false }, expected: [] },
        {
          input: { ziadamVyplatitDanovyBonus: true },
          expected: ['iban'],
        },
        {
          input: {
            ziadamVyplatitDanovyBonus: true,
            iban: 'a',
          },
          expected: ['iban'],
        },
        {
          input: {
            ziadamVyplatitDanovyBonus: true,
            iban: 'SK6807200002891987426353',
          },
          expected: [],
        },
      ])
    })

    describe('mozeZiadatVratitDanovyPreplatok', () => {
      const taxFormMock = {
        mozeZiadatVyplatitDanovyBonus: false,
        mozeZiadatVratitDanovyPreplatok: true,
      } as TaxForm

      testValidation(makeValidate(taxFormMock), [
        {
          input: { ziadamVratitDanovyPreplatok: undefined },
          expected: ['ziadamVratitDanovyPreplatok'],
        },
        { input: { ziadamVratitDanovyPreplatok: false }, expected: [] },
        {
          input: { ziadamVratitDanovyPreplatok: true },
          expected: ['iban'],
        },
        {
          input: {
            ziadamVratitDanovyPreplatok: true,
            iban: 'a',
          },
          expected: ['iban'],
        },
        {
          input: {
            ziadamVratitDanovyPreplatok: true,
            iban: 'SK6807200002891987426353',
          },
          expected: [],
        },
      ])
    })

    describe('mozeZiadatVyplatitDanovyBonus && mozeZiadatVratitDanovyPreplatok', () => {
      const taxFormMock = {
        mozeZiadatVyplatitDanovyBonus: true,
        mozeZiadatVratitDanovyPreplatok: true,
      } as TaxForm

      testValidation(makeValidate(taxFormMock), [
        {
          input: {
            ziadamVyplatitDanovyBonus: undefined,
            ziadamVratitDanovyPreplatok: undefined,
          },
          expected: [
            'ziadamVyplatitDanovyBonus',
            'ziadamVratitDanovyPreplatok',
          ],
        },
        {
          input: {
            ziadamVyplatitDanovyBonus: undefined,
            ziadamVratitDanovyPreplatok: false,
          },
          expected: ['ziadamVyplatitDanovyBonus'],
        },
        {
          input: {
            ziadamVyplatitDanovyBonus: false,
            ziadamVratitDanovyPreplatok: undefined,
          },
          expected: ['ziadamVratitDanovyPreplatok'],
        },
        {
          input: {
            ziadamVyplatitDanovyBonus: false,
            ziadamVratitDanovyPreplatok: false,
          },
          expected: [],
        },
        {
          input: {
            ziadamVyplatitDanovyBonus: undefined,
            ziadamVratitDanovyPreplatok: true,
          },
          expected: ['ziadamVyplatitDanovyBonus', 'iban'],
        },
        {
          input: {
            ziadamVyplatitDanovyBonus: true,
            ziadamVratitDanovyPreplatok: undefined,
          },
          expected: ['ziadamVratitDanovyPreplatok', 'iban'],
        },
        {
          input: {
            ziadamVyplatitDanovyBonus: true,
            ziadamVratitDanovyPreplatok: false,
          },
          expected: ['iban'],
        },
        {
          input: {
            ziadamVyplatitDanovyBonus: false,
            ziadamVratitDanovyPreplatok: true,
          },
          expected: ['iban'],
        },
        {
          input: {
            ziadamVyplatitDanovyBonus: true,
            ziadamVratitDanovyPreplatok: true,
          },
          expected: ['iban'],
        },
        {
          input: {
            ziadamVyplatitDanovyBonus: true,
            ziadamVratitDanovyPreplatok: true,
            iban: 'a',
          },
          expected: ['iban'],
        },
        {
          input: {
            ziadamVyplatitDanovyBonus: true,
            ziadamVratitDanovyPreplatok: true,
            iban: 'SK6807200002891987426353',
          },
          expected: [],
        },
      ])
    })
  })
})
