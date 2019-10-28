import { Given } from 'cypress-cucumber-preprocessor/steps';
import { login } from '../page_objects/portal-home';
import { checkUserCredentials } from '../page_objects/utils/user-management';
import { search } from '../page_objects/search-product';
import {
  openLoginForm,
  openWidget,
  openCockpit,
} from '../page_objects/utils/portal-utils';

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
