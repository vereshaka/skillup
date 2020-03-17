// @flow
import { When } from 'cypress-cucumber-preprocessor/steps';

import gucciWorld from './hooks';
import SearchProductWidget from '../page_objects/search-product-widget';
import ProductMoveWidget from '../page_objects/product-move-widget';
import BusinessTransactionHistoryWidget from '../page_objects/business-transaction-history-widget';
import ChangeOwnershipWidget from '../page_objects/change-ownership-widget';
import ProductDetailsWidget from '../page_objects/product-details-widget';
import ChangeOwnershipBySuccessorWidget from '../page_objects/change-ownership-by-successor-widget';

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
    case 'Change Ownership by successor':
      (gucciWorld.getCurrentCockpit()
        .getCurrentWidget(): ChangeOwnershipBySuccessorWidget)
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
When(/click '(.*)'/, (buttonName) => {
  (gucciWorld.getCurrentCockpit()
    .getCurrentWidget(): ProductMoveWidget)
    .clickOnButton(buttonName);
});
When(/I open first operation from list/, () => {
  (gucciWorld
    .getCurrentCockpit()
    .getBusinessTransactionHistoryWidget(): BusinessTransactionHistoryWidget)
    .openFirstOperation();
});
When(/Transaction fee discount is '(no discount|50% discount|100% discount)'/, (discount) => {
  const currentWidgetName = gucciWorld.getCurrentCockpit()
    .getCurrentWidget()
    .getName();
  switch (currentWidgetName) {
    case 'Change Ownership':
      (gucciWorld.getCurrentCockpit()
        .getCurrentWidget(): ChangeOwnershipWidget)
        .selectDiscount(discount);
      break;
    case 'Change Ownership by successor':
      (gucciWorld.getCurrentCockpit()
        .getCurrentWidget(): ChangeOwnershipBySuccessorWidget)
        .selectDiscount(discount);
      break;
    default:
      throw new Error(`Unsupported widget. Name: ${currentWidgetName}`);
  }
});
When(/select '(Name|SidID|Names and SidIds)' mode/, (mode) => {
  (gucciWorld.getCurrentCockpit().getCurrentWidget().getCurrentWidget(): ProductDetailsWidget)
    .selectMode(mode);
});
When(/search products by '(.*)'/, (query) => {
  (gucciWorld.getCurrentCockpit().getCurrentWidget(): ChangeOwnershipWidget).searchProducts(query);
});
When(/I add (|all )products founded by '(.*)'/, (isAll: string, query: string, table?) => {
  const currentWidgetName = gucciWorld.getCurrentCockpit().getCurrentWidget().getName();
  switch (currentWidgetName) {
    case 'Product Move':
      if (isAll === 'all ') {
        (gucciWorld.getCurrentCockpit()
          .getCurrentWidget(): ProductMoveWidget).addProducts(query);
      }
      if (isAll === '') {
        (gucciWorld.getCurrentCockpit()
          .getCurrentWidget(): ProductMoveWidget).addProducts(query, table);
      }
      break;
    case 'Change Ownership':
      if (isAll === 'all ') {
        (gucciWorld.getCurrentCockpit()
          .getCurrentWidget(): ChangeOwnershipWidget).addProducts(query);
      }
      if (isAll === '') {
        (gucciWorld.getCurrentCockpit()
          .getCurrentWidget(): ChangeOwnershipWidget).addProducts(query, table);
      }
      break;
    default:
      throw new Error(`Unsupported widget. Name: ${currentWidgetName}`);
  }
});
When(/I search by '(.*)'/, (query) => {
  (gucciWorld.getCurrentCockpit()
    .getCurrentWidget()
    .getCurrentDialog(): SearchProductWidget)
    .search(query);
});
When(/set effective date not end of month/, () => {
  (gucciWorld.getCurrentCockpit().getCurrentWidget(): ChangeOwnershipWidget)
    .setEffectiveDate();
});
