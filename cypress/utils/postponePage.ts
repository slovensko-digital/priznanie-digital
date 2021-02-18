import { PostponeUserInput } from '../../src/types/PostponeUserInput'
import { PostponeRoute, Route } from '../../src/lib/routes'

export function getInputPostpone<K extends keyof PostponeUserInput>(
  key: K,
  suffix = '',
) {
  return cy.get(`[data-test="${key}-input${suffix}"]`)
}

export function typeToInputPostpone<K extends keyof PostponeUserInput>(
  key: K,
  userInput: PostponeUserInput,
) {
  const value = userInput[key]
  if (typeof value === 'string') {
    return getInputPostpone(key).type(value)
  }
  throw new Error(`Incorrect type of input: ${value}`)
}

export const assertUrl = (url: Route | PostponeRoute) => {
  cy.url().should('include', url)
}

export const next = () => {
  return cy.contains('Pokračovať').click()
}
