// @flow
import { wait } from '../search-product';
import AbstractWidget from './abstract-widget';

class AbstractCockpit {
  openedWidgets: Array<AbstractWidget>;

  getName = (): string => {
    throw new Error('Implement me: getName');
  };

  getTitle = (): string => {
    throw new Error('Implement me: getTitle');
  }

  open() {
    cy.get('div.menu-drawer').click();
    cy.get(`a:contains(${this.getName()})`).click();
    // TODO: yevgenyv: please check is it possible replace wait on isOpen
    cy.wait(wait.shortWait);
  }

  isOpen() {
    cy.get('h1').should('have.text', this.getTitle());
  }

  checkLayout = () => {
    throw new Error('Implement me: checkLayout');
  };

  openWidget = (name: string) => {
    throw new Error(`Implement me: openWidget(${name})`);
  };

  addWidgetToOpened(widget: AbstractWidget) {
    this.openedWidgets.push(widget);
  }

  removeWidgetFromOpened = (widget: AbstractWidget) => {
    throw new Error(`Implement me removeWidgetFromOpened(${JSON.stringify(widget)})`);
    // TODO: yevgenyv: find teh widget in openedWidgets array and remove this and all others

    /* [0] = w1
    [1] = w2
    [2] = w3
    [3] = w4

     for w4 - remove 3, for w2 - remove 1,2 and 3
    */
  }

  close = () => {

  };
}

export default AbstractCockpit;
