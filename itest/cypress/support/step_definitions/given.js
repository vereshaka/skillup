// @flow
import {
  Given,
} from 'cypress-cucumber-preprocessor/steps';
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
Given(/I see '(.*)' that were '(.*)' in the last month/, (affiliation, currentStatus, table) => {
  (gucciWorld
    .getCurrentCockpit()
    .getBusinessTransactionWidget(): BusinessTransactionHistoryWidget)
    .showTransactionList(affiliation, currentStatus, table);
});

Given(/(.*) has no business transactions/, (username: string) => {
  gucciWorld.deleteAllForUser(username);
});

Given(/(.*) has business transaction that was '(.*)' today with items/, (username, status, table) => {
  gucciWorld.deleteAllForUser(username);
  gucciWorld.insertTransactionWithItems(username, status, table.hashes());
});
