module.exports = {
  checkUserCredentials(username, keycloakName, table) {
  },
  checkBusinessTransactionWidgetExistence() {
    cy.get('div.BusinessTransactionsWrapper');
  },
  openWidget(widgetName) {
    cy.wait(500);
    cy.get('body').then(($body) => {
      if ($body.find(`span:contains(${widgetName})`).length) {
        cy.get(`span:contains(${widgetName})`).click();
      } if (widgetName === 'Search Product') {
        cy.get('span[class="Icon faPlusSquare fa2x AddProduct "]').click();
      }
    });
  },
};
