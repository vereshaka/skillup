import { Given, And, Then } from 'cypress-cucumber-preprocessor/steps';
import {
  checkBusinessTransactionWidgetExistence,
  checkUserCredentials, isGroupExist,
  isGroupNotExist,
} from '../page_objects/hfhs-cockpit';
import { checkButtonExistence, openCockpitPage, openWidget } from '../page_objects/common';

Given(/^(.*) exists in (.*) keycloak with the following groups:$/,
  (username, keycloakName, table) => { checkUserCredentials(username, keycloakName, table); });

And(/^(.*) have open (.*) Cockpit$/,
  (username, cockpitName) => { openCockpitPage(username, cockpitName); });

Then(/^I should see active '(.*)' button$/,
  (buttonName) => { checkButtonExistence(buttonName); });

And(/^business transaction widget is displayed$/,
  () => { checkBusinessTransactionWidgetExistence(); });

And(/transaction list mode group is (not |)presented/,
  (existence) => {
    if (existence === 'not ') {
      isGroupNotExist();
    } if (existence === '') {
      isGroupExist();
    }
  });

Then(/^I open '(.*)' Widget from toolbar$/,
  (widgetName) => { openWidget(widgetName); });
