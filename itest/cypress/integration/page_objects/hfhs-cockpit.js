
module.exports = {
  elements: {
    'Product Move': 'openPM',
  },
  getElementIdByName(elementName) {
    return module.exports.elements[elementName];
  },
  checkUserCredentials(username, keycloakName, table) {
  },
  checkBusinessTransactionWidgetExistence() {
    cy.get('div.BusinessTransactionsWrapper');
  },
  openWidget(widgetName) {
    cy
      .get(`button[id=${module.exports.getElementIdByName(widgetName)}]`)
      .click();
  },
};
