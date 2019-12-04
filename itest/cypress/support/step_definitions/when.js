// @flow
import { When } from 'cypress-cucumber-preprocessor/steps';

import gucciWorld from './hooks';
import SearchProductWidget from '../page_objects/search-product-widget';
import ProductMoveWidget from '../page_objects/product-move-widget';
import BusinessTransactionHistoryWidget from '../page_objects/business-transaction-history-widget';

When(/I have try to login as (.*) with (.*) credential/,
  (username, type) => {
    gucciWorld.login(username, type === 'correct');
  });
When(/I try to search by '(.*)' query/, (query) => {
  (gucciWorld.getCurrentCockpit().getCurrentWidget().getCurrentDialog(): SearchProductWidget)
    .search(query);
});
When(/I search '(.*)'/, (query) => {
  (gucciWorld.getCurrentCockpit().getCurrentWidget().getCurrentDialog(): SearchProductWidget)
    .search(query);
});
When(/Click on Help Button/, () => {
  (gucciWorld.getCurrentCockpit().getCurrentWidget().getCurrentDialog(): SearchProductWidget)
    .openHelp();
});
When(/^I open '([a-zA-Z ]*)' widget$/, (widgetName) => {
  gucciWorld.getCurrentCockpit().openWidget(widgetName);
});
When(/Order validation step is open/, () => {
  (gucciWorld.getCurrentCockpit().getCurrentWidget(): ProductMoveWidget)
    .isPageOpened();
});
When(/^I open '(.*)' Widget from toolbar$/, (widgetName) => {
  gucciWorld.getCurrentCockpit().openWidget(widgetName);
});
When(/^switch to (.*)$/,
  (cockpitName) => {
    gucciWorld.openCockpit(cockpitName);
  });
When(/I click on '(.*)' product from (.*[A-Z]) Group/, (productName, group) => {
  (gucciWorld.getCurrentCockpit().getCurrentWidget(): ProductMoveWidget)
    .openProductInfo(productName, group);
});
When(/^add all products$/,
  () => {
    (gucciWorld.getCurrentCockpit().getCurrentWidget().getCurrentDialog(): SearchProductWidget)
      .addAllProducts();
  });
When(/I select business transaction #(.*)/, (id) => {
  (gucciWorld
    .getCurrentCockpit()
    .getBusinessTransactionHistoryWidget(): BusinessTransactionHistoryWidget)
    .selectTransaction(id);
});
When(/I have selected '(.*)' that were '(.*)' in the '(.*)'/, (affiliation, currentStatus, date) => {
  (gucciWorld
    .getCurrentCockpit()
    .getBusinessTransactionHistoryWidget(): BusinessTransactionHistoryWidget)
    .filterTransactionList(affiliation, currentStatus, date);
});
When(/I have selected '(.*)' that were '(.*)' in the '(.*)'/, (affiliation, currentStatus, date) => {
  (gucciWorld
    .getCurrentCockpit()
    .getBusinessTransactionHistoryWidget(): BusinessTransactionHistoryWidget)
    .filterTransactionList(affiliation, currentStatus, date);
});
