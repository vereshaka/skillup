import {
  And, Then, When,
} from 'cypress-cucumber-preprocessor/steps';
import {
  containsError, checkCockpit, isCockpitExist, login, isCockpitNotExist,
} from '../page_objects/login';


When(/I have try to login as (.*) with (.*) credential/,
  (username, type) => { login(username, type); });
Then('I should receive {string} message on login form',
  (errorMessage) => { containsError(errorMessage); });
Then('I should see {string} Cockpit',
  (mainTitle) => { checkCockpit(mainTitle); });
And(/'(.*)' is (not |)available/,
  (cockpitName, rights) => {
    if (rights === 'not ') {
      isCockpitNotExist(cockpitName);
    } if (rights === '') {
      isCockpitExist(cockpitName);
    }
  });
