// @flow

import AbstractCockpit from './common/abstract-cockpit';
import HfhsToolbarWidget from './hfhs-toolbar-widget';
import ProductMoveWidget from './product-move-widget';
import BusinessTransactionWidget from './business-transaction-widget';

class HfhsCockpit extends AbstractCockpit {
  toolbar: HfhsToolbarWidget = new HfhsToolbarWidget();

  businessTransaction: BusinessTransactionWidget = new BusinessTransactionWidget();

  getName = (): string => 'HFHS Cockpit';

  getTitle = (): string => 'HFHS Cockpit';

  getBusinessTransactionWidget = () => this.businessTransaction;

  openWidget = (name: string) => {
    switch (name) {
      case 'Product Move':
        this.toolbar.clickToolbarButton(name);
        this.currentWidget = new ProductMoveWidget();
        break;
      case 'Change Ownership':
        this.toolbar.clickToolbarButton(name);
        // TODO: yevgenyv: enable me later: this.currentWidget = new ChangeOwnershipWidget();
        break;
      default:
        throw new Error(`Unsupported widget. Name: ${name}`);
    }
  };
}

export default HfhsCockpit;
