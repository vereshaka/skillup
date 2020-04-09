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
    cy.waitUntil(() => cy.get('body').then(($body) => $body.find('div[class="_loading_overlay_wrapper _loading_overlay_wrapper--active css-79elbk"]').length === 0), {
      errorMsg: 'Input disable',
      timeout: 30000,
      interval: 1000,
    });
    cy.get(`input[id="${this.elements['Search input']}"]`).clear();
  };

  search = (query:string) => {
    cy.get(`input[id="${this.elements['Search input']}"]`).type(query);
    cy.get(`button[id="${this.elements['Search run']}"]`).click();
  };

  selectAccount =(account: string) => {
    cy.waitUntil(() => cy.get('body').then(($body) => $body.find('div[class="_loading_overlay_wrapper _loading_overlay_wrapper--active css-79elbk"]').length === 0), {
      errorMsg: 'Accounts not loaded',
      timeout: 30000,
      interval: 1000,
    });
    cy.get('div[class="StatusMessage Error ProductItem"]').should('not.exist');
    cy.get(`div:contains(${account})>input[type="radio"]`).click();
    cy.get('button[id="process-button"]').click();
  };

  addAccount = (account: string, query: string) => {
    cy.waitUntil(() => cy.get('body').then(($body) => $body.find(`input[id="${this.elements['Search input']}"]`).length), {
      errorMsg: `${this.elements['Search input']} not loaded`,
      timeout: 30000,
      interval: 1000,
    });
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
    cy.waitUntil(() => cy.get('body').then(($body) => $body.find('div[class="_loading_overlay_wrapper _loading_overlay_wrapper--active css-79elbk"]').length === 0), {
      errorMsg: 'Accounts not loaded',
      timeout: 30000,
      interval: 1000,
    });
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

  searchAndCheck = (query: string, table?: Object) => {
    cy.waitUntil(() => cy.get('body').then(($body) => $body.find(`input[id="${this.elements['Search input']}"]`).length), {
      errorMsg: `${this.elements['Search input']} not loaded`,
      timeout: 30000,
      interval: 1000,
    });
    this.isSearchDialogCorrectlyDisplayed();
    this.search(query);
    if (table) {
      this.areAccountsFounded(table);
    }
  };

  checkUrl = (kums) => {
    cy.waitUntil(() => cy.get('body').then(($body) => $body.find('div[class="_loading_overlay_wrapper _loading_overlay_wrapper--active css-79elbk"]').length === 0), {
      errorMsg: 'Accounts not loaded',
      timeout: 30000,
      interval: 1000,
    });
    cy.get('a[name="linkForCreateAccount"]').invoke('attr', 'href').then((href) => {
      // eslint-disable-next-line no-undef
      expect(href).to.equal(`${Cypress.env('createAccountLink')}${kums}`);
    });
  };
}

export default SearchAccountWidget;
