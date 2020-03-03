/* eslint-disable func-names */
/* eslint-disable promise/no-nesting */
/* eslint-disable promise/always-return */
/* eslint-disable promise/catch-or-return */
/// <reference types="cypress" />

import { withEmploymentInput } from '../../__tests__/testCases/withEmploymentInput';
import { TaxFormUserInput } from '../../src/types/TaxFormUserInput';

function getInput<K extends keyof TaxFormUserInput>(key: K, suffix = '') {
  return cy.get(`[data-test="${key}-input${suffix}"]`);
}

function typeToInput<K extends keyof TaxFormUserInput>(
  key: K,
  userInput: TaxFormUserInput,
) {
  const value = userInput[key];
  if (typeof value === 'string') {
    return getInput(key).type(value);
  }
  if (typeof value === 'number') {
    return getInput(key).type(value.toString());
  }

  throw new Error(`Incorrect type of input: ${value}`);
}

const getNextButton = () => cy.get('[data-test=next]');
const getError = () => cy.get('[data-test=error]');

describe('Employment page', function() {
  it('has working ui', function() {
    cy.visit('/zamestnanie');

    // Back button should work and be the correct page
    cy.get('[data-test=back]').click();
    cy.url().should('include', '/prijmy-a-vydavky');

    //  Go back to our page
    getNextButton().click();

    // Shows error, when presses next withou interaction
    getNextButton().click();
    getError();

    // When presses yes, additional fields appears
    cy.get('[data-test=employed-input-yes]').click();

    // FIXME When try to submit, error should appear
    // getNextButton().click();
    // getError();

    // Type to input
    typeToInput('r038', withEmploymentInput);
    typeToInput('r039', withEmploymentInput);

    // Error disappears
    getError().should('not.exist');

    // When presses no, the fields disappear
    cy.get('[data-test=employed-input-no]').click();

    getInput('r038').should('not.exist');
    getInput('r039').should('not.exist');

    // When presses yes, additional fields appears
    cy.get('[data-test=employed-input-yes]').click();

    getInput('r038').should('have.value', withEmploymentInput.r038.toString());
    getInput('r039').should('have.value', withEmploymentInput.r039.toString());

    // Should submit and next page should be parter
    getNextButton().click();
    cy.url().should('include', '/partner');
  });
});
