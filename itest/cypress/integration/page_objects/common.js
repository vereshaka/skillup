module.exports = {
  openLoginForm() {
    const getPortalURL = () => 'http://gucci-portal.k8s.sytoss.intra';
    cy.visit(getPortalURL());
    cy.get('body').then(($body) => {
      if ($body.find('div.logout').length) {
        cy.get('a[href="/portal/_/api/logout"]').click();
      }
    });
  },
  openCockpit(cockpitName) {
    cy.get('div.menu-drawer').click();
    cy.get(`a:contains(${cockpitName})`).click();
  },
  openWidget(widgetName) {
    cy.get(`span:contains(${widgetName})`).click();
  },
};
