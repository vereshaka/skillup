import {
  Given, And, Then, When,
} from 'cypress-cucumber-preprocessor/steps';
import { checkUserCredentials, openWidget } from '../page_objects/hfhs-cockpit';
import { checkButtonExistence, openCockpitPage } from '../page_objects/common';
import { search } from '../page_objects/multiple_search';

Given(/^(.*) exists in (.*) keycloak with the following groups:$/,
  (username, keycloakName, table) => { checkUserCredentials(username, keycloakName, table); });

And(/^(.*) have open (.*) Cockpit$/,
  (username, cockpitName) => { openCockpitPage(username, cockpitName); });

Then(/^I should see active '(.*)' button$/,
  (buttonName) => { checkButtonExistence(buttonName); });


Then(/^I open '(.*)' Widget from toolbar$/,
  (widgetName) => { openWidget(widgetName); });

When(/^I try to search by (.*) query$/,
  (query) => { search(query); });
