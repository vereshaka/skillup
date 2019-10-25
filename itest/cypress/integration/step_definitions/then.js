import { Then } from 'cypress-cucumber-preprocessor/steps';
import { openWidget } from '../page_objects/hfhs-cockpit';
import { search } from '../page_objects/multiple_search';

Then(/^I open '(.*)' Widget from toolbar$/,
  (widgetName) => { openWidget(widgetName); });

Then(/^I try to search by '(.*)' query$/,
  (query) => { search(query); });
