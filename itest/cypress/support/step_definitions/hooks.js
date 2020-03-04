// @flow
import {
  Before,
  After,
} from 'cypress-cucumber-preprocessor/steps';
import GucciWorld from '../page_objects/common/gucci-world';

const gucciWorld = new GucciWorld();

Before(() => {
  // TODO: do nothing
  cy.request('PUT', 'http://mock.k8s.sytoss.intra/api/configure', { mode: 'read_personal_only', timeout: 2000 });
});

After(() => {
  gucciWorld.reset();
});

export default gucciWorld;
