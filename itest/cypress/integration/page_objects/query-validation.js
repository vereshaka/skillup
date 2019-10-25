module.exports = {
  checkQuery(query) {
    cy.get('input[id="searchForm_searchInput"]').type(query);
    cy.get('button[id="searchForm_searchButton"]').click();
    cy.wait(500);
  },
  checkError(error) {
    if (error === '') {
      cy.get('div[class="StatusMessage Error ProductItem"]>h3:contains(You have incorrect)').should('not.exist');
    } else {
      cy.get('div[class="StatusMessage Error ProductItem"]>h3').should('have.text', error);
    }
  },
};
