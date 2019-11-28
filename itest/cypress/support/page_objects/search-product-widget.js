// @flow
import AbstractWidget from './common/abstract-widget';

class SearchProductWidget extends AbstractWidget {
  initElements() {
    this.elements = {
      'Search input': 'searchForm_searchInput',
      'Search run': 'searchForm_searchButton',
      Help: 'searchForm_helpButton',
      History: 'id_of_select',
      'Product State Filter': 'searchForm_isActiveCheckbox',
      Close: 'HelperPageClose',
      'Help Dialog': 'HelperPageWrapper',
      'Product Move': 'openPM',
      'Process Button': 'process-button',
    };
  }

  getName = () => 'Search Product';

  openHelp = () => {
    cy.get(`button#${this.elements.Help}`)
      .click();
  };

  isHelpOpened = () => {
    cy.get(`div.${this.elements['Help Dialog']}`)
      .should('exist');
    cy.get(`button.${this.elements.Close}`)
      .should('exist');
  };

  isErrorExists = (error: string) => {
    if (error === '') {
      cy.get('div[class="StatusMessage Error ProductItem"]>h3:contains(You have incorrect)')
        .should('not.exist');
    } else {
      cy.get('div[class="StatusMessage Error ProductItem"]>h3')
        .should('have.text', error);
    }
  };

  clearSearch = () => {
    cy.shortWait();
    cy.get(`input[id="${this.elements['Search input']}"]`)
      .clear();
    cy.shortWait();
  };

  search = (query: string) => {
    this.clearSearch();
    cy.get(`input[id="${this.elements['Search input']}"]`)
      .type(query);
    cy.get(`button[id="${this.elements['Search run']}"]`)
      .click();
    cy.mediumWait();
  };

  isSearchElementExists = (index: string, searchItem: string) => {
    cy.get(`select[id="id_of_select"]>option:eq(${Number(index) - 1})`)
      .should('have.text', searchItem);
  };

  isHistoryExists = (table: Object) => {
    let { length } = table.hashes();
    length = Number(length);
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < length; i++) {
      cy.get(`select[id="${this.elements.History}"]>option:eq(${i})`)
        .should('have.text', table.hashes()[i].Search);
    }
  };

  addAll = () => {
    cy.get('a[href="#select-all"]')
      .click();
  };

  addFollowingProducts = (table) => {
    table.hashes().forEach((row) => {
      cy.get(`div.ResultItemGroup:contains(${row.Product})>input.ProductItemCheckbox`).click();
    });
  };

  close = () => {
    cy.get('button[id="process-button"]')
      .click();
  };

  searchAndAdd = (query: string, table?: Object) => {
    this.search(query);
    if (table) {
      this.addFollowingProducts(table);
    } else {
      this.addAll();
    }
    this.close();
  };

  isHistoryContainsQuery = (index: string, query: string) => {
    cy.get(`select[id="id_of_select"]>option:eq(${Number(index) - 1})`)
      .should('have.text', query);
  };

  checkItemListExistence = () => {
    cy
      .get('a[name="productCountButton"]')
      .contains('...');
    cy
      .get('div#searchResult')
      .should('exist')
      .find('div.ScrollableListWrapper')
      .should('exist')
      .find('div[class="ResultItem CustomerItem"]')
      .find('div[class="ResultItem CustomerItem"]')
      .find('div[class="CustomerItemSelection"]');
  };

  selectCustomerItem = () => {
    cy
      .get('a[name="productCountButton"]')
      .contains('9')
      .click();
    // TODO: mikhailb: Should be removed when CCF-851 will be done
    cy.wait(30000);
  };

  checkProductListExistence = () => {
    cy
      .get('select#id_of_select')
      .find('option[value="0"]')
      .contains('billa && KDNR:103777118');
    cy
      .get('a[name="productCountButton"]')
      .click();
    cy
      .get(`button[id="${this.elements['Process Button']}"]`)
      .click();
  };

  checkItemAndProductListsExistence = () => {
    this.checkItemListExistence();
    this.selectCustomerItem();
    this.checkProductListExistence();
  }
}

export default SearchProductWidget;
