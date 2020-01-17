// @flow
import type { user } from './types/user';
import {
  getPassword,
} from '../utils/config';
import AbstractCockpit from './abstract-cockpit';
import HfhsCockpit from '../hfhs-cockpit';
import GucciWelcomeCockpit from '../gucci-welcome-cockpit';

class GucciWorld {
  user: user;

  cockpit: AbstractCockpit;

  visitPortal = () => {
    cy.visit({
      method: 'GET',
      url: Cypress.env('portalUrl'),
      qs: {
        nosso: '1',
      },
    });
  };

  getPasswordFor = (username: string): string => username;

  openLoginForm() {
    this.visitPortal();
    cy.shortWait();
    this.logout();
    cy.shortWait();
  }

  fillLoginForm = (username: string, withCorrectPassword: boolean) => {
    cy.get('input[id=\'username\']')
      .type(username);
    if (withCorrectPassword) {
      cy.get('input[id=\'password\']')
        .type(getPassword(username));
    } else {
      cy.get('input[id=\'password\']')
        .type(`${username}123`);
    }
    cy.get('input[value="Login"]')
      .click();
  };

  login(username: string, withCorrectPassword: boolean = true) {
    this.openLoginForm();
    this.fillLoginForm(username, withCorrectPassword);
    cy.get('body').then(($body) => {
      if ($body.find('input[value="Log In"]').length) {
        this.fillLoginForm(username, withCorrectPassword);
      }
    });
    this.user = {
      username,
    };
  }

  hasLoginError = (errorMessage: string) => {
    // TODO: yevgenyv: check that login form exists
    cy.get('span')
      .should('have.text', errorMessage);
  };

  logout() {
    cy.shortWait();
    cy.get('body')
      .then(($body) => {
        if ($body.find('div.logout').length) {
          cy.get('a[href="/portal/_/api/logout"]')
            .click();
        } else {
          // TODO: yevgenyv: raise an error if user not logged in
        }
      });
    this.user = undefined;
  }

  getCockpitByName = (name: string): AbstractCockpit => {
    switch (name) {
      case 'HFHS Cockpit':
        return new HfhsCockpit();
      case 'Welcome':
        return new GucciWelcomeCockpit();
      default:
        throw new Error(`Unsupported cockpit. Name: ${name}`);
    }
  };

  openCockpit(name: string) {
    if (this.cockpit) {
      this.cockpit.close();
    }
    this.cockpit = this.getCockpitByName(name);
    this.cockpit.open();
  }

  isCurrentCockpit(name: string) {
    this.getCockpitByName(name)
      .isOpen();
  }

  isCockpitExist = (cockpitName: string) => {
    cy.get('ul>li')
      .find(`a:contains(${cockpitName})`)
      .should('have.text', cockpitName);
  };

  isCockpitNotExist = (cockpitName: string) => {
    cy.get('ul>li>a')
      .each(($el) => {
        cy.get($el)
          .should('not.have.text', cockpitName);
      });
  };

  getCurrentCockpit() {
    if (this.cockpit) {
      return this.cockpit;
    }
    throw new Error('No selected cockpit');
  }

  reset() {
    this.user = undefined;
    this.cockpit = undefined;
  }
}

export default GucciWorld;
