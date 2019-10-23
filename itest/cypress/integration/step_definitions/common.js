import { And, Given } from 'cypress-cucumber-preprocessor/steps';
import { openCockpit, openLoginForm, openWidget } from '../page_objects/common';

Given(/^As anonymous user I open GUCCI Portal$/, () => { openLoginForm(); });
And(/open '(.*)' cockpit/, (cockpitName) => { openCockpit(cockpitName); });
And(/open '(.*)' widget/, (widgetName) => { openWidget(widgetName); });
