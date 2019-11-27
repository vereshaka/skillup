// @flow
import moment from 'moment';
import AbstractWidget from './common/abstract-widget';
import SearchProductWidget from './search-product-widget';
import SearchAccountWidget from './search-account-widget';

class ProductMoveWidget extends AbstractWidget {
  initElements() {
    this.elements = {
      'Add Product': 'addProduct',
      'Add Account': 'selectAccount_searchButton',
    };
  }

  getName = () => 'Product Move';

  specifyGroup = (name: string, group: string) => {
    cy.get(`div[class="accordion__item"]:contains("${group} Products")`).as('searchableGroup').click();
    cy.get('@searchableGroup').find(`button[id="${this.elements[name]}"]`).click();
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

  addProducts = (query: string, products?: Array<string>) => {
    cy.normalWait();
    this.isAlreadyAdded();
    cy.normalWait();
    this.openDialog('Add Product');
    new SearchProductWidget().searchAndAdd(query, products);
  };

  specifyAccount = (account:string, query:string, group:string) => {
    this.openDialog('Add Account', group);
    new SearchAccountWidget().addAccount(account, query);
  };

  isPageOpened = () => {
    cy.get('button.NavigationButton:contains(Next)').click();
    cy.get('ol.progtrckr>li:eq(2)').should('have.class', 'progtrckr-doing no-hl');
  };

  isSelectedAccountsCorrect = (table:Object) => {
    let { length } = table.hashes();
    length = Number(length);
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < length; i++) {
      cy.get(`div.ProductItemMove:eq(${i})>div>div>a`).contains(table.hashes()[i].Product).should('exist');
      cy.get(`div.ProductItemMove:eq(${i})>div>div>span:eq(0)`).contains(table.hashes()[i].Subscription).should('exist');
      cy.get(`div.ProductItemMove:eq(${i})>div>span:eq(1)`).contains(table.hashes()[i].AccountNumber).should('exist');
      cy.get(`div.ProductItemMove:eq(${i})>div>span:eq(2)`).contains(table.hashes()[i].AccountType).should('exist');
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
      cy.get('div.ArrowPosition>span:eq(0)').should('have.text', `Moved at ${moment(localDate).format('D/MM/YYYY')}`);
    } else {
      cy.get('div.ArrowPosition>span:eq(0)').should('have.text', `Moved at ${date}`);
    }
  };

  isTargetAccountCorrect = (table: Object) => {
    table.hashes().forEach((row) => {
      cy.get('div[class="AccountInfoTest AccountInfo_Confirmation"]>div>span:eq(0)').should('have.text', row.AccountNumber);
      cy.get('div[class="AccountInfoTest AccountInfo_Confirmation"]>div>span:eq(5)').should('have.text', `IBAN:${row.IBAN}`);
      if (row.LockedOrders === '') {
        cy.get('div.OrderBlock').should('not.exist');
      } else {
        // Do nothing
      }
    });
  };

  openProductInfo = (productName, group) => {
    cy.get('span[class="Icon faMinusSquare fa2x ExcludeAllProducts"]').click();
    cy.get(`div[class="accordion__item"]:contains("${group} Products")`).click();
    cy.get(`a:contains(${productName})`).click();
  };

  isInfoCorrect = (productName) => {
    cy.longWait();
    cy.get(`div[class="tab-dialog-button active"]>div:contains(${productName})`).should('exist');
  };
}

export default ProductMoveWidget;
