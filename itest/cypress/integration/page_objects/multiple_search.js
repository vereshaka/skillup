module.exports = {
  search(query) {
    cy.get('input[name="search-field"]')
      .type(query);
    cy.get('button[name="search-button"]')
      .click();
  },
};
