import AbstractWidget from './common/abstract-widget';
import SearchProductWidget from './search-product-widget';
import SearchAccountWidget from './search-account-widget';


class ChangeOwnershipWidget extends AbstractWidget {
  initElements() {
    this.elements = {
      'Add Product': 'select_product_btn',
      'Add Account': 'selectAccount_searchButton',
      'Next Button': 'wizard_next_btn',
    };
  }

  getName = () => 'Change Ownership';

  specifyGroup = (name: string, group: string) => {
    cy.mediumWait();
    cy.get(`div[class="gucci-common-expandable-panel-header"]:contains(${group})`).find(`div#${this.elements[name]}>span`).click({ force: true });
  };

  openDialog = (name: string, group?:string) => {
    switch (name) {
      case 'Add Product':
        cy.get(`span#${this.elements[name]}`).click();
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
    cy.normalWait();
  };

  specifyAccount = (account:string, query:string, group:string) => {
    this.openDialog('Add Account', group);
    new SearchAccountWidget().addAccount(account, query);
  };

  isPageOpened = () => {
    cy.get(`button#${this.elements['Next Button']}`).click();
    cy.get('ol.gucci-common-stepper>li:eq(2)').should('have.attr', 'active');
  };

  isSelectedAccountsCorrect = (table:Object) => {
    let { length } = table.hashes();
    length = Number(length);
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < length; i++) {
      cy.get(`div.StepWrapper>div>div.StepWrapper>div:eq(1)>div[class="gucci-common-expandable-panel "]:eq(${i})`).contains(table.hashes()[i].Product).should('exist');
      cy.get(`div.StepWrapper>div>div.StepWrapper>div:eq(1)>div[class="gucci-common-expandable-panel "]:eq(${i})`).contains(table.hashes()[i].Subscription).should('exist');
      if (table.hashes()[i].LockedOrders === '') {
        cy.get('div.OrderBlock').should('not.exist');
      } else {
        // Do nothing
      }
    }
  };

  isTargetAccountCorrect = (table: Object) => {
    table.hashes().forEach((row) => {
      cy.get(`div.AccountInfoTestTest>div.AccountInfoTestTest:contains(${row.AccountNumber})`).should('exist');
      cy.get(`div.AccountInfoTestTest>div.AccountInfoTestTest:contains(${row.IBAN})`).should('exist');
      if (row.LockedOrders === '') {
        cy.get('div.OrderBlock').should('not.exist');
      } else {
        // Do nothing
      }
    });
  };
}

export default ChangeOwnershipWidget;
