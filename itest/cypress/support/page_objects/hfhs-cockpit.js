// @flow

import AbstractCockpit from './common/abstract-cockpit';
import HfhsToolbarWidget from './hfhs-toolbar-widget';
import ProductMoveWidget from './product-move-widget';
import BusinessTransactionHistoryWidget from './business-transaction-history-widget';
import ChangeOwnershipWidget from './change-ownership-widget';
import { getValue } from './utils/config';

class HfhsCockpit extends AbstractCockpit {
  initElements() {
    this.elements = {
      'Product Move': 'openPM',
      'Change Ownership': 'openCO',
      'Business Transaction History': 'openBT',
    };
  }

  toolbar: HfhsToolbarWidget = new HfhsToolbarWidget();

  businessTransactionHistory: BusinessTransactionHistoryWidget = new BusinessTransactionHistoryWidget();

  getName = (): string => 'HFHS Cockpit';

  getTitle = (): string => getValue('HFHS Cockpit');

  getBusinessTransactionHistoryWidget = () => this.businessTransactionHistory;

  openWidget = (name: string) => {
    switch (name) {
      case 'Product Move':
        this.toolbar.clickToolbarButton(name);
        this.currentWidget = new ProductMoveWidget();
        break;
      case 'Change Ownership':
        this.toolbar.clickToolbarButton(name);
        this.currentWidget = new ChangeOwnershipWidget();
        break;
      case 'Business Transaction History':
        this.toolbar.clickToolbarButton(name);
        this.currentWidget = new BusinessTransactionHistoryWidget();
        break;
      default:
        throw new Error(`Unsupported widget. Name: ${name}`);
    }
  };

  checkButtonExistence = (buttonName) => {
    cy.shortWait();
    cy.get(`button[id='${this.elements[buttonName]}']`).should('not.be.disabled');
  };
}

export default HfhsCockpit;
