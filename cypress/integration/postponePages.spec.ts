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
  it.skip('with autoform', () => {
    assertUrl('/odklad/osobne-udaje')

    /** With autoform */
    typeToInputPostpone('dic', foreignIncomeInput)
    getInputPostpone('meno_priezvisko').type('Július Ret')

    cy.contains('Július Retzer').click()

    getInputPostpone('meno_priezvisko').should('contain.value', 'Július Retzer')
    getInputPostpone('ulica').should('contain.value', 'Mierová')
    getInputPostpone('cislo').should('contain.value', '4')
    getInputPostpone('psc').should('contain.value', '821 05')
    getInputPostpone('obec').should('contain.value', 'Bratislava')
    getInputPostpone('stat').should('contain.value', 'Slovenská republika')
  })
  it('with posta api', () => {
    assertUrl('/odklad/osobne-udaje')

    typeToInputPostpone('psc', foreignIncomeInput)
    getInputPostpone('obec').should('have.value', foreignIncomeInput.obec)
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
    typeToInputPostpone('stat', foreignIncomeInput)
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

    getInputPostpone('meno_priezvisko').type('Július Ret')
    cy.contains('Július Retzer').click()

    typeToInputPostpone('dic', foreignIncomeInput)

    next()
  })
  it('Back', () => {
    assertUrl('/odklad/suhrn')

    // Back button should work and be the correct page
    cy.get('[data-test=back]').click()
    assertUrl('/odklad/osobne-udaje')
  })
})
