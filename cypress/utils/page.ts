import { TaxFormUserInput } from '../../src/types/TaxFormUserInput'
import { PostponeRoute, Route } from '../../src/lib/routes'
import { withChildrenInput } from '../../__tests__/testCases/withChildrenInput'

export function getInput<K extends keyof TaxFormUserInput>(
  key: K,
  suffix = '',
) {
  return cy.get(`[data-test="${key}-input${suffix}"]`)
}

export function typeToInput<K extends keyof TaxFormUserInput>(
  key: K,
  userInput: TaxFormUserInput,
) {
  const value = userInput[key]
  if (typeof value === 'string') {
    return getInput(key).type(value)
  }
  throw new Error(`Incorrect type of input: ${value}`)
}

export const next = () => {
  return cy.contains('Pokračovať').click()
}

export const getError = () => cy.get('[data-test=error]')

export const assertUrl = (url: Route | PostponeRoute) => {
  cy.url().should('include', url)
}

export const skipPage = () => {
  cy.get('.govuk-label').contains('Nie').click()
  next()
}

export const navigateEligibleToChildrenPage = () => {
  cy.visit('/prijmy-a-vydavky')
  typeToInput('t1r10_prijmy', {
    ...withChildrenInput,
    t1r10_prijmy: '3480',
  })
  typeToInput('priloha3_r11_socialne', withChildrenInput)
  typeToInput('priloha3_r13_zdravotne', withChildrenInput)
  getInput('r122').type('0')

  next()

  assertUrl('/zamestnanie')
  skipPage()

  assertUrl('/partner')
  skipPage()
}
