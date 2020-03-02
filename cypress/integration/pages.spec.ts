/* eslint-disable func-names */
/* eslint-disable promise/no-nesting */
/* eslint-disable promise/always-return */
/* eslint-disable promise/catch-or-return */
/// <reference types="cypress" />

// import { withPartnerInput } from '../../__tests__/testCases/withPartnerInput';
import { withPartnerInput } from '../../__tests__/testCases/withPartnerInput';
import { getInput, typeToInput } from './cases.spec';

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

    // FIXME When try to submit, error appear
    // getNextButton().click();
    // getError();

    // Type to input
    typeToInput('r038', withPartnerInput);
    typeToInput('r039', withPartnerInput);

    // Error disappears
    getError().should('not.exist');

    // When presses no, the fields disappear
    cy.get('[data-test=employed-input-no]').click();

    getInput('r038').should('not.exist');
    getInput('r039').should('not.exist');

    // When presses yes, additional fields appears
    cy.get('[data-test=employed-input-yes]').click();

    getInput('r038').should('have.value', withPartnerInput.r038.toString());
    getInput('r039').should('have.value', withPartnerInput.r039.toString());

    // Should submit and next page should be parter
    getNextButton().click();
    cy.url().should('include', '/partner');
  });
});
