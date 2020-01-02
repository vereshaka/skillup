// @flow

import AbstractCockpit from './common/abstract-cockpit';
import HfhsToolbarWidget from './hfhs-toolbar-widget';
import ProductMoveWidget from './product-move-widget';
import BusinessTransactionHistoryWidget from './business-transaction-history-widget';
import ChangeOwnershipWidget from './change-ownership-widget';

class HfhsCockpit extends AbstractCockpit {
  toolbar: HfhsToolbarWidget = new HfhsToolbarWidget();

  businessTransactionHistory: BusinessTransactionHistoryWidget = new BusinessTransactionHistoryWidget();

  getName = (): string => 'HFHS Cockpit';

  getTitle = (): string => 'HFHS Cockpit';

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
      default:
        throw new Error(`Unsupported widget. Name: ${name}`);
    }
  };

  checkProductMoveButtonExistence = () => {
    cy.get('button#openPM');
  };
}

export default HfhsCockpit;
