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
      cy.get(`div[class="StatusMessage Error ProductItem"]>h3:contains(${error})`)
        .should('exist');
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
    cy.longWait();
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
      cy.get(`div.ResultItemGroup:contains(${row.Product} ${row.Subscription})>input.ProductItemCheckbox`).click();
    });
  };

  close = () => {
    cy.get('button[id="process-button"]')
      .click();
  };

  searchAndAdd = (query: string, table?: Object) => {
    this.search(query);
    cy.get('div[class="StatusMessage Error ProductItem"]').should('not.exist');
    if (table) {
      this.addFollowingProducts(table);
    } else {
      this.addAll();
    }
    this.close();
  };

  checkCustomerListExistence = () => {
    cy.get('a[href="#select-all"]').should('not.exist');
  };

  selectCustomer = (customerName) => {
    cy
      .get(`div[class="ResultItem CustomerItem"]:contains(${customerName})`)
      .find('a[name="productCountButton"]')
      .click();
    // TODO: mikhailb: Should be removed when CCF-851 will be done
    cy.wait(30000);
  };

  checkProductsListExistence = () => {
    cy.get('a[href="#select-all"]').should('exist');
  };

  checkCustomersAndProductListsExistence = (customerName?:string) => {
    if (customerName) {
      this.checkCustomerListExistence();
      this.selectCustomer(customerName);
    }
    this.checkProductsListExistence();
    this.addAll();
    cy.mediumWait();
    this.close();
  };

  checkContractCapable = (value: string) => {
    cy.get('div.CustomerPanelWrapper>div>div:eq(1)>span:eq(2)').should('have.text', value);
  };

  checkProvisionalCustomer = (value: string) => {
    cy.get('div.CustomerPanelWrapper>div>div:eq(1)>span:eq(4)').should('have.text', value);
  };

  checkStatus = (value: string) => {
    cy.log(`Status ${value}. Not supported`);
  };

  productsLength = (numberOfProducts: number) => {
    cy.get('body').then(($body) => {
      cy.get($body).find('div[class="ResultItem ProductItem Active"]').should('have.length', numberOfProducts);
    });
  };

  addAllProducts = () => {
    cy.mediumWait();
    this.addAll();
    cy.mediumWait();
    this.close();
  };
}

export default SearchProductWidget;
