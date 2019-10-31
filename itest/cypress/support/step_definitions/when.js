import {
  When,
} from 'cypress-cucumber-preprocessor/steps';
import {
  openHelp,
  search,
} from '../page_objects/search-product';
import { isPageOpened } from '../page_objects/product-move';
import gucciWorld from './hooks';

When(/I have try to login as (.*) with (.*) credential/,
  (username, type) => {
    gucciWorld.login(username, type === 'correct');
  });
When(/I try to search by '(.*)' query/, (query) => {
  search(query);
});
When(/I search '(.*)'/, (query) => {
  search(query);
});
When(/Click on Help Button/, () => {
  openHelp();
});
When(/^I open '([a-zA-Z ]*)' widget$/, (widgetName) => {
  gucciWorld.getCurrentCockpit().openWidget(widgetName);
});
When(/Order validation step is open/, () => {
  isPageOpened();
});
When(/^I open '(.*)' Widget from toolbar$/, (widgetName) => {
  gucciWorld.getCurrentCockpit().openWidget(widgetName);
});
