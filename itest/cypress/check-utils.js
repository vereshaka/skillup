export const checkButtonExistence = (id) => {
  cy.get(`button[id=${id}]`);
};

export const checkInputExistence = (id) => {
  cy.get(`input[id=${id}]`);
};
