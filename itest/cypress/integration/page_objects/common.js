const getPortalURL = () => 'http://gucci-portal.k8s.sytoss.intra';

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
  openLoginForm() {
    cy.visit(getPortalURL());
    cy.get('body').then(($body) => {
      if ($body.find('div.logout').length) {
        cy.get('a[href="/portal/_/api/logout"]').click();
      }
    });
  },
  openCockpitPage(username, cockpitName) {
    cy.visit(getPortalURL());
    login(username);
    cy
      .get('div[title="Navigation"]')
      .click();
    cy
      .get(`a[href="/portal/web/${cockpitName.toLowerCase()}"]`)
      .click();
  },
};
