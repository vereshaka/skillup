// @flow
import {
  Before,
  After,
} from 'cypress-cucumber-preprocessor/steps';
import GucciWorld from '../page_objects/common/gucci-world';

const gucciWorld = new GucciWorld();

Before(() => {
  if (Cypress.env('configFile') === 'hfhsmock') {
    cy.request('PUT', `${Cypress.env('mockUrl')}`, { mode: 'read_personal_only', timeout: 2000 });
  }
});

After(() => {
  gucciWorld.reset();
});

export default gucciWorld;
