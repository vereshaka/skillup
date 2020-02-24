import moment from 'moment';
import AbstractWidget from './common/abstract-widget';
import SearchProductWidget from './search-product-widget';
import SearchAccountWidget from './search-account-widget';
import ProductDetailsWidget from "./product-details-widget";
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


  isInfoCorrect = (productName: string, callNumber: string) => {
    cy.mediumWait();
    cy.get(`div[class="tab-dialog-button active"]>div:contains(${callNumber} - ${productName})`)
        .should('exist');
    cy.get(`div.mashroom-portal-tabify-app-wrapper>div[class="mashroom-portal-app-wrapper portal-app-product-details hide-header"]:contains(${callNumber})`)
        .should('be.visible');
  };


  specifyGroup = (name: string, group: string) => {
    cy.waitUntil(() => cy.get(`div[class="gucci-common-expandable-panel-header"]:contains(${group})`).then(($group) => $group.find(`div[id="${this.elements[name]}"].disabled`).length === 0), {
      errorMsg: 'Change Ownership not loaded',
      timeout: 30000,
      interval: 1000,
    });
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

  searchProducts = (query: string) => {
    cy.normalWait();
    this.isAlreadyAdded();
    cy.normalWait();
    this.openDialog('Add Product');
    new SearchProductWidget().search(query);
  };

  addProducts = (query: string, table?: Object) => {
    cy.waitUntil(() => cy.get('body').then(($body) => $body.find(`span[id="${this.elements['Add Product']}"]`).length), {
      errorMsg: 'Change Ownership not loaded',
      timeout: 30000,
      interval: 1000,
    });
    this.isAlreadyAdded();
    cy.waitUntil(() => cy.get('body').then(($body) => $body.find(`span[id="${this.elements['Add Product']}"]`).length), {
      errorMsg: 'Change Ownership not loaded',
      timeout: 30000,
      interval: 1000,
    });
    this.openDialog('Add Product');
    new SearchProductWidget().searchAndAdd(query, table);
  };

  specifyAccount = (account:string, query:string, group:string) => {
    cy.normalWait();
    this.openDialog('Add Account', group);
    new SearchAccountWidget().addAccount(account, query);
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
  isPageOpened = () => {
    cy.get(`button[id="${this.elements['Next Button']}"]`).click();
    cy.get('ol.gucci-common-stepper>li:eq(2)').should('have.attr', 'active');
  };

  isSelectedAccountsCorrectt = (table:Object) => {
    let { length } = table.hashes();
    length = Number(length);
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < length; i++) {
      cy.get(`div[class="ProductsWrapper "]>div:eq(${i})>div`).contains(table.hashes()[i].Product).should('exist');
      cy.get(`div[class="ProductsWrapper "]>div:eq(${i})>div`).contains(table.hashes()[i].Subscription).should('exist');
      if (table.hashes()[i].LockedOrders === '') {
        cy.get('div.OrderBlock').should('not.exist');
      } else {
        // Do nothing
      }
    }

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


  openProductInfo = (productName: string, callNumber:string, group: string) => {
    cy.get('body')
        .then(($body) => {
          if ($body.find(`span[id="${this.elements['Exclude Invalid Products']}"]`).length) {
            cy.get(`span#${this.elements['Exclude Invalid Products']}`)
                .click();
          }
        });
    cy.get(`div[class="gucci-common-expandable-panel active"]:contains("${group}")`).as('searchableGroup');
    cy.get('@searchableGroup').find(`div:contains(${productName}${callNumber})>a:contains(${productName})`).click();
    this.currentWidget = new ProductDetailsWidget();
    cy.normalWait();
  };

  isWidgetExist = () => {
    cy.mediumWait();
    cy.get('div[class="mashroom-portal-app-wrapper portal-app-change-ownership hide-header"]').should('exist');
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
    cy.waitUntil(() => cy.get('body').then(($body) => $body.find(`span[id="${this.elements['Add Product']}"]`).length), {
      errorMsg: 'Change Ownership not loaded',
      timeout: 30000,
      interval: 1000,
    });
    cy.get('div[class="mashroom-portal-app-wrapper portal-app-change-ownership hide-header"]').should('exist');
  };

  selectDiscount = (discount) => {
    cy.get('div[class="gucci-common-select-field-button"]:eq(0)').click();
    cy.get('div.gucci-common-select-field-drop-down-wrapper').find(`span:contains(${getValue(discount)})`).click();
  };

  isTransactionFeeCorrect = (transactionFee: string) => {
    const fee = Number(transactionFee);
    const enTransactionFee = fee.toLocaleString('en-EN', { minimumFractionDigits: 2 });
    const deTransactionFee = fee.toLocaleString('de-DE', { minimumFractionDigits: 2 });
    switch (Cypress.env('localisation')) {
      case 'EN':
        cy.get('div[class="TransactionFeeTitle"]').should('have.text', `Transaction fee €${enTransactionFee}`);
        break;
      case 'DE':
        cy.get('div[class="TransactionFeeTitle"]').should('have.text', `ermitteltes Entgelt ${deTransactionFee}\u00a0€`);
        break;
      default:
        throw new Error(`Unsupported localisation. Name: ${Cypress.env('localisation')}`);
    }
  };

  searchProducts = (query: string) => {
    cy.waitUntil(() => cy.get('body').then(($body) => $body.find(`span[id="${this.elements['Add Product']}"]`).length), {
      errorMsg: 'Product Move not loaded',
      timeout: 30000,
      interval: 1000,
    });
    this.isAlreadyAdded();
    cy.waitUntil(() => cy.get('body').then(($body) => $body.find(`span[id="${this.elements['Add Product']}"]`).length), {
      errorMsg: 'Product Move not loaded',
      timeout: 30000,
      interval: 1000,
    });
    this.openDialog('Add Product');
    new SearchProductWidget().search(query);
  };
}

export default ChangeOwnershipWidget;
