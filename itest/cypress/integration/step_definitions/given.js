import {
  Given,
} from 'cypress-cucumber-preprocessor/steps';
import { login } from '../page_objects/portal-home';
import { checkUserCredentials } from '../page_objects/utils/user-management';
import { search } from '../page_objects/search-product';
import {
  openLoginForm,
  openWidget,
  openCockpit,
  openCockpitPage,
} from '../page_objects/utils/portal-utils';
import {
  addProducts,
  specifyAccount,
} from '../page_objects/product-move';

Given(/^As anonymous user I open GUCCI Portal$/, () => {
  openLoginForm();
});
// eslint-disable-next-line no-unused-vars
Given(/As (.*) with permission '(.*)'/, (username, permission) => {
  openLoginForm();
  login(username, 'correct');
});
Given(/^(.*) exists in (.*) keycloak with the following groups:$/,
  (username, keycloakName, table) => {
    checkUserCredentials(username, keycloakName, table);
  });
Given(/^switch to (.*) Cockpit$/,
  (cockpitName) => {
    openCockpitPage(cockpitName);
  });
Given(/open '([a-zA-Z ]*)' widget from '([a-zA-Z ]*)'/, (widgetName, cockpitName) => {
  openCockpit(cockpitName);
  openWidget(widgetName);
});
Given(/^open '([a-zA-Z ]*)' widget$/, (widgetName) => {
  openWidget(widgetName);
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
