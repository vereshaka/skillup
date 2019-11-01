// @flow
import AbstractWidget from './common/abstract-widget';
import { wait } from '../../check-utils';

class AddAccountWidget extends AbstractWidget {
  initElements() {
    this.elements = {
      'Search input': 'searchForm_searchInput',
      'Search run': 'searchForm_searchButton',
    };
  }

  getName = () => 'Add Account';

  clearSearch = () => {
    cy.get(`input[id="${this.elements['Search input']}"]`).clear();
  };

  // eslint-disable-next-line no-unused-vars
  addAccount = (account, query, group) => {
    this.clearSearch();
    cy.get(`input[id="${this.elements['Search input']}"]`).type(query);
    cy.get(`button[id="${this.elements['Search run']}"]`).click();
    cy.wait(wait.normalWait);
    cy.get(`div:contains(${account})>input[type="radio"]`).click();
    // TODO: yevgenyv: add check that selected account has specified group
    cy.get('button[id="process-button"]').click();
  };
}

export default AddAccountWidget;
