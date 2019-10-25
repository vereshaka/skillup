module.exports = {
  search(query) {
    cy.get('input[name="search-field"]')
      .type(query);
    cy.get('button[name="search-button"]')
      .click();

    cy
      .get('a[name="productCountButton"]')
      .contains('...');
    cy
      .get('a[name="productCountButton"]')
      .contains('9').click();
  },
};
