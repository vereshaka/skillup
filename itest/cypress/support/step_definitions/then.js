// @flow
import { Then } from 'cypress-cucumber-preprocessor/steps';
import gucciWorld from './hooks';
import SearchProductWidget from '../page_objects/search-product-widget';
import ProductMoveWidget from '../page_objects/product-move-widget';
import BusinessTransactionHistoryWidget from '../page_objects/business-transaction-history-widget';
import HfhsCockpit from '../page_objects/hfhs-cockpit';
import BusinessTransactionDetailsWidget from '../page_objects/business-transaction-details-widget';
import ChangeOwnershipWidget from '../page_objects/change-ownership-widget';

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

Then(/^business transaction history widget is displayed$/,
  () => {
    (gucciWorld
      .getCurrentCockpit()
      .getBusinessTransactionHistoryWidget(): BusinessTransactionHistoryWidget)
      .isWidgetExists();
  });

Then(/transaction list mode group is (not |)presented/,
  (existence) => {
    if (existence === 'not ') {
      (gucciWorld
        .getCurrentCockpit()
        .getBusinessTransactionHistoryWidget(): BusinessTransactionHistoryWidget)
        .isAdminGroupNotExist();
    }
    if (existence === '') {
      (gucciWorld
        .getCurrentCockpit()
        .getBusinessTransactionHistoryWidget(): BusinessTransactionHistoryWidget)
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
  const currentWidgetName = gucciWorld.getCurrentCockpit()
    .getCurrentWidget()
    .getName();
  switch (currentWidgetName) {
    case 'Product Move':
      (gucciWorld.getCurrentCockpit().getCurrentWidget(): ProductMoveWidget)
        .isSelectedAccountsCorrect(table);
      break;
    case 'Change Ownership':
      (gucciWorld.getCurrentCockpit().getCurrentWidget(): ChangeOwnershipWidget)
        .isSelectedAccountsCorrect(table);
      break;
    default:
      throw new Error(`Unsupported widget. Name: ${currentWidgetName}`);
  }
});
Then(/Effective date is '(.*)'$/, (date) => {
  (gucciWorld.getCurrentCockpit().getCurrentWidget(): ProductMoveWidget)
    .isDateCorrect(date);
});
Then(/Target account should be/, (table) => {
  const currentWidgetName = gucciWorld.getCurrentCockpit()
    .getCurrentWidget()
    .getName();
  switch (currentWidgetName) {
    case 'Product Move':
      (gucciWorld.getCurrentCockpit().getCurrentWidget(): ProductMoveWidget)
        .isTargetAccountCorrect(table);
      break;
    case 'Change Ownership':
      (gucciWorld.getCurrentCockpit().getCurrentWidget(): ChangeOwnershipWidget)
        .isTargetAccountCorrect(table);
      break;
    default:
      throw new Error(`Unsupported widget. Name: ${currentWidgetName}`);
  }
});
Then(/The following products should be selected/, (table) => {
  (gucciWorld.getCurrentCockpit().getCurrentWidget(): ProductMoveWidget)
    .isSelectedAccountsCorrect(table);
});
Then(/latest business transaction's info is displayed in new tab/, (table: Object) => {
  (gucciWorld
    .getCurrentCockpit()
    .getBusinessTransactionHistoryWidget(): BusinessTransactionHistoryWidget)
    .isInfoDisplayed(table);
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
Then(/'(.*)' message should be displayed/, (message: string) => {
  (gucciWorld
    .getCurrentCockpit()
    .getBusinessTransactionHistoryWidget(): BusinessTransactionHistoryWidget)
    .isMessageDisplayed(message);
});
Then(/business transaction's details are displayed in new tab/, (table: Object) => {
  (gucciWorld
    .getCurrentCockpit()
    .getBusinessTransactionHistoryWidget()
    .getCurrentDialog(): BusinessTransactionDetailsWidget)
    .isInfoDisplayed(table);
});
Then(/new tab with caption '(.*)' should be displayed/, (caption: string) => {
  (gucciWorld
    .getCurrentCockpit()
    .getBusinessTransactionHistoryWidget()
    .getCurrentDialog(): BusinessTransactionDetailsWidget)
    .isTabCaptionDisplayed(caption);
});
Then(/'(.*)' button should be active/, (buttonName) => {
  (gucciWorld.getCurrentCockpit().getCurrentWidget(): ProductMoveWidget)
    .isButtonActive(buttonName);
});
Then(/Target account should not be selected/, () => {
  (gucciWorld.getCurrentCockpit().getCurrentWidget(): ProductMoveWidget)
    .isTargetAccountNotSelected();
});
