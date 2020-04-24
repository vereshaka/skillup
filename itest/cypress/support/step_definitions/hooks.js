// @flow
import {
  Before,
  After,
} from 'cypress-cucumber-preprocessor/steps';
import GucciWorld from '../page_objects/common/gucci-world';

const gucciWorld = new GucciWorld();

// eslint-disable-next-line no-undef
before(() => {
  if (Cypress.env('mockUrl')) {
    cy.request('PUT', `${Cypress.env('mockUrl')}`, { mode: 'read_personal_only', timeout: 2000 });
  }
});

Before(() => {
  cy.clearCookies();
  cy.clearLocalStorage();
});

After(() => {
  gucciWorld.reset();
});

export default gucciWorld;
