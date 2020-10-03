// ***********************************************
// This example namespace declaration will help
// with Intellisense and code completion in your
// IDE or Text Editor.
// ***********************************************
// declare namespace Cypress {
//   interface Chainable<Subject = any> {
//     customCommand(param: any): typeof customCommand;
//   }
// }
//
// function customCommand(param: any): void {
//   console.warn(param);
// }
//
// NOTE: You can use it like so:
// Cypress.Commands.add('customCommand', customCommand);
//
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

/// <reference types="Cypress" />

/**
 * Adds custom command "cy.dataCy" to the global "cy" object
 *
 * @example cy.dataCy('greeting')
 */
Cypress.Commands.add("dataCy", value => {
    return cy.get(`[data-cy=${value}]`);
});

/**
 * Adds custom command "cy.login" to the global "cy" object
 *
 * @example cy.login()
 */
Cypress.Commands.add("login", () => {
    Cypress.log({
        name: "loginViaAuth0",
    });

    const options = {
        method: "POST",
        url: Cypress.env("auth_url"),
        body: {
            grant_type: "password",
            username: Cypress.env("auth_username"),
            password: Cypress.env("auth_password"),
            scope: "openid profile email",
            client_id: Cypress.env("auth_client_id"),
            client_secret: Cypress.env("auth_client_secret"),
        },
    };
    cy.request(options);
});

export {};
