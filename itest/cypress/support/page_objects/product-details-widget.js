import AbstractWidget from './common/abstract-widget';

class ProductDetailsWidget extends AbstractWidget {
  initElements() {
    this.elements = {
      collapse: 'icon faCompressArrowsAlt fas',
      expand: 'icon faExpandArrowsAlt fas',
      'Search Loupe': 'search-loupe icon faSearch fas',
      'Search Field': 'search-input active',
      'Search Count': 'search-count active',
      'Highlighted Product': 'filteredProduct highlightedProduct',
      'Next Search Result': 'icon faChevronDown fax',
    };
  }

  getName = () => 'Product Details';

  isInfoCorrect = (productName: string, callNumber:string) => {
    cy.longWait();
    cy.get(`div[class="tab-dialog-button active"]>div:contains(${callNumber} - ${productName})`).should('exist');
    cy.get(`div.mashroom-portal-tabify-app-wrapper>div[class="mashroom-portal-app-wrapper portal-app-product-details hide-header"]:contains(${callNumber})`).should('be.visible');
  };

  clickOnStructureButton = (buttonName) => {
    cy.normalWait();
    cy.get(`span[class="${this.elements[buttonName]}"]`).click();
  };

  isStructureOpened = () => {
    cy.normalWait();
    cy.get('div.cp_tree-table_row[data-relindex="1"]').should('exist');
  };

  isStructureNotOpened = () => {
    cy.normalWait();
    cy.get('div.cp_tree-table_row[data-relindex="1"]').should('not.exist');
  };

  search = (query:string) => {
    cy.get(`span[class="${this.elements['Search Loupe']}"]`).click();
    cy.get(`input[class="${this.elements['Search Field']}"]`).type(query);
  };

  checkFoundedProducts = (number:string, table?:Object) => {
    const numberOfProducts = Number(number);
    if (numberOfProducts === 0) {
      cy.get(`span[class="${this.elements['Search Count']}"]`)
        .should('have.text', '0/0');
      cy.get(`span[class="${this.elements['Highlighted Product']}"]`).should('not.exist');
    } else {
      cy.get(`span[class="${this.elements['Search Count']}"]`)
        .should('have.text', `1/${number}`);
      for (let i = 0; i < numberOfProducts; i += 1) {
        cy.get(`span[class="${this.elements['Highlighted Product']}"]`)
          .should('have.text', table.hashes()[i].ProductName);
        const fff = cy.get(`span[class="${this.elements['Highlighted Product']}"]`).parents('.cp_tree-table_row')
          .find('div.cp_tree-table_cell:eq(1)>span').should('have.text', table.hashes()[i].SidID);
        console.log('aaaaaaaaaaaaaaaaaaaa', fff);
        cy.get(`i[class = "${this.elements['Next Search Result']}"]`).click();
      }
    }
  };
}

export default ProductDetailsWidget;
