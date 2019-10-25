import { When, Then } from 'cypress-cucumber-preprocessor/steps';
import {
  checkError, checkQuery,
} from '../page_objects/query-validation';

When(/I try to search by '(.*)' query/, (query) => { checkQuery(query); });
Then(/^'(.*)' should be displayed$/, (error) => { checkError(error); });
