import AbstractWidget from './common/abstract-widget';

class ProductDetailsWidget extends AbstractWidget {
  initElements() {
    this.elements = {
      collapse: 'productDetailsCollapseAllButton',
      expand: 'productDetailsExpandAllButton',
      'Search Loupe': 'productDetailsSearchButton',
      'Search Field': 'productDetailsSearchField',
      'Search Count': 'productDetailsSearchCountLabel',
      'Highlighted Product': 'filteredProduct highlightedProduct',
      'Next Search Result': 'productDetailsNextSearchItemButton',
    };
  }

  getName = () => 'Product Details';

  isInfoCorrect = (productName: string, callNumber: string) => {
    cy.longWait();
    cy.get(`div[class="tab-dialog-button active"]>div:contains(${callNumber} - ${productName})`)
      .should('exist');
    cy.get(`div.mashroom-portal-tabify-app-wrapper>div[class="mashroom-portal-app-wrapper portal-app-product-details hide-header"]:contains(${callNumber})`)
      .should('be.visible');
  };

  clickOnStructureButton = (buttonName) => {
    cy.normalWait();
    cy.get(`span#${this.elements[buttonName]}`)
      .click();
  };

  isStructureOpened = () => {
    cy.normalWait();
    cy.get('div.cp_tree-table_row[data-relindex="1"]')
      .should('exist');
  };

  isStructureNotOpened = () => {
    cy.normalWait();
    cy.get('div.cp_tree-table_row[data-relindex="1"]')
      .should('not.exist');
  };

  search = (query: string) => {
    cy.get(`span#${this.elements['Search Loupe']}`)
      .click();
    cy.get(`input#${this.elements['Search Field']}`)
      .type(query);
  };

  checkFoundedProducts = (number: string, table?: Object) => {
    const numberOfProducts = Number(number);
    if (numberOfProducts === 0) {
      cy.get(`span#${this.elements['Search Count']}`)
        .should('have.text', '0/0');
      cy.get(`span[class="${this.elements['Highlighted Product']}"]`)
        .should('not.exist');
    } else {
      cy.get(`span#${this.elements['Search Count']}`)
        .should('have.text', `1/${number}`);
      for (let i = 0; i < numberOfProducts; i += 1) {
        cy.get(`span[class="${this.elements['Highlighted Product']}"]`)
          .should('have.text', table.hashes()[i].ProductName);
        cy.get(`span[class="${this.elements['Highlighted Product']}"]`)
          .parents('.cp_tree-table_row')
          .find('div.cp_tree-table_cell:eq(1)>span')
          .should('have.text', table.hashes()[i].SidID);
        if (i !== numberOfProducts - 1) {
          cy.get(`button#${this.elements['Next Search Result']}`)
            .click();
        }
      }
    }
  };

  openSubproductInfo = (subproductName) => {
    cy.get(`span:contains(${subproductName})`)
      .click({ force: true });
  };

  isPriceInfoExist = (tab, table) => {
    cy.get('div.gucci-common-tab-dialog-header')
      .find(`span:contains(${tab})`)
      .click();
    table.hashes()
      .forEach((row) => {
        cy.get('div.item>div.item-price:eq(0)')
          .contains(row.Name)
          .should('exist');
        cy.get('div.item>div.item-price:eq(1)')
          .contains(row.Value)
          .should('exist');
        cy.get('div.item>div.item-price:eq(2)')
          .contains(row.Frequency)
          .should('exist');
        cy.get('div.item>div.item-price:eq(3)>span:eq(0)')
          .contains(row.BasePrice)
          .should('exist');
        cy.get('div.item>div.item-price:eq(3)>span:eq(1)')
          .contains(row.Price)
          .should('exist');
        cy.get('div.item>div.item-price:eq(3)>span:eq(2)')
          .contains(row.TaxRate)
          .should('exist');
      });
  };

  isCharacteristicInfoExist = (tab, table) => {
    let { length } = table.hashes();
    length = Number(length);
    cy.get('div.gucci-common-tab-dialog-header')
      .find(`span:contains(${tab})`)
      .click();
    for (let i = 0; i < length; i += 1) {
      cy.get(`div.item:eq(${i})>div.item-characteristic:eq(0)>div:eq(0)`)
        .contains(table.hashes()[i].Name)
        .should('exist');
      cy.get(`div.item:eq(${i})>div.item-characteristic:eq(0)>div:eq(1)`)
        .contains(table.hashes()[i].SidId)
        .should('exist');
      cy.get(`div.item:eq(${i})>div.item-characteristic:eq(0)>div:eq(2)`)
        .contains(table.hashes()[i].SidIdPSCV)
        .should('exist');
      cy.get(`div.item:eq(${i})>div:eq(1)`)
        .contains(table.hashes()[i].Value)
        .should('exist');
    }
  };
}

export default ProductDetailsWidget;
