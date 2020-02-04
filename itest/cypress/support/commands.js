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
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
const dbParams = {
  dbUsername: Cypress.env('dbUsername'),
  dbPassword: Cypress.env('dbPassword'),
  dbConnectionString: Cypress.env('dbConnectionString'),
};

Cypress.Commands.add('shortWait', () => { cy.wait(200); });
Cypress.Commands.add('normalWait', () => { cy.wait(1000); });
Cypress.Commands.add('mediumWait', () => { cy.wait(4000); });
Cypress.Commands.add('longWait', () => { cy.wait(10000); });
Cypress.Commands.add('deleteAllForUser', (username) => {
  cy.task('deleteAllForUser:db', { username, dbParams });
  cy.log(`deleted records for user: ${username}`);
});
Cypress.Commands.add('deleteById', (id: number) => {
  cy.task('deleteById:db', { id, dbParams });
  cy.log(`deleted record № ${id}`);
});
Cypress.Commands.add('insertTransactionWithItems', (username, type, id, completionStatus, businessTransactionItems) => {
  let status;
  switch (completionStatus) {
    case 'done with error':
      status = 'with_error';
      break;
    case 'taken place':
      status = 'done';
      break;
    default:
      status = completionStatus;
  }

  cy.task('insertTransactionWithItems:db', {
    username,
    type,
    id,
    status,
    businessTransactionItems,
    dbParams,
  });
  cy.log(`inserted transaction with items for ${username}`);
});
