 import { And, Given, Then, When } from 'cypress-cucumber-preprocessor/steps';
 import {checkLogin, checkWelcomeCockpit, cockpitExistence, login} from "../page_objects/login";


  When('I have try to login as {string} with {string} credential',
    function (username, type) {login(username, type)});
  Then('I should receive {string} message on login form',
    function (errorMessage) {checkLogin(errorMessage)});
  Then('I should see {string} Cockpit',
    function (mainTitle) {checkWelcomeCockpit(mainTitle)});
  And('{string} is not available',
    function (cockpitName) {cockpitExistence(cockpitName)});