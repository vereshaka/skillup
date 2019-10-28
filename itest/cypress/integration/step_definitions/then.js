import {
  checkCockpit, containsError, isCockpitExist, isCockpitNotExist,
} from '../page_objects/portal-home';
import * as BusinessTransactionHistory from '../page_objects/business_transaction_history';
import {
  checkField,
  isErrorExists,
  isHelpOpened,
  isHistoryExists,
  isSearchElementExists,
} from '../page_objects/search-product';
import { checkButtonExistence } from '../../check-utils';
import { Then, When } from 'cypress-cucumber-preprocessor/steps';
import { openWidget } from '../page_objects/hfhs-cockpit';
import { checkItemListExistence, search } from '../page_objects/multiple_search';

When(/^I try to search by '(.*)' query$/,
  (query) => { search(query); });

Then(/^I should see item list$/,
  () => { checkItemListExistence(); });


Then('I should receive {string} message on login form',
  (errorMessage) => { containsError(errorMessage); });
Then('I should see {string} Cockpit',
  (mainTitle) => { checkCockpit(mainTitle); });
Then(/'(.*)' is (not |)available/,
  (cockpitName, rights) => {
    if (rights === 'not ') {
      isCockpitNotExist(cockpitName);
    } if (rights === '') {
      isCockpitExist(cockpitName);
    }
  });
Then(/^I should see active '(.*)' button$/,
  (buttonName) => { checkButtonExistence(buttonName); });

Then(/^business transaction widget is displayed$/,
  () => { BusinessTransactionHistory.isWidgetExists(); });

Then(/transaction list mode group is (not |)presented/,
  (existence) => {
    if (existence === 'not ') {
      BusinessTransactionHistory.isAdminGroupNotExist();
    } if (existence === '') {
      BusinessTransactionHistory.isAdminGroupExist();
    }
  });

Then(/^I open '(.*)' Widget from toolbar$/,
  (widgetName) => { openWidget(widgetName); });
Then(/^'(.*)' should be displayed$/, (error) => { isErrorExists(error); });
Then(/(^\d+) element should be '(.*)'/, (index, searchItem) => { isSearchElementExists(index, searchItem); });
Then(/History should be/, (table) => { isHistoryExists(table); });
Then(/'(.*)' should be (active|disabled)( and (checked|unchecked)|)/, (field, status, state) => { checkField(field, status, state); });
Then(/Help Page and Close Button should be exist/, (wrapperName, buttonName) => { isHelpOpened(wrapperName, buttonName); });
