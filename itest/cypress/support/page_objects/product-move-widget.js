// @flow
import moment from 'moment';
import AbstractWidget from './common/abstract-widget';
import SearchProductWidget from './search-product-widget';
import SearchAccountWidget from './search-account-widget';
import ProductDetailsWidget from './product-details-widget';

class ProductMoveWidget extends AbstractWidget {
  initElements() {
    this.elements = {
      'Add Product': 'PM.selectingStep.addProduct.btn',
      'Add Account': 'PM.selectAccount.link',
      'Next Button': 'wizard_PM.next.btn_btn',
      'Exclude Invalid Products': 'PM.excludeAllWarnProducts.btn',
    };
  }

  getName = () => 'Product Move';

  specifyGroup = (name: string, group: string) => {
    cy.mediumWait();
    cy.get(`div[class="gucci-common-expandable-panel-header"]:contains("${group}Products")`).as('searchableGroup');
    cy.get('@searchableGroup').find(`div[id="${this.elements[name]}"]`).click();
  };

  openDialog = (name: string, group?:string) => {
    switch (name) {
      case 'Add Product':
        cy.get(`span[id="${this.elements[name]}"]`).click();
        this.currentDialog = new SearchProductWidget();
        break;
      case 'Add Account':
        if (group) {
          this.specifyGroup(name, group);
          this.currentDialog = new SearchAccountWidget();
        } else {
          throw new Error('No group was defined');
        }
        break;
      default:
        throw new Error(`Unsupported dialog. Name: ${name}`);
    }
  };

  cancelProductMoveProcess = () => {
    cy.get('button#wizardCancel').click();
  };

  isAlreadyAdded = () => {
    cy.get('body').then(($body) => {
      if ($body.find('div.AccountInfoTest').length || $body.find('div.ProductItemMove').length) {
        this.cancelProductMoveProcess();
      }
    });
  };

  addProducts = (query: string, table?: Object) => {
    cy.normalWait();
    this.isAlreadyAdded();
    cy.normalWait();
    this.openDialog('Add Product');
    new SearchProductWidget().searchAndAdd(query, table);
  };

  searchProducts = (query: string) => {
    cy.normalWait();
    this.isAlreadyAdded();
    cy.normalWait();
    this.openDialog('Add Product');
    new SearchProductWidget().search(query);
  };

  specifyAccount = (account:string, query:string, group:string) => {
    this.openDialog('Add Account', group);
    new SearchAccountWidget().addAccount(account, query);
  };

  isPageOpened = () => {
    cy.normalWait();
    cy.get(`button[id="${this.elements['Next Button']}"]`).click();
    cy.get('ol.gucci-common-stepper>li:eq(2)').should('have.attr', 'active');
  };

  isSelectedAccountsCorrect = (table:Object) => {
    let { length } = table.hashes();
    length = Number(length);
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < length; i++) {
      cy.get(`div[class="ProductsWrapper "]>div:eq(${i})>div>div>div>div>div>a`).contains(table.hashes()[i].Product).should('exist');
      cy.get(`div[class="ProductsWrapper "]>div:eq(${i})>div>div>div>div>div>span:eq(0)`).contains(table.hashes()[i].Subscription).should('exist');
      cy.get(`div[class="ProductsWrapper "]>div:eq(${i})>div>div>div>div>span:eq(1)`).contains(table.hashes()[i].AccountNumber).should('exist');
      cy.get(`div[class="ProductsWrapper "]>div:eq(${i})>div>div>div>div>span:eq(2)`).contains(table.hashes()[i].AccountType).should('exist');
      if (table.hashes()[i].LockedOrders === '') {
        cy.get('div.OrderBlock').should('not.exist');
      } else {
        // Do nothing
      }
    }
  };

  isDateCorrect = (date:string) => {
    if (date === 'now') {
      const localDate = new Date();
      cy.get('div.ArrowPosition>span:eq(0)').should('have.text', `Moved at ${moment(localDate).format('D/M/YYYY')}`);
    } else {
      cy.get('div.ArrowPosition>span:eq(0)').should('have.text', `Moved at ${date}`);
    }
  };

  isTargetAccountCorrect = (table: Object) => {
    table.hashes().forEach((row) => {
      cy.get('div[class="HeadingItemsPosition"]>div.Flex>div.Flex>div:eq(0)>span:eq(0)').should('have.text', row.AccountNumber);
      cy.get('div[class="HeadingItemsPosition"]>div.Flex>div.Flex>div:eq(1)>span:eq(1)').should('have.text', `${row.IBAN}`);
      if (row.LockedOrders === '') {
        cy.get('div.OrderBlock').should('not.exist');
      } else {
        // Do nothing
      }
    });
  };

  openProductInfo = (productName: string, callNumber:string, group: string) => {
    cy.get('body')
      .then(($body) => {
        if ($body.find(`span[id="${this.elements['Exclude Invalid Products']}"]`).length) {
          cy.get(`span#${this.elements['Exclude Invalid Products']}`)
            .click();
        }
      });
    cy.get(`div[class="gucci-common-expandable-panel active"]:contains("${group}Products")`).as('searchableGroup');
    cy.get('@searchableGroup').find(`div:contains(${productName}${callNumber})>a:contains(${productName})`).click();
    this.currentWidget = new ProductDetailsWidget();
    cy.normalWait();
  };

  isErrorMessageNotExist = () => {
    cy.get('span.RestrMessage').should('not.exist');
  };

  isErrorMessageExist = (message: string) => {
    cy.get('span.RestrMessage').should('exist');
    cy.get('span.RestrMessage>span')
      .each(($el) => {
        cy.get($el)
          .should('have.text', message);
      });
  };

  addAnotherProduct = (query: string, table?: Object) => {
    cy.normalWait();
    this.openDialog('Add Product');
    new SearchProductWidget().searchAndAdd(query, table);
  };

  isButtonActive = (buttonName) => {
    cy.get(`button[id="${this.elements[buttonName]}"]`).should('not.be.disabled');
  };

  isTargetAccountNotSelected = () => {
    cy.get('div.AccountInfoTest').should('not.exist');
  }
}

export default ProductMoveWidget;
