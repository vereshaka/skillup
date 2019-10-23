const getUrl = () => 'http://gucci-portal.k8s.sytoss.intra';

const getPassword = (username) => {
  if (username === 'admin') {
    return 'password';
  }
  return username;
};

const login = (username) => {
  cy
    .get('input[name="username"]')
    .type(username);
  cy
    .get('input[name="password"]')
    .type(getPassword(username));
  cy
    .get('input[name="login"]')
    .click();
};

module.exports = {
  openCockpitPage(username, cockpitName) {
    cy.visit(getUrl());
    login(username);
    cy
      .get('div[title="Navigation"]')
      .click();
    cy
      .get(`a[href="/portal/web/${cockpitName.toLowerCase()}"]`)
      .click();
  },
  checkButtonExistence(buttonName) {
    cy
      .get('button')
      .contains(buttonName);
  },
  openWidget(widgetName) {
    cy.get('button')
      .contains(widgetName)
      .click();
  },
};

