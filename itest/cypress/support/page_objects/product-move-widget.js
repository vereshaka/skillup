// @flow
import moment from 'moment';
import AbstractWidget from './common/abstract-widget';
import SearchProductWidget from './search-product-widget';
import AddAccountWidget from './add-account-widget';

class ProductMoveWidget extends AbstractWidget {
  initElements() {
    this.elements = {
      'Add Product': 'Icon faPlusSquare fa2x AddProduct ',
      'Add Product2': 'addProduct',
      'Add Account': 'selectAccount_searchButton',
    };
  }

  getName = () => 'Product Move';

  openDialog = (name: string) => {
    switch (name) {
      case 'Add Product':
        cy.get(`span[class="${this.elements[name]}"]`).click();
        this.currentDialog = new SearchProductWidget();
        break;
      case 'Add Account':
        cy.get(`button[id="${this.elements[name]}"]`).click();
        this.currentDialog = new AddAccountWidget();
        break;
      default:
        throw new Error(`Unsupported dialog. Name: ${name}`);
    }
  };

  addProducts = (query: string) => {
    new SearchProductWidget().searchAndAddAll(query);
  };

  specifyAccount = (account, query, group) => {
    new AddAccountWidget().addAccount(account, query, group);
  };

  isPageOpened = () => {
    cy.get('button.NavigationButton:contains(Next)').click();
    cy.get('ol.progtrckr>li:eq(2)').should('have.class', 'progtrckr-doing no-hl');
  };

  isSelectedAccountsCorrect = (table) => {
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

  isDateCorrect = (date) => {
    if (date === 'now') {
      const localDate = new Date();
      cy.get('div.ArrowPosition>span:eq(0)').should('have.text', `Moved at ${moment(localDate).format('D/MM/YYYY')}`);
    } else {
      cy.get('div.ArrowPosition>span:eq(0)').should('have.text', `Moved at ${date}`);
    }
  };

  isTargetAccountCorrect = (table) => {
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
}

export default ProductMoveWidget;
