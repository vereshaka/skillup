module.exports = {
  addProducts(query) {
    cy.get('span[class="Icon faPlusSquare fa2x AddProduct "]').click();
    cy.get('input[id="searchForm_searchInput"]').type(query);
    cy.get('button[id="searchForm_searchButton"]').click();
    cy.wait(200);
    cy.get('a[href="#select-all"]').click();
    cy.get('button[id="process-button"]').click();
  },
};
