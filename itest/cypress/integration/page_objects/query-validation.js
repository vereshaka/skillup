module.exports = {
  checkQuery(query) {
    cy.get('input[id="searchForm_searchInput"]').type(query);
    cy.get('button[id="searchForm_searchButton"]').click();
  },
  checkError(error) {
    cy.get('div[class="StatusMessage Error ProductItem"]').should('have.text', error);
  },
};
