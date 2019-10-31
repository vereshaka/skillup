// @flow
import {
  Given,
} from 'cypress-cucumber-preprocessor/steps';
import { search } from '../page_objects/search-product';
import gucciWorld from './hooks';
import ProductMoveWidget from '../page_objects/product-move-widget';

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
  //gucciWorld.getCurrentCockpit().openWidget(widgetName);
});
Given(/^open '([a-zA-Z ]*)' widget$/, (widgetName) => {
  gucciWorld.getCurrentCockpit().openWidget(widgetName);
});
Given(/^search '(.*)'/, (searchItem) => {
  search(searchItem);
});
Given(/add all products founded by '(.*)'/, (query: string) => {
  (gucciWorld.getCurrentCockpit().getCurrentWidget(): ProductMoveWidget).addProducts(query);
});
Given(/specify '(.*)' account founded by '(.*)' for (.*[A-Z]) group/, (account, query, group) => {
  (gucciWorld.getCurrentCockpit().getCurrentWidget(): ProductMoveWidget)
    .specifyAccount(account, query, group);
});
Given(/^open '(.*)' dialog$/, (dialogName) => {
  gucciWorld.getCurrentCockpit().openDialog(dialogName);
});
