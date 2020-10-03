// describe custom Cypress commands in this file

// load the global Cypress types
/// <reference types="Cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to select DOM element by data-cy attribute.
     * @example cy.dataCy('greeting')
     */
    dataCy(value: string): Chainable<Element>

    /**
     * Custom command that logs in the test user from auth0
     * @example cy.login()
     */
    login(): Chainable<Response>
  }
}
