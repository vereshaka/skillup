import { login } from '../portal-home';
import { getPortalURL } from './config';
import {
  elements,
  wait,
} from '../search-product';

export const openWidget = (widgetName) => {
  cy.wait(wait.shortWait);
  cy.get('body').then(($body) => {
    if ($body.find(`span:contains(${widgetName})`).length) {
      cy.get(`button[id=${elements[widgetName]}]`)
        .click();
    } if (widgetName === 'Search Product') {
      // TODO: ivanp: Should be refactored when CCF-840  will be done
      cy.get('span[class="Icon faPlusSquare fa2x AddProduct "]').click();
    }
  });
};

export const openLoginForm = () => {
  cy.visit(getPortalURL());
  cy.wait(wait.shortWait);
  cy.get('body').then(($body) => {
    if ($body.find('div.logout').length) {
      cy.get('a[href="/portal/_/api/logout"]').click();
    }
  });
};

export const openCockpit = (cockpitName) => {
  cy.get('div.menu-drawer').click();
  cy.get(`a:contains(${cockpitName})`).click();
  cy.wait(wait.shortWait);
};

export const openCockpitPage = (username, cockpitName) => {
  login(username, 'correct');
  cy
    .get('div[title="Navigation"]')
    .click();
  cy
    .get(`a[href="/portal/web/${cockpitName.toLowerCase()}"]`)
    .click();
};
