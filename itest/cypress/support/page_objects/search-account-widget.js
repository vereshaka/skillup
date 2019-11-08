// @flow
import AbstractWidget from './common/abstract-widget';

class SearchAccountWidget extends AbstractWidget {
  initElements() {
    this.elements = {
      'Search input': 'searchForm_searchInput',
      'Search run': 'searchForm_searchButton',
      'Search button': 'searchForm_searchButton',
      'Help button': 'searchForm_helpButton',
      History: 'id_of_select',
    };
  }

  getName = () => 'Add Account';

  clearSearch = () => {
    cy.get(`input[id="${this.elements['Search input']}"]`).clear();
  };

  search = (query:string) => {
    cy.get(`input[id="${this.elements['Search input']}"]`).type(query);
    cy.get(`button[id="${this.elements['Search run']}"]`).click();
    cy.mediumWait();
  };

  selectAccount =(account: string) => {
    cy.get(`div:contains(${account})>input[type="radio"]`).click();
    cy.get('button[id="process-button"]').click();
  };

  addAccount = (account: string, query: string) => {
    this.clearSearch();
    this.search(query);
    this.selectAccount(account);
  };

  isSearchDialogCorrectlyDisplayed = () => {
    this.clearSearch();
    cy.get(`input#${this.elements['Search input']}`).should('exist');
    cy.get(`button#${this.elements['Search button']}`).should('exist').and('be.disabled');
    cy.get(`button#${this.elements['Search button']}`).should('exist');
    cy.get(`select#${this.elements.History}`).should('exist');
  };

  isCustomerDisplayed = (id: string) => {
    cy
      .get('div#searchResult')
      .should('exist')
      .find(`div#customerItem${id}`)
      .should('exist')
      .find('div>div.CustomerPanelWrapper')
      .should('exist')
      .find('div>div>span')
      .contains(id);
  };

  areAccountsFound = () => {
    cy
      .get('div#searchResult')
      .should('exist')
      .find('div>div[class="ResultItem AccountItem"]')
      .should('have.length', 2);
  };

  searchAndCheck = (query: string) => {
    const customerId = query.replace(/^\D+/g, '');
    this.isSearchDialogCorrectlyDisplayed();
    this.search(query);
    this.isCustomerDisplayed(customerId);
    this.areAccountsFound();
  }
}

export default SearchAccountWidget;
