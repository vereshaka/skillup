import { When } from 'cypress-cucumber-preprocessor/steps';
import { login } from '../page_objects/portal-home';
import { openHelp, search } from '../page_objects/search-product';
import { openCockpitPage, openWidget } from '../page_objects/utils/portal-utils';

When(/I have try to login as (.*) with (.*) credential/,
  (username, type) => { login(username, type); });
When(/I search '(.*)'/, (query) => { search(query); });
When(/Click on Help Button/, () => { openHelp(); });
When(/^I open '([a-zA-Z ]*)' widget$/, (widgetName) => { openWidget(widgetName); });
When(/^switch to (.*) Cockpit$/, (cockpitName) => { openCockpitPage(cockpitName); });
