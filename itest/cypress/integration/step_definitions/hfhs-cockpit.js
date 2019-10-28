import {
  Given, And, Then, When,
} from 'cypress-cucumber-preprocessor/steps';
import {
  checkBusinessTransactionWidgetExistence,
  checkUserCredentials, openWidget,
} from '../page_objects/hfhs-cockpit';
import { openCockpitPage } from '../page_objects/common';
import { checkButtonExistence } from '../../check-utils';
import { isGroupExist, isGroupNotExist } from '../page_objects/business_transaction_widget';

Given(/^(.*) exists in (.*) keycloak with the following groups:$/,
  (username, keycloakName, table) => { checkUserCredentials(username, keycloakName, table); });

When(/^(.*) have open (.*) Cockpit$/,
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
