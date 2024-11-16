import { makeValidate } from '../src/pages/iban'
import { testValidation } from './utils/testValidation'
import { TaxForm } from '../src/types/TaxForm'

describe('iban', () => {
  describe('#validate', () => {
    describe('mozeZiadatVratitPreplatkyBonusyUroky', () => {
      const taxFormMock = {
        mozeZiadatVratitPreplatkyBonusyUroky: true
      } as TaxForm

      testValidation(makeValidate(taxFormMock), [
        {
          input: { ziadamVyplatitDanovyBonusUrokPreplatok: undefined },
          expected: ['ziadamVyplatitDanovyBonusUrokPreplatok'],
        },
        { input: { ziadamVyplatitDanovyBonusUrokPreplatok: false }, expected: [] },
        {
          input: { ziadamVyplatitDanovyBonusUrokPreplatok: true },
          expected: ['iban'],
        },
        {
          input: {
            ziadamVyplatitDanovyBonusUrokPreplatok: true,
            iban: 'a',
          },
          expected: ['iban'],
        },
        {
          input: {
            ziadamVyplatitDanovyBonusUrokPreplatok: true,
            iban: 'SK6807200002891987426353',
          },
          expected: [],
        },
      ])
    })
  })
})
