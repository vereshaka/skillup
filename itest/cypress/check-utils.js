import { getElementIdByName } from './integration/page_objects/hfhs-cockpit';

export const checkButtonExistence = (buttonName) => {
  cy.get(`button[id=${getElementIdByName(buttonName)}]`);
};
