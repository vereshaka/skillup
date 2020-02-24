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
    cy.waitUntil(() => cy.get('body').then(($body) => $body.find(`button[id=${this.elements[buttonCaption]}]`).length), {
      errorMsg: `${this.elements[buttonCaption]} not loaded`,
      timeout: 30000,
      interval: 1000,
    });
    cy.get(`button[id=${this.elements[buttonCaption]}]`).click();
  };
}

export default HfhsToolbarWidget;
