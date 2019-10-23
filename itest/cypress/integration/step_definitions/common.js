import { Given } from 'cypress-cucumber-preprocessor/steps';
import { openLoginForm } from '../page_objects/common';

Given(/^As anonymous user I open GUCCI Portal$/, () => { openLoginForm(); });
