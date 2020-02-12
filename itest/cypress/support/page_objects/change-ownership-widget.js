import moment from 'moment';
import AbstractWidget from './common/abstract-widget';
import SearchProductWidget from './search-product-widget';
import SearchAccountWidget from './search-account-widget';
import { getValue } from './utils/config';


class ChangeOwnershipWidget extends AbstractWidget {
  initElements() {
    this.elements = {
      'Add Product': 'CO.selectProduct.btn',
      'Add Account': 'CO.selectAccount.btn',
      'Next Button': 'wizard_CO.navigateNext.btn_btn',
      'Date Picker': 'CO.datepiker',
      Cancel: 'CO.navigationCancel.btn',
      'Confirm cancel': 'CO.confirmModal.btn',
    };
  }

  getName = () => 'Change Ownership';

  specifyGroup = (name: string, group: string) => {
    cy.mediumWait();
    cy.get(`div[class="gucci-common-expandable-panel-header"]:contains(${group})`).find(`div[id="${this.elements[name]}"]>span`).click({ force: true });
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
    cy.get(`button[id='${this.elements.Cancel}']`).click();
    cy.shortWait();
    cy.get(`button[id='${this.elements['Confirm cancel']}']`).click();
  };

  isAlreadyAdded = () => {
    cy.get('body').then(($body) => {
      if ($body.find('div[class="gucci-common-expandable-panel active"]').length || $body.find('div.ProductItemMove').length) {
        this.cancelProductMoveProcess();
      }
    });
  };

  addProducts = (query: string, table?: Object) => {
    cy.mediumWait();
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
    cy.get(`button[id="${this.elements['Next Button']}"]`).click();
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
      cy.get(`div.Flex>div.Flex:contains(${row.AccountNumber})`).should('exist');
      cy.get(`div.Flex>div.Flex:contains(${row.IBAN})`).should('exist');
      if (row.LockedOrders === '') {
        cy.get('div.OrderBlock').should('not.exist');
      } else {
        // Do nothing
      }
    });
  };

  isDateCorrect = (date:string) => {
    if (date === 'now') {
      const localDate = new Date();
      cy.get(`input[id='${this.elements['Date Picker']}']`).invoke('attr', 'value').then((value) => {
        cy.log(value);
        const time = moment(value).format('DD.MM.YYYY');
        cy.log(time);
        // eslint-disable-next-line no-undef
        expect(time).to.equal(moment(localDate).format('DD.MM.YYYY'));
      });
    } else {
      cy.get(`input[id='${this.elements['Date Picker']}']`).clear().type(date).type('{enter}');
    }
  };

  isWidgetExist = () => {
    cy.mediumWait();
    cy.get('div[class="mashroom-portal-app-wrapper portal-app-change-ownership hide-header"]').should('exist');
  };

  selectDiscount = (discount) => {
    cy.get('div[class="gucci-common-select-field-button"]:eq(0)').click();
    cy.get('div.gucci-common-select-field-drop-down-wrapper').find(`span:contains(${getValue(discount)})`).click();
  };

  isTransactionFeeCorrect = (transactionFee: Number) => {
    const enTransactionFee = transactionFee.toLocaleString('en-EN', { minimumFractionDigits: 2 });
    const deTransactionFee = transactionFee.toLocaleString('de-DE', { minimumFractionDigits: 2 });
    switch (Cypress.env('localisation')) {
      case 'EN':
        cy.get(`div[class="TransactionFeeTitle"]:contains(${enTransactionFee})`).should('exist');
        break;
      case 'DE':
        cy.get(`div[class="TransactionFeeTitle"]:contains(${deTransactionFee})`).should('exist');
        break;
      default:
        throw new Error(`Unsupported localisation. Name: ${Cypress.env('localisation')}`);
    }
  };
}

export default ChangeOwnershipWidget;
