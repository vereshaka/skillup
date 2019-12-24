import AbstractWidget from './common/abstract-widget';

class ProductDetailsWidget extends AbstractWidget {
  initElements() {
    this.elements = {
      collapse: 'icon faCompressArrowsAlt fas',
      expand: 'icon faExpandArrowsAlt fas',
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
}

export default ProductDetailsWidget;
