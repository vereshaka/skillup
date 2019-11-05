// @flow
import AbstractWidget from './common/abstract-widget';

class SearchAccountWidget extends AbstractWidget {
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
  addAccount = (account: string, query: string) => {
    this.clearSearch();
    cy.get(`input[id="${this.elements['Search input']}"]`).type(query);
    cy.get(`button[id="${this.elements['Search run']}"]`).click();
    cy.mediumWait();
    cy.get(`div:contains(${account})>input[type="radio"]`).click();
    cy.get('button[id="process-button"]').click();
  };
}

export default SearchAccountWidget;
