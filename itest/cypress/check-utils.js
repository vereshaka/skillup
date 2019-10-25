import { getElementIdByName } from './integration/page_objects/hfhs-cockpit';

module.exports = {
  checkButtonExistence(buttonName) {
    cy.get(`button[id=${getElementIdByName(buttonName)}]`);
  },
};
