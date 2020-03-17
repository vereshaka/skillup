// @flow
import { Then } from 'cypress-cucumber-preprocessor/steps';
import gucciWorld from './hooks';
import SearchProductWidget from '../page_objects/search-product-widget';
import ProductMoveWidget from '../page_objects/product-move-widget';
import BusinessTransactionHistoryWidget from '../page_objects/business-transaction-history-widget';
import HfhsCockpit from '../page_objects/hfhs-cockpit';
import BusinessTransactionDetailsWidget from '../page_objects/business-transaction-details-widget';
import ChangeOwnershipWidget from '../page_objects/change-ownership-widget';
import ProductDetailsWidget from '../page_objects/product-details-widget';
import ChangeOwnershipBySuccessorWidget from '../page_objects/change-ownership-by-successor-widget';

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
Then(/^I should see active '(Product Move|Change Ownership|Business Transaction History)' button$/,
  (buttonName) => {
    (gucciWorld.getCurrentCockpit(): HfhsCockpit)
      .checkButtonExistence(buttonName);
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
    case 'Change Ownership by successor':
      (gucciWorld.getCurrentCockpit().getCurrentWidget(): ChangeOwnershipBySuccessorWidget)
        .isSelectedAccountsCorrect(table);
      break;
    default:
      throw new Error(`Unsupported widget. Name: ${currentWidgetName}`);
  }
});
Then(/Effective date is '(.*)'$/, (date) => {
  const currentWidgetName = gucciWorld.getCurrentCockpit()
    .getCurrentWidget()
    .getName();
  switch (currentWidgetName) {
    case 'Product Move':
      (gucciWorld.getCurrentCockpit().getCurrentWidget(): ProductMoveWidget)
        .isDateCorrect(date);
      break;
    case 'Change Ownership':
      (gucciWorld.getCurrentCockpit().getCurrentWidget(): ChangeOwnershipWidget)
        .isDateCorrect(date);
      break;
    case 'Change Ownership by successor':
      (gucciWorld.getCurrentCockpit().getCurrentWidget(): ChangeOwnershipBySuccessorWidget)
        .isDateCorrect(date);
      break;
    default:
      throw new Error(`Unsupported widget. Name: ${currentWidgetName}`);
  }
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
    case 'Change Ownership by successor':
      (gucciWorld.getCurrentCockpit().getCurrentWidget(): ChangeOwnershipBySuccessorWidget)
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
Then(/I should see '(.*)' with '(.*)' call number product details/, (productName, callNumber) => {
  (gucciWorld.getCurrentCockpit().getCurrentWidget().getCurrentWidget(): ProductDetailsWidget)
    .isInfoCorrect(productName, callNumber);
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
Then(/Product structure should (|not )be displayed/, (displayStatus) => {
  if (!displayStatus) {
    (gucciWorld.getCurrentCockpit()
      .getCurrentWidget()
      .getCurrentWidget(): ProductDetailsWidget)
      .isStructureOpened();
  } else {
    (gucciWorld.getCurrentCockpit()
      .getCurrentWidget()
      .getCurrentWidget(): ProductDetailsWidget)
      .isStructureNotOpened();
  }
});
Then(/(^\d+) products should be highlighted/, (numberOfProducts:number, table) => {
  (gucciWorld.getCurrentCockpit().getCurrentWidget().getCurrentWidget(): ProductDetailsWidget)
    .checkFoundedProducts(numberOfProducts, table);
});
Then(/(Price|Terms|Characteristic) info should be presented/, (tab, table) => {
  switch (tab) {
    case 'Price':
      (gucciWorld.getCurrentCockpit().getCurrentWidget().getCurrentWidget(): ProductDetailsWidget)
        .isPriceInfoExist(tab, table);
      break;
    case 'Terms':
      throw new Error('Implement Me. isTermsInfoExist(tab, table)');
    case 'Characteristic':
      (gucciWorld.getCurrentCockpit().getCurrentWidget().getCurrentWidget(): ProductDetailsWidget)
        .isCharacteristicInfoExist(tab, table);
      break;
    default:
      throw new Error(`Unsupported tab. Name: ${tab}`);
  }
});
Then(/'(Product Move|Change Ownership|Change Ownership by successor|Business Transaction History)' widget should exist/, () => {
  const currentWidgetName = gucciWorld.getCurrentCockpit()
    .getCurrentWidget()
    .getName();
  switch (currentWidgetName) {
    case 'Product Move':
      (gucciWorld.getCurrentCockpit().getCurrentWidget(): ProductMoveWidget)
        .isWidgetExist();
      break;
    case 'Change Ownership':
      (gucciWorld.getCurrentCockpit().getCurrentWidget(): ChangeOwnershipWidget)
        .isWidgetExist();
      break;
    case 'Business Transaction History':
      (gucciWorld.getCurrentCockpit().getCurrentWidget(): BusinessTransactionHistoryWidget)
        .isWidgetExist();
      break;
    case 'Change Ownership by successor':
      (gucciWorld.getCurrentCockpit().getCurrentWidget(): ChangeOwnershipBySuccessorWidget)
        .isWidgetExist();
      break;
    default:
      throw new Error(`Unsupported widget. Name: ${currentWidgetName}`);
  }
});
Then(/Search Product works/, () => {
  (gucciWorld.getCurrentCockpit().getCurrentWidget(): ProductMoveWidget)
    .openDialog('Add Product');
  (gucciWorld.getCurrentCockpit().getCurrentWidget().getCurrentDialog(): SearchProductWidget)
    .isSearchProductWorks();
});
Then(/Business transaction details widget should exist/, () => {
  (gucciWorld
    .getCurrentCockpit()
    .getBusinessTransactionHistoryWidget()
    .getCurrentDialog(): BusinessTransactionDetailsWidget)
    .isWidgetExist();
});
Then(/Transaction fee should be '(.*)'/, (transactionFee) => {
  const currentWidgetName = gucciWorld.getCurrentCockpit()
    .getCurrentWidget()
    .getName();
  switch (currentWidgetName) {
    case 'Change Ownership':
      (gucciWorld.getCurrentCockpit().getCurrentWidget(): ChangeOwnershipWidget)
        .isTransactionFeeCorrect(transactionFee);
      break;
    case 'Change Ownership by successor':
      (gucciWorld.getCurrentCockpit().getCurrentWidget(): ChangeOwnershipBySuccessorWidget)
        .isTransactionFeeCorrect(transactionFee);
      break;
    default:
      throw new Error(`Unsupported widget. Name: ${currentWidgetName}`);
  }
});
Then(/Legal Representative info should be displayed/, (table) => {
  (gucciWorld.getCurrentCockpit().getCurrentWidget().getCurrentDialog(): SearchProductWidget)
    .isLegalRepresentativeDisplayed(table);
});
Then(/I should see that product '(transferable|not transferable|conditionally transferable)'/, (transferability) => {
  const currentWidgetName = gucciWorld.getCurrentCockpit()
    .getCurrentWidget()
    .getName();
  switch (currentWidgetName) {
    case 'Change Ownership':
      (gucciWorld.getCurrentCockpit().getCurrentWidget(): ChangeOwnershipWidget)
        .isProductTransferable(transferability);
      break;
    case 'Change Ownership by successor':
      (gucciWorld.getCurrentCockpit().getCurrentWidget(): ChangeOwnershipBySuccessorWidget)
        .isProductTransferable(transferability);
      break;
    default:
      throw new Error(`Unsupported widget. Name: ${currentWidgetName}`);
  }
});
Then(/Select account button '(active|disabled)'/, (isActive) => {
  const currentWidgetName = gucciWorld.getCurrentCockpit()
    .getCurrentWidget()
    .getName();
  switch (currentWidgetName) {
    case 'Change Ownership':
      (gucciWorld.getCurrentCockpit().getCurrentWidget(): ChangeOwnershipWidget)
        .isSelectAccountActive(isActive);
      break;
    case 'Change Ownership by successor':
      (gucciWorld.getCurrentCockpit().getCurrentWidget(): ChangeOwnershipBySuccessorWidget)
        .isSelectAccountActive(isActive);
      break;
    default:
      throw new Error(`Unsupported widget. Name: ${currentWidgetName}`);
  }
});
Then(/I should see following '(products|parties)'/, (queryType, table) => {
  switch (queryType) {
    case 'products':
      (gucciWorld.getCurrentCockpit().getCurrentWidget().getCurrentDialog(): SearchProductWidget)
        .isProductsExist(table);
      break;
    case 'parties':
      (gucciWorld.getCurrentCockpit().getCurrentWidget().getCurrentDialog(): SearchProductWidget)
        .isPartiesExist(table);
      break;
    default:
      throw new Error(`Unsupported query type. Name: ${queryType}`);
  }
});
Then(/Execution Date warning should exist/, () => {
  (gucciWorld.getCurrentCockpit().getCurrentWidget(): ChangeOwnershipWidget)
    .isWarningExist();
});
