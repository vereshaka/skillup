module.exports = {
  openPage () {
    const getPortalURL  = () => 'http://gucci-portal.k8s.sytoss.intra';
    cy.visit(getPortalURL());
  }
};
