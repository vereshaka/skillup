// @flow
import AbstractWidget from './abstract-widget';

class AbstractCockpit {
  currentWidget: AbstractWidget;

  elements: Object;

  constructor() {
    this.initElements();
  }

  initElements() {
    throw new Error(`Implement me: ${this.getName()}.initElements`);
  }

  getName = (): string => {
    throw new Error('Implement me: getName');
  };

  getTitle = (): string => {
    throw new Error('Implement me: getTitle');
  };

  open = () => {
    // cy.visit(`${Cypress.env('portalUrl')}portal/web/hfhs`);
    cy.get('div.menu-drawer').click();
    cy.get(`a:contains(${this.getName()})`).click();
    // TODO: yevgenyv: please check is it possible replace wait on isOpen
    cy.shortWait();
  };

  isOpen() {
    cy.get('h1').should('have.text', this.getTitle());
  }

  checkLayout = () => {
    throw new Error('Implement me: checkLayout');
  };

  openWidget = (name: string) => {
    throw new Error(`Implement me: openWidget(${name})`);
  };

  getCurrentWidget = () => this.currentWidget;

  close = () => {
    this.currentWidget = undefined;
  };
}

export default AbstractCockpit;
