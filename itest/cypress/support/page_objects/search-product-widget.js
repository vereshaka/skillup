// @flow
import AbstractWidget from './common/abstract-widget';
import {
  elements,
  wait,
} from './search-product';

class SearchProductWidget extends AbstractWidget {
  createElements = (): Map<string, string> => ({
    '': '',
  });

  getName = () => 'Search Product';


  isHistoryExists = (table) => {
    let { length } = table.hashes();
    length = Number(length);
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < length; i++) {
      cy.get(`select[id="${elements.History}"]>option:eq(${i})`).should('have.text', table.hashes()[i].Search);
    }
  };

  isHelpOpened = () => {
    cy.get(`div.${elements['Help Dialog']}`).should('exist');
    cy.get(`button.${elements.Close}`).should('exist');
  };

  isErrorExists = (error) => {
    if (error === '') {
      cy.get('div[class="StatusMessage Error ProductItem"]>h3:contains(You have incorrect)').should('not.exist');
    } else {
      cy.get('div[class="StatusMessage Error ProductItem"]>h3').should('have.text', error);
    }
  };

  clearSearch = () => {
    cy.get(`input[id="${elements['Search input']}"]`).clear();
  };

  search = (query: string) => {
    this.clearSearch();
    cy.get(`input[id="${elements['Search input']}"]`).type(query);
    cy.get(`button[id="${elements['Search run']}"]`).click();
    cy.wait(wait.mediumWait);
    this.isHistoryContainsQuery(1, query);
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

  openHelp = () => {
    cy.get(`button#${elements.Help}`).click();
  };

  isHistoryContainsQuery = (index, query) => {
    cy.get(`select[id="id_of_select"]>option:eq(${Number(index) - 1})`).should('have.text', query);
  };
}

export default SearchProductWidget;
