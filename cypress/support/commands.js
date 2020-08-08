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

Cypress.Commands.add('setupOptions', (turnTime, breakTime, breakTurns, activeUsers, inactiveUsers) => {
  cy.get('input[aria-label="Set turn time"]').type(turnTime);
  cy.get('input[aria-label="Set break time"]').type(breakTime);
  cy.get('input[aria-label="Set break turns"]').type(breakTurns);

  inactiveUsers.forEach((user) => {
    cy.get('[data-testid=add-new-user-input]').type(`${user}{enter}`);
  });
  cy.get('[data-testid=active-users-container]').children().each((el) => {
    cy.wrap(el).find('svg').last().click();
  });
  activeUsers.forEach((user) => {
    cy.get('[data-testid=add-new-user-input]').type(`${user}{enter}`);
  });
});
