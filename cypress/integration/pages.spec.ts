/* eslint-disable func-names */
/* eslint-disable promise/no-nesting */
/* eslint-disable promise/always-return */
/* eslint-disable promise/catch-or-return */
/// <reference types="cypress" />

import { withEmploymentInput } from '../../__tests__/testCases/withEmploymentInput';
import { withChildrenInput } from '../../__tests__/testCases/withChildrenInput';
import { baseInput } from '../../__tests__/testCases/baseInput';
import { foreignIncomeInput } from '../../__tests__/testCases/postpone/foreignIncomeInput';
import { TaxFormUserInput } from '../../src/types/TaxFormUserInput';
import { Route, PostponeRoute } from '../../src/lib/routes';
import { PostponeUserInput } from '../../src/types/PostponeUserInput';

function getInput<K extends keyof TaxFormUserInput>(key: K, suffix = '') {
  return cy.get(`[data-test="${key}-input${suffix}"]`);
}
function getInputPostpone<K extends keyof PostponeUserInput>(
  key: K,
  suffix = '',
) {
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
  throw new Error(`Incorrect type of input: ${value}`);
}

function typeToInputPostpone<K extends keyof PostponeUserInput>(
  key: K,
  userInput: PostponeUserInput,
) {
  const value = userInput[key];
  if (typeof value === 'string') {
    return getInputPostpone(key).type(value);
  }
  throw new Error(`Incorrect type of input: ${value}`);
}

function next() {
  return cy.contains('Pokračovať').click();
}

const getError = () => cy.get('[data-test=error]');
function assertUrl(url: Route | PostponeRoute) {
  cy.url().should('include', url);
}

describe('Employment page', function() {
  it('has working ui', function() {
    cy.visit('/zamestnanie');

    // Back button should work and be the correct page
    cy.get('[data-test=back]').click();
    assertUrl('/prijmy-a-vydavky');

    //  Go back to our page
    cy.visit('/zamestnanie');

    // Shows error, when presses next withou interaction
    next();
    getError();

    // When presses yes, additional fields appears
    cy.get('[data-test=employed-input-yes]').click();

    // FIXME When try to submit, error should appear
    // next();
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

    getInput('r038').should(
      'have.value',
      withEmploymentInput?.r038?.toString(),
    );
    getInput('r039').should(
      'have.value',
      withEmploymentInput?.r039?.toString(),
    );

    // Should submit and next page should be parter
    next();
    cy.url().should('include', '/partner');
  });
});

describe('osobne-udaje page', function() {
  it('Back and next', function() {
    cy.visit('/osobne-udaje');

    // Back button should work and be the correct page
    cy.get('[data-test=back]').click();
    assertUrl('/hypoteka');

    //  Go back to our page
    cy.visit('/osobne-udaje');

    // Shows error, when presses next without interaction
    next();
    getError();
  });
  it('with autoform', function() {
    cy.visit('/osobne-udaje');

    /** With autoform */
    typeToInput('r001_dic', baseInput);
    typeToInput('r003_nace', baseInput);
    getInput('meno_priezvisko').type('Július Ret');

    cy.contains('Július Retzer').click();

    getInput('meno_priezvisko').should('contain.value', 'Július Retzer');
    getInput('r007_ulica').should('contain.value', 'Mierová');
    getInput('r008_cislo').should('contain.value', '4');
    getInput('r009_psc').should('contain.value', '82105');
    getInput('r010_obec').should('contain.value', 'Bratislava');
    getInput('r011_stat').should('contain.value', 'Slovenská republika');

    next();
  });
  it('with posta api', function() {
    cy.visit('/osobne-udaje');

    typeToInput('r009_psc', baseInput);
    getInput('r010_obec').should('have.value', baseInput.r010_obec);
  });
  it('Manual entry', function() {
    cy.visit('/osobne-udaje');

    /** With autoform */
    typeToInput('r001_dic', baseInput);
    typeToInput('r003_nace', baseInput);
    typeToInput('meno_priezvisko', baseInput);
    typeToInput('r007_ulica', baseInput);
    typeToInput('r008_cislo', baseInput);
    typeToInput('r009_psc', baseInput);
    typeToInput('r010_obec', baseInput);
    typeToInput('r011_stat', baseInput);

    next();
  });
});

