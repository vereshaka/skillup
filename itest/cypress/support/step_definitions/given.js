import {
  Given,
} from 'cypress-cucumber-preprocessor/steps';
import { search } from '../page_objects/search-product';
import {
  addProducts,
  specifyAccount,
} from '../page_objects/product-move';
import gucciWorld from './hooks';


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
Given(/^switch to (.*) Cockpit$/,
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
  search(searchItem);
});
Given(/add all products founded by '(.*)'/, (query) => {
  addProducts(query);
});
Given(/specify '(.*)' account founded by '(.*)' for (.*[A-Z]) group/, (account, query, group) => {
  specifyAccount(account, query, group);
});
