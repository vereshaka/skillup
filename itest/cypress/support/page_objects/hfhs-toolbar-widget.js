// @flow
import AbstractWidget from './common/abstract-widget';
import { wait } from '../../check-utils';


class HfhsToolbarWidget extends AbstractWidget {
  initElements() {
    this.elements = {
      'Product Move': 'openPM',
      'Change Ownership': 'openCO',
    };
  }

  getName = () => 'HFHS Toolbar';

  clickToolbarButton = (buttonCaption: string) => {
    cy.wait(wait.shortWait);
    cy.get('body').then(($body) => {
      if ($body.find(`span:contains(${buttonCaption})`).length) {
        cy.get(`button[id=${this.elements[buttonCaption]}]`)
          .click();
      } else {
        throw new Error(`${buttonCaption} not found`);
      }
    });
  };
}

export default HfhsToolbarWidget;
