import {
  Given, When, Then, And,
} from 'cypress-cucumber-preprocessor/steps';
import {
  buttonClick,
  checkField, checkHelpOpened, checkHistory, checkSearchElement, searchElement,
} from '../page_objects/elements-check';

Given(/^search '(.*)'/, (searchItem) => { searchElement(searchItem); });
When(/I search '(.*)'/, (searchItem) => { searchElement(searchItem); });
Then(/(^\d+) element should be '(.*)'/, (index, searchItem) => { checkSearchElement(index, searchItem); });
Then(/History should be/, (table) => { checkHistory(table); });
Then(/'(.*)' should be (active|disabled)( and (checked|unchecked)|)/, (field, status, state) => { checkField(field, status, state); });
And(/Click on '(.*)'/, (buttonName) => { buttonClick(buttonName); });
Then(/'(.*)' and '(.*)' should be opened/, (wrapperName, buttonName) => { checkHelpOpened(wrapperName, buttonName); });
