module.exports = {
  elements: {
    'Product Move': 'openPM',
    'Search Product': 'openPM',
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
    cy.wait(500);
    if (widgetName === 'Search Product') {
      cy.get('span[class="Icon faPlusSquare fa2x AddProduct "]').click();
    } else {
      cy
        .get(`button[id=${module.exports.getElementIdByName(widgetName)}]`)
        .click();
    }
  },
};
