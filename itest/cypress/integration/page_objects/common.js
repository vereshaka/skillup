module.exports = {
  openLoginForm () {
    const getPortalURL  = () => 'http://gucci-portal.k8s.sytoss.intra';
    cy.visit(getPortalURL());
    //TODO: add check that if you logged in then make logout
    cy.get('body').then(($body) => {
      if($body.find('a:contains(Logout)').length){
      cy.get('a:contains(Logout)').click();
    }
    })
  }
};