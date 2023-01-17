import { postponeHomeRoute, PostponeRoute, Route } from '../../src/lib/routes'
import { foreignIncomeInput } from '../../__tests__/testCases/postpone/foreignIncomeInput'
import { PostponeUserInput } from '../../src/types/PostponeUserInput'

function getInputPostpone<K extends keyof PostponeUserInput>(
  key: K,
  suffix = '',
) {
  return cy.get(`[data-test="${key}-input${suffix}"]`)
}

function typeToInputPostpone<K extends keyof PostponeUserInput>(
  key: K,
  userInput: PostponeUserInput,
) {
  const value = userInput[key]
  if (typeof value === 'string') {
    return getInputPostpone(key).type(value)
  }
  throw new Error(`Incorrect type of input: ${value}`)
}

const assertUrl = (url: Route | PostponeRoute) => {
  cy.url().should('include', url)
}

const next = () => {
  return cy.contains('Pokračovať').click()
}

describe('/odklad/osobne-udaje page', () => {
  beforeEach('Navigate to test page', () => {
    cy.visit(postponeHomeRoute)

    cy.contains('Súhlasím a chcem odložiť daňové priznanie').click()
    assertUrl('/odklad/prijmy-zo-zahranicia')
    getInputPostpone('prijmy_zo_zahranicia', '-yes').click()

    next()
  })
  it('Back and validation', () => {
    assertUrl('/odklad/osobne-udaje')

    // Back button should work and be the correct page
    cy.get('[data-test=back]').click()
    assertUrl('/odklad/prijmy-zo-zahranicia')

    //  Go back to our page
    next()

    // Shows error, when presses next without interaction
    next()
    cy.get('[data-test=error]')
  })
  it('with autoform', () => {
    assertUrl('/odklad/osobne-udaje')

    /** With autoform */
    typeToInputPostpone('dic', foreignIncomeInput)
    getInputPostpone('meno_priezvisko').type('Julius Renc')

    cy.contains('Július Renceš').click()

    getInputPostpone('meno_priezvisko').should('contain.value', 'Július Renceš')
    getInputPostpone('ulica').should('contain.value', 'Benková Potôň')
    getInputPostpone('cislo').should('contain.value', '343')
    getInputPostpone('psc').should('contain.value', '930 36')
    getInputPostpone('obec').should('contain.value', 'Horná Potôň')
    cy.get(`[data-test="stat-select"]`).should('contain.value', 'Slovensko')
  })

  it('Manual entry', () => {
    assertUrl('/odklad/osobne-udaje')

    typeToInputPostpone('dic', foreignIncomeInput)
    typeToInputPostpone('meno', foreignIncomeInput)
    typeToInputPostpone('priezvisko', foreignIncomeInput)
    typeToInputPostpone('ulica', foreignIncomeInput)
    typeToInputPostpone('cislo', foreignIncomeInput)
    typeToInputPostpone('obec', foreignIncomeInput)
    typeToInputPostpone('psc', foreignIncomeInput)
    cy.get('[data-test="stat-select"]').select(foreignIncomeInput.stat)
  })
  it('Errors', () => {
    assertUrl('/odklad/osobne-udaje')

    getInputPostpone('dic').type('invalid')

    next()
    cy.get('.govuk-error-summary')
  })
})

describe('/odklad/suhrn page', () => {
  beforeEach('Navigate to test page', () => {
    cy.visit(postponeHomeRoute)

    cy.contains('Súhlasím a chcem odložiť daňové priznanie').click()
    assertUrl('/odklad/prijmy-zo-zahranicia')
    getInputPostpone('prijmy_zo_zahranicia', '-yes').click()

    next()

    getInputPostpone('meno_priezvisko').type('Julius Renc')
    cy.contains('Július Renceš').click()

    next()
  })
  it('Back', () => {
    assertUrl('/odklad/suhrn')

    // Back button should work and be the correct page
    cy.get('[data-test=back]').click()
    assertUrl('/odklad/osobne-udaje')
  })
})
