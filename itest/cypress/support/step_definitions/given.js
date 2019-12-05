// @flow
import { Given } from 'cypress-cucumber-preprocessor/steps';
import gucciWorld from './hooks';
import ProductMoveWidget from '../page_objects/product-move-widget';
import SearchProductWidget from '../page_objects/search-product-widget';
import SearchAccountWidget from '../page_objects/search-account-widget';
import BusinessTransactionHistoryWidget from '../page_objects/business-transaction-history-widget';

Given(/^As anonymous user I open GUCCI Portal$/, () => {
  gucciWorld.openLoginForm();
});
Given(/^(.*) exists in (.*) keycloak with the following groups:$/,
  () => { // username, keycloakName, table
    // TODO: implement me
  });
// eslint-disable-next-line no-unused-vars
Given(/As (.*) with permission '(.*)'/, (username, permission) => {
  gucciWorld.login(username);
});
Given(/^switch to (.*)$/,
  (cockpitName) => {
    gucciWorld.openCockpit(cockpitName);
  });
Given(/open '([a-zA-Z ]*)' widget from '([a-zA-Z ]*)'/, (widgetName, cockpitName) => {
  gucciWorld.openCockpit(cockpitName);
  gucciWorld.getCurrentCockpit().openWidget(widgetName);
});
Given(/^open '([a-zA-Z ]*)' widget$/, (widgetName) => {
  gucciWorld.getCurrentCockpit().openWidget(widgetName);
});
Given(/^search '(.*)'/, (searchItem) => {
  (gucciWorld.getCurrentCockpit().getCurrentWidget().getCurrentDialog(): SearchProductWidget)
    .search(searchItem);
});
Given(/add (|all )products founded by '(.*)'/, (isAll: string, query: string, table?) => {
  if (isAll === 'all ') {
    (gucciWorld.getCurrentCockpit()
      .getCurrentWidget(): ProductMoveWidget).addProducts(query);
  } if (isAll === '') {
    (gucciWorld.getCurrentCockpit()
      .getCurrentWidget(): ProductMoveWidget).addProducts(query, table);
  }
});
Given(/specify '(.*)' account founded by '(.*)' for (.*[A-Z]) group/, (account, query, group) => {
  (gucciWorld.getCurrentCockpit().getCurrentWidget(): ProductMoveWidget)
    .specifyAccount(account, query, group);
});
Given(/^open '(.*)' dialog$/, (dialogName) => {
  (gucciWorld.getCurrentCockpit().getCurrentWidget(): ProductMoveWidget).openDialog(dialogName);
});
Given(/open '(.*)' dialog with '(.*)' group/, (dialogName, group) => {
  (gucciWorld.getCurrentCockpit().getCurrentWidget(): ProductMoveWidget)
    .openDialog(dialogName, group);
});
Given(/accounts founded by '(.*)' are displayed/, (query, table) => {
  (gucciWorld.getCurrentCockpit().getCurrentWidget().getCurrentDialog(): SearchAccountWidget)
    .searchAndCheck(query, table);
});
Given(/I select '(.*)' account/, (account) => {
  (gucciWorld.getCurrentCockpit().getCurrentWidget().getCurrentDialog(): SearchAccountWidget)
    .selectAccount(account);
});
Given(/^I open GUCCI Portal as (.*)$/,
  (username) => {
    gucciWorld.login(username);
  });
Given(/search products by '(.*)'/, (query) => {
  (gucciWorld.getCurrentCockpit().getCurrentWidget(): ProductMoveWidget).searchProducts(query);
});
Given(/found customer should have contract capable equals '(.*)'/, (value) => {
  (gucciWorld.getCurrentCockpit().getCurrentWidget().getCurrentDialog(): SearchProductWidget)
    .checkContractCapable(value);
});
Given(/found customer should have provisional customer equals '(.*)'/, (value) => {
  (gucciWorld.getCurrentCockpit().getCurrentWidget().getCurrentDialog(): SearchProductWidget)
    .checkProvisionalCustomer(value);
});
Given(/found customer should have status equals '(.*)'/, (value) => {
  (gucciWorld.getCurrentCockpit().getCurrentWidget().getCurrentDialog(): SearchProductWidget)
    .checkStatus(value);
});
Given(/(^\d+) products are displayed/, (numberOfProducts) => {
  (gucciWorld.getCurrentCockpit().getCurrentWidget().getCurrentDialog(): SearchProductWidget)
    .productsLength(numberOfProducts);
});
Given(/I see '(.*)' that were '(.*)' in the '(.*)'/, (affiliation, currentStatus, date, table) => {
  (gucciWorld
    .getCurrentCockpit()
    .getBusinessTransactionHistoryWidget(): BusinessTransactionHistoryWidget)
    .showTransactionList(affiliation, currentStatus, date, table);
});

Given(/(.*) has no business transactions/, (username: string) => {
  cy.deleteAllForUser(username);
});

Given(/(.*) has business transaction #(.*) that was '(.*)' today with items/, (username, id, status, table) => {
  cy.deleteAllForUser(username);
  cy.deleteById(id);
  cy.insertTransactionWithItems(username, id, status, table.hashes());
});

Given(/I have selected '(.*)' that were '(.*)' in the '(.*)'/, (affiliation, currentStatus, date) => {
  (gucciWorld
    .getCurrentCockpit()
    .getBusinessTransactionHistoryWidget(): BusinessTransactionHistoryWidget)
    .filterTransactionList(affiliation, currentStatus, date);
});
