import { elements } from './integration/page_objects/search-product';

export const checkButtonExistence = (buttonName) => {
  cy.get(`button[id=${elements[buttonName]}]`);
};
