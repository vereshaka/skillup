 import { And, Given, Then, When } from 'cypress-cucumber-preprocessor/steps';
 import {containsError, checkCockpit, isCockpitExist, login, isCockpitNotExist} from "../page_objects/login";


  When(/I have try to login as (.*) with (.*) credential/,
    function (username, type) {login(username, type)});
  Then('I should receive {string} message on login form',
    function (errorMessage) {containsError(errorMessage)});
  Then('I should see {string} Cockpit',
    function (mainTitle) {checkCockpit(mainTitle)});
  And(/'(.*)' is (not |)available/,
    function (cockpitName, rights) {
   if(rights === 'not '){
    isCockpitNotExist(cockpitName)
    } if (rights === '') {
     isCockpitExist(cockpitName)}
  });
