// @flow
import { Given } from 'cypress-cucumber-preprocessor/steps';
import gucciWorld from './hooks';
import ProductMoveWidget from '../page_objects/product-move-widget';
import SearchProductWidget from '../page_objects/search-product-widget';
import SearchAccountWidget from '../page_objects/search-account-widget';

Given(/^As anonymous user I open GUCCI Portal$/, () => {
  gucciWorld.openLoginForm();
});
// eslint-disable-next-line no-unused-vars
Given(/As (.*) with permission '(.*)'/, (username, permission) => {
  gucciWorld.login(username);
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
Given(/add all products founded by '(.*)'/, (query: string) => {
  (gucciWorld.getCurrentCockpit().getCurrentWidget(): ProductMoveWidget).addProducts(query);
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
Given(/found customer should have (contract capable|provisional customer|status) equals '(.*)'/, (flagName, value) => {
  (gucciWorld.getCurrentCockpit().getCurrentWidget().getCurrentDialog(): SearchProductWidget)
    .checkFlag(flagName, value);
});
Given(/(^\d+) products are displayed/, (numberOfProducts) => {
  (gucciWorld.getCurrentCockpit().getCurrentWidget().getCurrentDialog(): SearchProductWidget)
    .productsLength(numberOfProducts);
});
