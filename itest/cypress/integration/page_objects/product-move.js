
module.exports = {
  checkUserCredentials(username, keycloakName, table) {
  },
  checkBusinessTransactionWidgetExistence() {
    cy.get('div.BusinessTransactionsWrapper');
  },
  isGroupNotExist() {
    cy
      .get('div.NavigationPanel')
      .find('form')
      .should('have.length', '0');
  },
  isGroupExist() {
    cy
      .get('div.NavigationPanel')
      .find('form')
      .should('have.length', '1')
      .find('div')
      .should('have.length', '1')
      .find('span')
      .should('have.length', '4');
  },
};
