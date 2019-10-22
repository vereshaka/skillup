const getPassword = (username) => {
  return username;
};
module.exports = {
  login(username, type) {
    cy.get("input[id='username']").type(username);
    if (type === 'wrong') {
      cy.get("input[id='password']").type(username + '123');
    }
    if (type === 'correct') {
      cy.get("input[id='password']").type(getPassword(username));
    }
    cy.get('input[value="Log In"]').click();
  },

  checkLogin(errorMessage) {
    cy.get('span').should('have.text', `${errorMessage}`);
  },

  checkWelcomeCockpit(mainTitle) {
    cy.get('h1').should('have.text', `${mainTitle}`);
  },

  cockpitExistence(cockpitName, rights) {
    if (rights === 'not') {
      cy.get(`ul>li>a`).each(($el) => {
        cy.get($el).should('not.have.text', `${cockpitName}`)
      });
    }
    if (rights === '') {
      cy.get('ul>li').find(`a:contains(${cockpitName})`);
    }
  },
};