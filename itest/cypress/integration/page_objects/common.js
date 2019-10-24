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
    cy.wait(200);
  },
  openWidget(widgetName) {
    cy.wait(200);
    cy.get('body').then(($body) => {
      if ($body.find(`span:contains(${widgetName})`).length) {
        cy.get(`span:contains(${widgetName})`).click();
      } if (widgetName === 'Search Product') {
        cy.get('span[class="Icon faPlusSquare fa2x AddProduct "]').click();
      }
    });
  },
};
