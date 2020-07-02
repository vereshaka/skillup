import moment from 'moment';
import AbstractWidget from './common/abstract-widget';
import SearchProductWidget from './search-product-widget';
import SearchAccountWidget from './search-account-widget';
import { getValue } from './utils/config';


class ChangeOwnershipBySuccessorWidget extends AbstractWidget {
  initElements() {
    this.elements = {
      'Add Product': 'CO.selectProduct.btn',
      'Add Account': 'CO.selectAccount.btn',
      'Next Button': 'wizard_CO.navigateNext.btn_btn',
      'Date Picker': 'CO.datepiker',
      Cancel: 'CO.navigationCancel.btn',
      'Confirm cancel': 'CO.confirmModal.btn',
      'Exclude Product': 'CO.excludeProduct.btn',
    };
  }

  getName = () => 'Change Ownership by successor';

  specifyGroup = (name: string, group: string) => {
    cy.waitUntil(() => cy.get(`div[class="gucci-common-expandable-panel-header"]:contains(${group})`).then(($group) => $group.find(`button[id="${this.elements[name]}"].inactive`).length === 0), {
      errorMsg: 'Change Ownership by successor not loaded',
      timeout: 30000,
      interval: 1000,
    });
    cy.get(`div[class="gucci-common-expandable-panel-header"]:contains(${group})`).find(`button[id="${this.elements[name]}"]`).click();
  };

  openDialog = (name: string, group?: string) => {
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
    cy.waitUntil(() => cy.get('body').then(($body) => $body.find(`span[id="${this.elements['Add Product']}"]`).length), {
      errorMsg: 'Change Ownership by successor not loaded',
      timeout: 30000,
      interval: 1000,
    });
    this.isAlreadyAdded();
    cy.waitUntil(() => cy.get('body').then(($body) => $body.find(`span[id="${this.elements['Add Product']}"]`).length), {
      errorMsg: 'Change Ownership by successor not loaded',
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

  isPageOpened = () => {
    cy.waitUntil(() => cy.get('body').then(($body) => $body.find(`button[id="${this.elements['Next Button']}"][disabled]`).length === 0), {
      errorMsg: 'Change Ownership by successor not loaded',
      timeout: 30000,
      interval: 1000,
    });
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
        // eslint-disable-next-line no-undef
        expect(value).to.equal(moment(localDate).format('DD.MM.YYYY'));
      });
    } else {
      cy.get(`input[id='${this.elements['Date Picker']}']`).clear().type(date).type('{enter}');
    }
  };

  isWidgetExist = () => {
    cy.waitUntil(() => cy.get('body').then(($body) => $body.find(`span[id="${this.elements['Add Product']}"]`).length), {
      errorMsg: 'Change Ownership by successor not loaded',
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
      errorMsg: 'Change Ownership by successor not loaded',
      timeout: 30000,
      interval: 1000,
    });
    this.isAlreadyAdded();
    cy.waitUntil(() => cy.get('body').then(($body) => $body.find(`span[id="${this.elements['Add Product']}"]`).length), {
      errorMsg: 'Change Ownership by successor not loaded',
      timeout: 30000,
      interval: 1000,
    });
    this.openDialog('Add Product');
    new SearchProductWidget().search(query);
  };

  isProductTransferable = (transferability) => {
    cy.waitUntil(() => cy.get('body').then(($body) => $body.find('span[class="WarningWrapperCommon"]').length), {
      errorMsg: 'Product Structure not loaded',
      timeout: 30000,
      interval: 1000,
    });
    switch (transferability) {
      case 'transferable':
        cy.get('div[class="ProductsWrapper "]').find('span[class="WarningWrapperCommon"]>span>span').should('have.class', 'Icon faCheck');
        break;
      case 'not transferable':
        cy.get('div[class="ProductsWrapper "]').find('span[class="WarningWrapperCommon"]>span>span').should('have.class', 'Icon faExclamationTriangle');
        break;
      case 'conditionally transferable':
        cy.get('div[class="ProductsWrapper "]').find('span[class="WarningWrapperCommon"]>span>span').should('have.class', 'Icon faBell');
        break;
      default:
        throw new Error(`Unsupported transferability. Name: ${transferability}`);
    }
  };

  isSelectAccountActive = (isActive) => {
    switch (isActive) {
      case 'active':
        cy.get(`div[id='${this.elements['Add Account']}']`).should('not.have.class', 'disabled');
        break;
      case 'disabled':
        cy.get(`div[id='${this.elements['Add Account']}']`).should('have.class', 'disabled');
        break;
      default:
        throw new Error(`Unsupported status. Name: ${isActive}`);
    }
  };

  setEffectiveDate = () => {
    const localDate = new Date();
    const month = localDate.getMonth() + 1;
    const year = localDate.getFullYear();
    const myDate = new Date().getDate();
    const dayInMonth = new Date(year, month, 0).getDate();
    let newDate;
    if (myDate >= dayInMonth - 1) {
      newDate = moment(localDate).add(3, 'days').format('DD.MM.YYYY');
    } else {
      newDate = moment(localDate).add(1, 'days').format('DD.MM.YYYY');
    }
    cy.get(`input[id='${this.elements['Date Picker']}']`).clear().type(newDate).type('{enter}');
  };

  isWarningExist = () => {
    cy.get('div[class="EffectiveDateWarning Icon faExclamationTriangle fax"]:contains(Set Execution Date to the last day of a calendar month if possible)').should('exist');
  };

  deleteProducts = (table) => {
    table.hashes().forEach((row) => {
      cy.get(`div[class='gucci-common-expandable-panel-header']:contains(${row.Product}${row.Subscription})`)
        .find(`span[id='${this.elements['Exclude Product']}']`).click();
      cy.get(`button[id='${this.elements['Confirm cancel']}']`).click();
    });
  };

  isSelectingProductsStepOpen = () => {
    cy.get('h3:contains(Select products to move.)').should('exist');
  };
}

export default ChangeOwnershipBySuccessorWidget;
