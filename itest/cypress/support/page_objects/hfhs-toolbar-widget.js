// @flow
import AbstractWidget from './common/abstract-widget';

class HfhsToolbarWidget extends AbstractWidget {
  initElements() {
    this.elements = {
      'Product Move': 'openPM',
      'Change Ownership': 'openCO',
      'Business Transaction History': 'openBT',
    };
  }

  getName = () => 'HFHS Toolbar';

  clickToolbarButton = (buttonCaption: string) => {
    cy.mediumWait();
    cy.get(`button[id=${this.elements[buttonCaption]}]`).click();
    cy.mediumWait();
  };
}

export default HfhsToolbarWidget;
