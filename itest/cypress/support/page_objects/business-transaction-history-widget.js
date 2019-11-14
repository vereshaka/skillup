// @flow
import AbstractWidget from './common/abstract-widget';

class BusinessTransactionHistoryWidget extends AbstractWidget {
  initElements() {
    this.elements = {
      '': '',
    };
  }

  getName = (): string => 'Business Transaction History';

  isWidgetExists = () => {
    cy.get('div.BusinessTransactionsWrapper');
  };

  isAdminGroupNotExist = () => {
    cy
      .get('div.NavigationPanel')
      .find('form')
      .should('not.exist');
  };

  isAdminGroupExist = () => {
    cy
      .get('div.NavigationPanel')
      .find('form')
      .should('exist')
      .find('div.RadioButtonsPanel')
      .as('RadioButtonsPanel')
      .should('exist');
    cy
      .get('@RadioButtonsPanel')
      .find('input[type="radio"]')
      .should('have.length', '2')
      .each(($el) => {
        cy.get($el)
          .should('not.be.disabled');
      });
  };

  selectAffiliationValue = (affiliation) => {
    let index;
    if (affiliation === 'all transactions') {
      index = 1;
    } else index = 0;
    cy
      .get('input[type="radio"]')
      .eq(index)
      .click();
  };

  selectStatusValue = (currentStatus) => {
    let value;
    switch (currentStatus) {
      case 'done':
        value = 'done';
        break;
      case 'done with error':
        value = 'with_error';
        break;
      default:
        value = 'all';
    }
    cy
      .get('select.SelectableOptions')
      .eq(0)
      .select(value);
  };

  checkTransactionListLength = () => {
    cy.shortWait();
    cy.get('body').then(($body) => {
      if ($body.find('div.LoadMoreWrapper').find('div.gucci-common-button').length) {
        cy.get('a[href="#selectBusinessTransactionItem"]').should('have.length', '10');
      } else {
        // Do nothing
      }
    });
  };

  filterTransactionList = (affiliation, currentStatus) => {
    this.selectAffiliationValue(affiliation);
    this.selectStatusValue(currentStatus);
    cy
      .get('select.SelectableOptions')
      .eq(1)
      .select('last_month');
    this.checkTransactionListLength();
  };

  selectLatestTransaction = () => {
    cy
      .get('a[href="#selectBusinessTransactionItem"]')
      .eq(0)
      .click();
  };

  isInfoDisplayed = () => {
    cy
      .get('a[href="#selectBusinessTransactionItem"]')
      .eq(0)
      .invoke('text')
      .then(($text) => {
        cy
          .get('div[class="tab-dialog-button active"]')
          .find('div.title')
          .should('have.text', $text);
      });
  }
}

export default BusinessTransactionHistoryWidget;
