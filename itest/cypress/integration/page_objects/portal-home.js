import { getPassword } from './utils/config';

export const login = (username, type) => {
  cy.get("input[id='username']").type(username);
  if (type === 'wrong') {
    cy.get("input[id='password']").type(`${username}123`);
  }
  if (type === 'correct') {
    cy.get("input[id='password']").type(getPassword(username));
  }
  cy.get('input[value="Log In"]').click();
};

export const containsError = (errorMessage) => {
  cy.get('span').should('have.text', errorMessage);
};

export const checkCockpit = (mainTitle) => {
  cy.get('h1').should('have.text', mainTitle);
};

export const isCockpitExist = (cockpitName) => {
  cy.get('ul>li').find(`a:contains(${cockpitName})`).should('have.text', cockpitName);
};

export const isCockpitNotExist = (cockpitName) => {
  cy.get('ul>li>a').each(($el) => {
    cy.get($el).should('not.have.text', cockpitName);
  });
};
