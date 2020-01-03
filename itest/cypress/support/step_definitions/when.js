// @flow
import { When } from 'cypress-cucumber-preprocessor/steps';

import gucciWorld from './hooks';
import SearchProductWidget from '../page_objects/search-product-widget';
import ProductMoveWidget from '../page_objects/product-move-widget';
import BusinessTransactionHistoryWidget from '../page_objects/business-transaction-history-widget';
import ChangeOwnershipWidget from '../page_objects/change-ownership-widget';
import ProductDetailsWidget from '../page_objects/product-details-widget';
import HfhsCockpit from '../page_objects/hfhs-cockpit';

When(/I have try to login as (.*) with (.*) credential/,
  (username, type) => {
    gucciWorld.login(username, type === 'correct');
  });
When(/I try to search by '(.*)' query/, (query) => {
  (gucciWorld.getCurrentCockpit()
    .getCurrentWidget()
    .getCurrentDialog(): SearchProductWidget)
    .search(query);
});
When(/I search '(.*)'/, (query) => {
  (gucciWorld.getCurrentCockpit()
    .getCurrentWidget()
    .getCurrentDialog(): SearchProductWidget)
    .search(query);
});
When(/Click on Help Button/, () => {
  (gucciWorld.getCurrentCockpit()
    .getCurrentWidget()
    .getCurrentDialog(): SearchProductWidget)
    .openHelp();
});
When(/^I open '([a-zA-Z ]*)' widget$/, (widgetName) => {
  gucciWorld.getCurrentCockpit()
    .openWidget(widgetName);
});
When(/Order validation step is open/, () => {
  const currentWidgetName = gucciWorld.getCurrentCockpit()
    .getCurrentWidget()
    .getName();
  switch (currentWidgetName) {
    case 'Product Move':
      (gucciWorld.getCurrentCockpit()
        .getCurrentWidget(): ProductMoveWidget)
        .isPageOpened();
      break;
    case 'Change Ownership':
      (gucciWorld.getCurrentCockpit()
        .getCurrentWidget(): ChangeOwnershipWidget)
        .isPageOpened();
      break;
    default:
      throw new Error(`Unsupported widget. Name: ${currentWidgetName}`);
  }
});
When(/^I open '(.*)' Widget from toolbar$/, (widgetName) => {
  gucciWorld.getCurrentCockpit()
    .openWidget(widgetName);
});
When(/^switch to (.*)$/,
  (cockpitName) => {
    gucciWorld.openCockpit(cockpitName);
  });
When(/I click on '(.*)' product with '(.*)' call number from (.*[A-Z]) Group/, (productName, callNumber, group) => {
  (gucciWorld.getCurrentCockpit()
    .getCurrentWidget(): ProductMoveWidget)
    .openProductInfo(productName, callNumber, group);
});
When(/^add all products$/,
  () => {
    (gucciWorld.getCurrentCockpit()
      .getCurrentWidget()
      .getCurrentDialog(): SearchProductWidget)
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
When(/selected (|'(.*)' customer and )all products/, (customerName?) => {
  (gucciWorld.getCurrentCockpit()
    .getCurrentWidget()
    .getCurrentDialog(): SearchProductWidget)
    .checkCustomersAndProductListsExistence(customerName);
});
When(/I add another product founded by '(.*)'/, (query: string, table?) => {
  (gucciWorld.getCurrentCockpit()
    .getCurrentWidget(): ProductMoveWidget).addAnotherProduct(query, table);
});
When(/I click on (collapse|expand) structure button/, (buttonName) => {
  (gucciWorld.getCurrentCockpit().getCurrentWidget().getCurrentWidget(): ProductDetailsWidget)
    .clickOnStructureButton(buttonName);
});
When(/type '(.*)' at search field/, (query) => {
  (gucciWorld.getCurrentCockpit().getCurrentWidget().getCurrentWidget(): ProductDetailsWidget)
    .search(query);
});
When(/click on '(.*)' subproduct/, (subproductName) => {
  (gucciWorld.getCurrentCockpit().getCurrentWidget().getCurrentWidget(): ProductDetailsWidget)
    .openSubproductInfo(subproductName);
});
