// @flow
import moment from 'moment';
import AbstractWidget from './common/abstract-widget';
// import Dao from '../database/dao';

class BusinessTransactionHistoryWidget extends AbstractWidget {
  initElements() {
    this.elements = {
      'Product Move item': 'productItem_-',
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

  selectAffiliationValue = (affiliation: string) => {
    let index;
    if (affiliation === 'all transactions') {
      index = 1;
    } else index = 0;
    cy
      .get('input[type="radio"]')
      .eq(index)
      .click();
  };

  selectStatusValue = (currentStatus: string) => {
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
    cy
      .get('body')
      .as('bodyTag')
      .then(($body) => {
        if ($body.find('div.LoadMoreWrapper').find('div.gucci-common-button').length) {
          cy
            .get('a[href="#selectBusinessTransactionItem"]')
            .should('have.length', '10');
        }
      });
  };

  filterTransactionList = (affiliation: string, currentStatus: string) => {
    this.selectAffiliationValue(affiliation);
    this.selectStatusValue(currentStatus);
    cy
      .get('select.SelectableOptions')
      .eq(1)
      .select('last_month');
    this.checkTransactionListLength();
  };

  checkTransactionList = (table: Object) => {
    let { length } = table.hashes();
    length = Number(length);
    for (let i = 0; i < length; i += 1) {
      cy.get(`a[href="#selectBusinessTransactionItem"]:eq(${i})`).contains(table.hashes()[i].TransactionType).should('exist');
      cy.get(`tr:eq(${i + 1})>td:eq(1)`).contains(table.hashes()[i].User).should('exist');
      if (table.hashes()[i].CreationDate === 'today') {
        const localDate = new Date();
        cy.get(`tr:eq(${i + 1})>td:eq(1)`).contains(moment(localDate).format('D/MM/YYYY')).should('exist');
      }
      cy.get(`tr:eq(${i + 1})>td:eq(2)`).contains(table.hashes()[i].Count).should('exist');
    }
  };

  showTransactionList = (affiliation: string, currentStatus: string, table: Object) => {
    this.filterTransactionList(affiliation, currentStatus);
    if (table) {
      this.checkTransactionList(table);
    } else {
      cy
        .get('div.BusinessTransactionsWrapper')
        .contains('No record found!');
    }
  };

  selectLatestTransaction = () => {
    cy
      .get('a[href="#selectBusinessTransactionItem"]')
      .eq(0)
      .click();
  };

  isInfoDisplayed = (table: Object) => {
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

    let { length } = table.hashes();
    length = Number(length);
    for (let i = 0; i < length; i += 1) {
      cy.get('div[class="ProductItemMove BusinessTransactionInfoTitle"]>div>strong>span:eq(0)').contains(table.hashes()[i].TransactionType).should('exist');
      cy.get('div[class="ProductItemMove BusinessTransactionInfoTitle"]>div>span>strong:eq(1)').contains(table.hashes()[i].User).should('exist');
      if (table.hashes()[i].CreationDate === 'today' && table.hashes()[i].EffectiveDate === 'today') {
        const localDate = new Date();
        cy.get('div[class="EffectiveDate"]>strong>span').contains(moment(localDate).format('D/MM/YYYY')).should('exist');
        cy.get('div[class="ProductItemMove BusinessTransactionInfoTitle"]>div>span>strong:eq(2)').contains(moment(localDate).format('D/MM/YYYY')).should('exist');
      }
      cy.get('div[class="HeadingItemsPosition"]>div>span').contains(table.hashes()[i].Count).should('exist');
      cy.get('div[class="HeadingItemsPosition"]>div').contains(table.hashes()[i].TargetAccount).should('exist');
      cy.get(`div#${this.elements['Product Move item']}>div>span:eq(0)`).contains(table.hashes()[i].SourceProductSid).should('exist');
      cy.get(`div#${this.elements['Product Move item']}>div>span:eq(1)`).contains(table.hashes()[i].SourceBillableUser).should('exist');
      cy.get(`div#${this.elements['Product Move item']}>div>span:eq(3)`).contains(table.hashes()[i].SourceAccount).should('exist');
    }
  };
}

export default BusinessTransactionHistoryWidget;
