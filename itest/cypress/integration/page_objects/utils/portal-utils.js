import { login } from '../portal-home';
import { getPortalURL } from './config';

export const openWidget = (widgetName) => {
  cy.wait(200);
  cy.get('body').then(($body) => {
    if ($body.find(`span:contains(${widgetName})`).length) {
      cy.get(`span:contains(${widgetName})`).click();
    } if (widgetName === 'Search Product') {
      cy.get('span[class="Icon faPlusSquare fa2x AddProduct "]').click();
    }
  });
};

export const openLoginForm = () => {
  cy.visit(getPortalURL());
  cy.wait(200);
  cy.get('body').then(($body) => {
    if ($body.find('div.logout').length) {
      cy.get('a[href="/portal/_/api/logout"]').click();
    }
  });
};

export const openCockpit = (cockpitName) => {
  cy.get('div.menu-drawer').click();
  cy.get(`a:contains(${cockpitName})`).click();
  cy.wait(200);
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
