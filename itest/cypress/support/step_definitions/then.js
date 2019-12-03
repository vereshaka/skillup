// @flow
import { Then } from 'cypress-cucumber-preprocessor/steps';
import gucciWorld from './hooks';
import SearchProductWidget from '../page_objects/search-product-widget';
import ProductMoveWidget from '../page_objects/product-move-widget';
import BusinessTransactionWidget from '../page_objects/business-transaction-widget';
import HfhsCockpit from '../page_objects/hfhs-cockpit';

Then('I should receive {string} message on login form',
  (errorMessage) => {
    gucciWorld.hasLoginError(errorMessage);
  });
Then('I should see {string} Cockpit',
  (mainTitle) => {
    gucciWorld.isCurrentCockpit(mainTitle);
  });
Then(/'(.*)' is (not |)available/,
  (cockpitName, rights) => {
    if (rights === 'not ') {
      gucciWorld.isCockpitNotExist(cockpitName);
    }
    if (rights === '') {
      gucciWorld.isCockpitExist(cockpitName);
    }
  });
Then(/^I should see active Product Move button$/,
  () => {
    (gucciWorld.getCurrentCockpit(): HfhsCockpit)
      .checkProductMoveButtonExistence();
  });

Then(/^business transaction widget is displayed$/,
  () => {
    (gucciWorld.getCurrentCockpit().getBusinessTransactionWidget(): BusinessTransactionWidget)
      .isWidgetExists();
  });

Then(/transaction list mode group is (not |)presented/,
  (existence) => {
    if (existence === 'not ') {
      (gucciWorld.getCurrentCockpit().getBusinessTransactionWidget(): BusinessTransactionWidget)
        .isAdminGroupNotExist();
    }
    if (existence === '') {
      (gucciWorld.getCurrentCockpit().getBusinessTransactionWidget(): BusinessTransactionWidget)
        .isAdminGroupExist();
    }
  });

Then(/^'(.*)' should be displayed$/, (error) => {
  (gucciWorld.getCurrentCockpit().getCurrentWidget().getCurrentDialog(): SearchProductWidget)
    .isErrorExists(error);
});
Then(/(^\d+) element should be '(.*)'/, (index, searchItem) => {
  (gucciWorld.getCurrentCockpit().getCurrentWidget().getCurrentDialog(): SearchProductWidget)
    .isSearchElementExists(index, searchItem);
});
Then(/History should be/, (table) => {
  (gucciWorld.getCurrentCockpit().getCurrentWidget().getCurrentDialog(): SearchProductWidget)
    .isHistoryExists(table);
});
Then(/'(.*)' should be (active|disabled)( and (checked|unchecked)|)/, (field, status, state) => {
  (gucciWorld.getCurrentCockpit().getCurrentWidget().getCurrentDialog(): SearchProductWidget)
    .checkField(field, status, state);
});
Then(/Help Page and Close Button should be exist/, () => {
  (gucciWorld.getCurrentCockpit().getCurrentWidget().getCurrentDialog(): SearchProductWidget)
    .isHelpOpened();
});
Then(/The following source account should be selected/, (table) => {
  (gucciWorld.getCurrentCockpit().getCurrentWidget(): ProductMoveWidget)
    .isSelectedAccountsCorrect(table);
});
Then(/Effective date is '(.*)'$/, (date) => {
  (gucciWorld.getCurrentCockpit().getCurrentWidget(): ProductMoveWidget)
    .isDateCorrect(date);
});
Then(/Target account should be/, (table) => {
  (gucciWorld.getCurrentCockpit().getCurrentWidget(): ProductMoveWidget)
    .isTargetAccountCorrect(table);
});
Then(/I should see item and product lists/, () => {
  (gucciWorld.getCurrentCockpit().getCurrentWidget().getCurrentDialog(): SearchProductWidget)
    .checkItemAndProductListsExistence();
});
Then(/The following products should be selected/, (table) => {
  (gucciWorld.getCurrentCockpit().getCurrentWidget(): ProductMoveWidget)
    .isSelectedAccountsCorrect(table);
});
Then(/I should see '(.*)' product details/, (productName) => {
  (gucciWorld.getCurrentCockpit().getCurrentWidget(): ProductMoveWidget)
    .isInfoCorrect(productName);
});
Then(/error (|'(.*)' )should (|not )be displayed/, (message, existOrNo) => {
  if (existOrNo === 'not ') {
    (gucciWorld.getCurrentCockpit().getCurrentWidget(): ProductMoveWidget)
      .isErrorMessageNotExist();
  } if (existOrNo === '') {
    (gucciWorld.getCurrentCockpit()
      .getCurrentWidget(): ProductMoveWidget)
      .isErrorMessageExist(message);
  }
});
