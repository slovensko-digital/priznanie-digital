import { validate } from '../src/plugins/odklad/1-prijmy/prijmy-zo-zahranicia'
import { testValidation } from './utils/testValidation'

describe('odklad/prijmy-zo-zahranicia', () => {
  describe('#validate', () => {
    testValidation(validate, [
      {
        input: { prijmy_zo_zahranicia: undefined },
        expected: ['prijmy_zo_zahranicia'],
      },
      { input: { prijmy_zo_zahranicia: true }, expected: [] },
      { input: { prijmy_zo_zahranicia: false }, expected: [] },
    ])
  })
})
