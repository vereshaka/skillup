import { When } from 'cypress-cucumber-preprocessor/steps';
import { login } from '../page_objects/portal-home';
import { openHelp, search } from '../page_objects/search-product';
import { openWidget } from '../page_objects/utils/portal-utils';

When(/I have try to login as (.*) with (.*) credential/,
  (username, type) => { login(username, type); });
When(/I try to search by '(.*)' query/, (query) => { search(query); });
When(/I search '(.*)'/, (query) => { search(query); });
When(/Click on Help Button/, () => { openHelp(); });
When(/^I open '([a-zA-Z ]*)' widget$/, (widgetName) => { openWidget(widgetName); });
