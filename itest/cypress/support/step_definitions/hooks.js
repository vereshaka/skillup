// @flow
import {
  Before,
  After,
} from 'cypress-cucumber-preprocessor/steps';
import GucciWorld from '../page_objects/common/gucci-world';

const gucciWorld = new GucciWorld();

Before(() => {
  switch (Cypress.env('configFile')) {
    case 'local':
      cy.request('PUT', 'http://mock.k8s.sytoss.intra/api/configure', { mode: 'read_personal_only', timeout: 2000 });
      break;
    case 'hfhsmock':
      cy.request('PUT', 'https://hfhs-sm.gucci-qa.at.inside/api/configure', { mode: 'read_personal_only', timeout: 2000 });
      break;
    default:
      break;
  }
});

After(() => {
  gucciWorld.reset();
});

export default gucciWorld;
