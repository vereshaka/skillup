import { Then, When } from 'cypress-cucumber-preprocessor/steps';
import { openWidget } from '../page_objects/hfhs-cockpit';
import { checkItemListExistence, search } from '../page_objects/multiple_search';

When(/^I open '(.*)' Widget from toolbar$/,
  (widgetName) => { openWidget(widgetName); });

When(/^I try to search by '(.*)' query$/,
  (query) => { search(query); });

Then(/^I should see item list$/,
  () => { checkItemListExistence(); });
