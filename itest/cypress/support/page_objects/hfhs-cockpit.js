// @flow

import AbstractCockpit from './common/abstract-cockpit';
import {
  elements,
  wait,
} from './search-product';

class HfhsCockpit extends AbstractCockpit {
  getName = (): string => 'HFHS Cockpit';

  getTitle = (): string => 'HFHS Cockpit';

  openWidget(name: string) {
    switch (name) {
      case 'Product Move':
        this.openProductMove();
        break;
      case 'Change Ownership':
        this.openChangeOwnership();
        break;
      default:
        throw new Error(`Unsupported widget. Name: ${name}`);
    }
  }

  openProductMove = () => {
    const widgetName = 'Product Move';
    cy.wait(wait.shortWait);
    cy.get('body').then(($body) => {
      if ($body.find(`span:contains(${widgetName})`).length) {
        cy.get(`button[id=${elements[widgetName]}]`)
          .click();
      }
      if (widgetName === 'Search Product') {
        // TODO: ivanp: Should be refactored when CCF-840  will be done
        cy.get('span[class="Icon faPlusSquare fa2x AddProduct "]').click();
      }
    });
  };

  openChangeOwnership = () => {
    throw new Error('Implement me');
  };
}

export default HfhsCockpit;
