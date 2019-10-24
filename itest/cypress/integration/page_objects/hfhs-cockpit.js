module.exports = {
  checkUserCredentials(username, keycloakName, table) {
  },
  checkButtonExistence(buttonName) {
    cy
      .get('button')
      .contains(buttonName);
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