describe('Children page', function() {
  it('has working navigation', function() {
    cy.visit('/deti');

    // Back button should work and be the correct page
    cy.get('[data-test=back]').click();
    assertUrl('/partner');

    //  Go back to our page
    cy.visit('/deti');
  });
  // TODO
  it.skip('has working validation', function() {
    cy.visit('/deti');

    // Shows error, when presses next withou interaction
    next();
    getError();
  });
  it('has working ui', function() {
    cy.visit('/deti');

    // When presses yes, additional fields appears
    getInput('children', '-yes').click();

    // Type to input
    cy.get('[data-test="r034[0].priezviskoMeno-input"]').type(
      withChildrenInput?.r034?.[0]?.priezviskoMeno ?? '',
    );
    cy.get('[data-test="r034[0].rodneCislo-input"]').type(
      withChildrenInput?.r034?.[0]?.rodneCislo ?? '',
    );

    cy.get('[data-test="add-child"]').click();

    // Should submit and next page should be parter
    // next();
  });
});

describe('Feedback', function() {
  it('has working ui', function() {
    cy.visit('/');
    cy.get('[data-test=feedback]').click();

    cy.get('[data-test=whatWereYouDoing]').type('Cypress tests');
    cy.get('[data-test=whatWentWrong]').type('Testing the spam');
    cy.get('[data-test=agree]').click();
    /** Don't spam the mail */
    // cy.get('[data-test=submit]').click();
  });
});

describe('Results page', function() {
  it('has working navigation', function() {
    cy.visit('/vysledky');

    // Back button should work and be the correct page
    cy.get('[data-test=back]').click();
    assertUrl('/osobne-udaje');

    //  Go back to our page
    cy.visit('/vysledky');
  });
  it('has working ui', function() {
    cy.visit('/vysledky');

    cy.get('h1').contains('Výpočet dane za rok');
    cy.get('h2').contains('Stručný prehľad');
  });
});

describe('/odklad/osobne-udaje page', function() {
  it('Back and next', function() {
    cy.visit('/odklad/osobne-udaje');

    // Back button should work and be the correct page
    cy.get('[data-test=back]').click();
    assertUrl('/odklad/prijmy-zo-zahranicia');

    //  Go back to our page
    cy.visit('/odklad/osobne-udaje');

    // Shows error, when presses next without interaction
    next();
    getError();
  });
  it('with autoform', function() {
    cy.visit('/odklad/osobne-udaje');

    /** With autoform */
    typeToInputPostpone('dic', foreignIncomeInput);
    getInputPostpone('meno_priezvisko').type('Július Ret');

    cy.contains('Július Retzer').click();

    getInputPostpone('meno_priezvisko').should(
      'contain.value',
      'Július Retzer',
    );
    getInputPostpone('ulica').should('contain.value', 'Mierová');
    getInputPostpone('cislo').should('contain.value', '4');
    getInputPostpone('psc').should('contain.value', '82105');
    getInputPostpone('obec').should('contain.value', 'Bratislava');
    getInputPostpone('stat').should('contain.value', 'Slovenská republika');
  });
  it('with posta api', function() {
    cy.visit('/odklad/osobne-udaje');

    typeToInputPostpone('psc', foreignIncomeInput);
    getInputPostpone('obec').should('have.value', foreignIncomeInput.obec);
  });
  it('Manual entry', function() {
    cy.visit('/odklad/osobne-udaje');

    /** With autoform */
    typeToInputPostpone('dic', foreignIncomeInput);
    typeToInputPostpone('meno_priezvisko', foreignIncomeInput);
    typeToInputPostpone('ulica', foreignIncomeInput);
    typeToInputPostpone('cislo', foreignIncomeInput);
    typeToInputPostpone('obec', foreignIncomeInput);
    typeToInputPostpone('psc', foreignIncomeInput);
    typeToInputPostpone('stat', foreignIncomeInput);
  });
  it('Errors', function() {
    cy.visit('/odklad/osobne-udaje');

    getInputPostpone('dic').type('invalid');

    next();
    cy.get('.govuk-error-summary');
  });
});

describe('/odklad/suhrn page', function() {
  it('Back', function() {
    cy.visit('/odklad/suhrn');

    // Back button should work and be the correct page
    cy.get('[data-test=back]').click();
    assertUrl('/odklad/osobne-udaje');
  });
  it('Back', function() {
    cy.visit('/odklad/suhrn');
  });
});
