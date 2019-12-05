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
    cy.longWait();
  };

  selectAccount =(account: string) => {
    cy.get('div[class="StatusMessage Error ProductItem"]').should('not.exist');
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

  areAccountsFounded = (table: Object) => {
    const { length } = table.hashes();
    cy
      .get('div#searchResult')
      .should('exist')
      .find('div>div[class="ResultItem AccountItem"]')
      .should('have.length', length);
    for (let i = 0; i < length; i += 1) {
      cy
        .get(`div[class="ResultItem AccountItem"]:eq(${i})`)
        .find('div[class="ResultItemGroup"]>div>span:eq(0)')
        .should('have.text', table.hashes()[i].AccountNumber);
      cy
        .get(`div[class="ResultItem AccountItem"]:eq(${i})`)
        .find('div[class="ResultItemGroup"]>div>div>span:eq(0)')
        .should('have.text', `IBAN:${table.hashes()[i].IBAN}`);
    }
  };

  searchAndCheck = (query: string, table: Object) => {
    this.isSearchDialogCorrectlyDisplayed();
    this.search(query);
    this.areAccountsFounded(table);
  }
}

export default SearchAccountWidget;
