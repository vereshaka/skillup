
module.exports = {
  checkUserCredentials(username, keycloakName, table) {
  },
  checkBusinessTransactionWidgetExistence() {
    cy.get('div.BusinessTransactionsWrapper');
  },
  openWidget(widgetName) {
    cy.get('button')
      .contains(widgetName)
      .click();
  },
};
