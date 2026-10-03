const GCLID = 'Cj0KCQiA_test-GCLID_1234567890'

const storage = (key: string) =>
  cy.window().its('localStorage').invoke('getItem', key)

const accept = () => cy.get('[data-test="measurement-accept"]')
const decline = () => cy.get('[data-test="measurement-decline"]')

// The consent bar appears from an effect after hydration, so its absence is only
// meaningful once the app reacts to a client-side navigation. The bar lives in
// Layout, which stays mounted across it.
const assertNoBar = () => {
  cy.contains('Súhlasím a chcem pripraviť daňové priznanie').click()
  cy.get('[data-test="prijem_zo_zivnosti-input-yes"]')
  accept().should('not.exist')
}

const grantConsent = () => {
  cy.visit(`/?gclid=${GCLID}`)
  accept().click()
  accept().should('not.exist')
}

// submits the redirect form via the debug button without leaving to Návody.Digital
const submitRedirectForm = () => {
  cy.get('form[action$="/podania/nove"]').invoke(
    'on',
    'submit',
    (event: Event) => event.preventDefault(),
  )
  cy.get('[data-test="debug-continue"]').click()
}

beforeEach(() => {
  cy.intercept('POST', '/api/conversion', { statusCode: 204 }).as('conversion')
})

describe('Google Ads conversion consent', () => {
  it('is not shown without gclid', () => {
    cy.visit('/')
    assertNoBar()
  })

  it('stores nothing until the user decides', () => {
    cy.visit(`/?gclid=${GCLID}`)
    accept().should('be.visible')
    decline().should('be.visible')

    storage('adsClickId').should('equal', null)
    storage('adsConsent').should('equal', null)
  })

  it('remembers the click ID when accepted and does not ask again', () => {
    grantConsent()
    cy.contains('Súhlasili ste s použitím cookies na meranie reklamy.')
    cy.get('[data-test="measurement-hide"]').click()
    cy.get('[data-test="measurement-hide"]').should('not.exist')

    storage('adsConsent').should('equal', 'granted')
    storage('adsClickId').should('contain', `"gclid":"${GCLID}"`)

    cy.visit(`/?gclid=${GCLID}`)
    assertNoBar()
  })

  it('stores no click ID when declined and does not ask again', () => {
    cy.visit(`/?gclid=${GCLID}`)
    decline().click()
    decline().should('not.exist')
    cy.contains('Nesúhlasili ste s použitím cookies na meranie reklamy.')

    storage('adsConsent').should('equal', 'denied')
    storage('adsClickId').should('equal', null)

    cy.visit(`/?gclid=${GCLID}`)
    assertNoBar()
  })
})

describe('Google Ads conversion tracking', () => {
  beforeEach(() => {
    cy.setCookie('you-shall', 'not-pass') // debug mode, redirect form is not auto-submitted
  })

  it('reports tax return conversion on redirect to Návody.Digital', () => {
    grantConsent()

    cy.visit('/pokracovat')
    submitRedirectForm()

    cy.wait('@conversion')
      .its('request.body')
      .should('deep.equal', { gclid: GCLID, type: 'priznanie' })
  })

  it('reports postpone conversion on redirect to Návody.Digital', () => {
    grantConsent()

    cy.visit('/odklad/pokracovat')
    submitRedirectForm()

    cy.wait('@conversion')
      .its('request.body')
      .should('deep.equal', { gclid: GCLID, type: 'odklad' })
  })

  it('reports nothing without consent', () => {
    cy.visit(`/?gclid=${GCLID}`)
    decline().click()

    cy.visit('/pokracovat')
    submitRedirectForm()

    // give a beacon time to go out before asserting none was sent
    cy.wait(500)
    cy.get('@conversion.all').should('have.length', 0)
  })
})
