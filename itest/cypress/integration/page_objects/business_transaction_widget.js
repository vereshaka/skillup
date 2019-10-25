module.exports = {
  isGroupNotExist() {
    cy
      .get('div.NavigationPanel')
      .find('form')
      .should('have.length', '0');
  },
  isGroupExist() {
    cy
      .get('div.NavigationPanel')
      .find('form')
      .should('have.length', '1')
      .find('div.RadioButtonsPanel')
      .as('RadioButtonsPanel')
      .should('have.length', '1');
    cy
      .get('@RadioButtonsPanel')
      .find('span')
      .should('have.length', '4');
    cy
      .get('@RadioButtonsPanel')
      .find('input[type="radio"]')
      .should('have.length', '2')
      .each(($el) => {
        cy.get($el).should('not.be.disabled');
      });
  },
};
