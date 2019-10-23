import { And } from 'cypress-cucumber-preprocessor/steps';
import { addProducts } from '../page_objects/product-move';

And(/add all products founded by '(.*)'/, (query) => { addProducts(query); });
And(/specify '(.*)' account founded by '(.*)' for (.*[A-Z]) group/, (account, query, group) => {});
