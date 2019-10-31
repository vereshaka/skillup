// @flow
import AbstractWidget from './common/abstract-widget';
import {
  elements,
  wait,
} from './search-product';
import SearchProductWidget from './search-product-widget';

class ProductMoveWidget extends AbstractWidget {
  createElements = (): Map<string, string> => ({
    '': '',
  });

  getName = () => 'Product Move';

  openDialog = (name: string) => {
    switch (name) {
      case 'Add Product':
        // TODO: ivanp: Should be refactored when CCF-840  will be done
        cy.get('span[class="Icon faPlusSquare fa2x AddProduct "]').click();
        break;
      case 'Add Account':
        break;
      default:
        throw new Error(`Unsupported dialog. Name: ${name}`);
    }
  };

  addProducts = (query: string) => {
    cy.get('span[class="Icon faPlusSquare fa2x AddProduct "]').click();
    new SearchProductWidget().searchAndAddAll(query);
  };

  specifyAccount = (account, query, group) => {
    cy.get(`button[id="${elements['Select Account']}"]`).click();
    cy.get(`input[id="${elements['Search input']}"]`).type(query);
    cy.get(`button[id="${elements['Search run']}"]`).click();
    cy.wait(wait.normalWait);
    cy.get(`div:contains(${account})>input[type="radio"]`).click();
    // TODO: yevgenyv: add check that selected account has specified group
    cy.get('button[id="process-button"]').click();
  };
}

export default ProductMoveWidget;
