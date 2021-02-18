import { postponeHomeRoute } from '../../../../src/lib/routes'
import { foreignIncomeInput } from '../../../../__tests__/testCases/postpone/foreignIncomeInput'
import {
  getInputPostpone,
  typeToInputPostpone,
  assertUrl,
  next,
} from '../../../utils/postponePage'

describe('/odklad/suhrn page', () => {
  beforeEach('Navigate to test page', () => {
    cy.visit(postponeHomeRoute)

    cy.contains('Odložiť daňové priznanie').click()
    assertUrl('/odklad/prijmy-zo-zahranicia')
    getInputPostpone('prijmy_zo_zahranicia', '-yes').click()

    next()

    typeToInputPostpone('dic', foreignIncomeInput)
    getInputPostpone('meno_priezvisko').type('Július Ret')

    cy.contains('Július Retzer').click()

    next()
  })
  it('Back', () => {
    assertUrl('/odklad/suhrn')

    // Back button should work and be the correct page
    cy.get('[data-test=back]').click()
    assertUrl('/odklad/osobne-udaje')
  })
})
