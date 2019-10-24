import { And, Given, When } from 'cypress-cucumber-preprocessor/steps';
import { openCockpit, openLoginForm, openWidget } from '../page_objects/common';
import { login } from '../page_objects/login';

Given(/^As anonymous user I open GUCCI Portal$/, () => { openLoginForm(); });
And(/open '(.*)' cockpit/, (cockpitName) => { openCockpit(cockpitName); });
And(/^open '([a-zA-Z ]*)' widget$/, (widgetName) => { openWidget(widgetName); });
When(/^I open '([a-zA-Z ]*)' widget$/, (widgetName) => { openWidget(widgetName); });
And(/open '([a-zA-Z ]*)' widget from '([a-zA-Z ]*)'/, (widgetName, cockpitName) => { openCockpit(cockpitName); openWidget(widgetName); });
// eslint-disable-next-line no-unused-vars
Given(/As (.*) with permission '(.*)'/, (username, permission) => { openLoginForm(); login(username, 'correct'); });
