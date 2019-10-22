const getPassword = (username) => {
  return username;
};
module.exports = {
  login(username, type) {
    cy.get("input[id='username']").type(username);
    if (type === 'wrong'){
      cy.get("input[id='password']").type(username+'123');
    } if (type === 'correct') {
      cy.get("input[id='password']").type(getPassword(username));
    }
    cy.get('input[value="Log In"]').click();
  },

  checkLogin(errorMessage){
   cy.get('span').should('have.text', `${errorMessage}`);
  },

  checkWelcomeCockpit(mainTitle){
    cy.get('h1').should('have.text', `${mainTitle}`);
  },
  cockpitExistence(cockpitName){
    cy.get('div[class="menu-drawer"]').click();
    cy.get('a[class="nav-link"]').should('not.have.text', `${cockpitName}`);
    cy.get('a[class="nav-link active"]').should('not.have.text', `"${cockpitName}"`);
  },
};