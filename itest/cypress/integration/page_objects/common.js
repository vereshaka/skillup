import { login } from './login';

const getPortalURL = () => 'http://gucci-portal.k8s.sytoss.intra';

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
    login(username, 'correct');
    cy
      .get('div[title="Navigation"]')
      .click();
    cy
      .get(`a[href="/portal/web/${cockpitName.toLowerCase()}"]`)
      .click();
  },
};
