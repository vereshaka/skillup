module.exports = {
  search(query) {
    cy.get('input[name="search-field"]')
      .type(query);
    cy.get('button[name="search-button"]')
      .click();
    cy
      .get('a[name="productCountButton"]')
      .contains('...');
  },
  checkItemListExistence() {
    cy
      .get('div#searchResult')
      .should('have.length', '1')
      .find('div.ScrollableListWrapper')
      .should('have.length', '1')
      .find('div[class="ResultItem CustomerItem"]')
      .find('div[class="ResultItem CustomerItem"]')
      .find('div[class="CustomerItemSelection"]');
    cy
      .get('a[name="productCountButton"]')
      .contains('9');
  },
};
