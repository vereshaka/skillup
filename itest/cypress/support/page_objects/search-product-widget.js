// @flow
import AbstractWidget from './common/abstract-widget';
import { wait } from '../../check-utils';

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
    };
  }

  getName = () => 'Search Product';

  openHelp = () => {
    cy.get(`button#${this.elements.Help}`).click();
  };

  isHelpOpened = () => {
    cy.get(`div.${this.elements['Help Dialog']}`).should('exist');
    cy.get(`button.${this.elements.Close}`).should('exist');
  };

  isErrorExists = (error:string) => {
    if (error === '') {
      cy.get('div[class="StatusMessage Error ProductItem"]>h3:contains(You have incorrect)').should('not.exist');
    } else {
      cy.get('div[class="StatusMessage Error ProductItem"]>h3').should('have.text', error);
    }
  };

  clearSearch = () => {
    cy.get(`input[id="${this.elements['Search input']}"]`).clear();
  };

  search = (query: string) => {
    this.clearSearch();
    cy.get(`input[id="${this.elements['Search input']}"]`).type(query);
    cy.get(`button[id="${this.elements['Search run']}"]`).click();
    cy.wait(wait.mediumWait);
  };

  isSearchElementExists = (index, searchItem) => {
    cy.get(`select[id="id_of_select"]>option:eq(${Number(index) - 1})`).should('have.text', searchItem);
  };

  isHistoryExists = (table) => {
    let { length } = table.hashes();
    length = Number(length);
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < length; i++) {
      cy.get(`select[id="${this.elements.History}"]>option:eq(${i})`).should('have.text', table.hashes()[i].Search);
    }
  };

  addAll = () => {
    cy.get('a[href="#select-all"]').click();
  };

  close = () => {
    cy.get('button[id="process-button"]').click();
  };

  searchAndAddAll = (query: string) => {
    this.search(query);
    this.addAll();
    this.close();
  };

  isHistoryContainsQuery = (index, query) => {
    cy.get(`select[id="id_of_select"]>option:eq(${Number(index) - 1})`).should('have.text', query);
  };

  checkItemListExistence = () => {
    cy
      .get('a[name="productCountButton"]')
      .contains('...');
    cy
      .get('div#searchResult')
      .should('have.length', '1')
      .find('div.ScrollableListWrapper')
      .should('have.length', '1')
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
      .get('button[name="process-button"]')
      .click();
  };

  checkItemAndProductListsExistence = () => {
    this.checkItemListExistence();
    this.selectCustomerItem();
    this.checkProductListExistence();
  }
}

export default SearchProductWidget;
