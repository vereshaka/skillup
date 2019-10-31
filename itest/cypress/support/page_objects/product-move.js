import moment from 'moment';
import {
  clearSearch,
  elements,
  wait,
} from './search-product';

export const addProducts = (query) => {
  cy.get('span[class="Icon faPlusSquare fa2x AddProduct "]').click();
  clearSearch();
  cy.get(`input[id="${elements['Search input']}"]`).type(query);
  cy.get(`button[id="${elements['Search run']}"]`).click();
  cy.wait(200);
  cy.get('a[href="#select-all"]').click();
  cy.get('button[id="process-button"]').click();
};
export const specifyAccount = (account, query, group) => {
  cy.get(`button[id="${elements['Select Account']}"]`).click();
  cy.get(`input[id="${elements['Search input']}"]`).type(query);
  cy.get(`button[id="${elements['Search run']}"]`).click();
  cy.wait(wait.normalWait);
  cy.get(`div:contains(${account})>input[type="radio"]`).click();
  // TODO: yevgenyv: add check that selected account has specified group
  cy.get('button[id="process-button"]').click();
};
export const isPageOpened = () => {
  cy.get('button.NavigationButton:contains(Next)').click();
  cy.get('ol.progtrckr>li:eq(2)').should('have.class', 'progtrckr-doing no-hl');
};
export const isSelectedAccountsCorrect = (table) => {
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
export const isDateCorrect = (date) => {
  if (date === 'now') {
    const localDate = new Date();
    cy.get('div.ArrowPosition>span:eq(0)').should('have.text', `Moved at ${moment(localDate).format('DD/MM/YYYY')}`);
  } else {
    cy.get('div.ArrowPosition>span:eq(0)').should('have.text', `Moved at ${date}`);
  }
};
export const isTargetAccountCorrect = (table) => {
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
