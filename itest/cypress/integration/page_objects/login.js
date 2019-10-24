const getPassword = (username) => username;
module.exports = {
  login(username, type) {
    cy.get("input[id='username']").type(username);
    if (type === 'wrong') {
      cy.get("input[id='password']").type(`${username}123`);
    }
    if (type === 'correct') {
      cy.get("input[id='password']").type(getPassword(username));
    }
    cy.get('input[value="Log In"]').click();
  },

  containsError(errorMessage) {
    cy.get('span').should('have.text', errorMessage);
  },

  checkCockpit(mainTitle) {
    cy.get('h1').should('have.text', mainTitle);
  },

  isCockpitExist(cockpitName) {
    cy.get('ul>li').find(`a:contains(${cockpitName})`).should('have.text', cockpitName);
  },

  isCockpitNotExist(cockpitName) {
    cy.get('ul>li>a').each(($el) => {
      cy.get($el).should('not.have.text', cockpitName);
    });
  },
};
