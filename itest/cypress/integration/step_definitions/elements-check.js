import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import {
  checkField, checkHistory, checkSearchElement, searchElement,
} from '../page_objects/elements-check';

Given(/^search '(.*)'/, (searchItem) => { searchElement(searchItem); });
When(/I search '(.*)'/, (searchItem) => { searchElement(searchItem); });
Then(/(^\d+) element should be '(.*)'/, (index, searchItem) => { checkSearchElement(index, searchItem); });
Then(/History should be/, (table) => { checkHistory(table); });
Then(/'(.*)' should be (active|disabled)( and (checked|unchecked)|)/, (field, status, state) => { checkField(field, status, state); });
