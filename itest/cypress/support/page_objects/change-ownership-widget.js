import AbstractWidget from './common/abstract-widget';
import SearchProductWidget from './search-product-widget';
import SearchAccountWidget from './search-account-widget';


class ChangeOwnershipWidget extends AbstractWidget {
  initElements() {
    this.elements = {
      'Add Product': 'addProduct',
      'Add Account': 'selectAccount_searchButton',
    };
  }

  getName = () => 'Change Ownership';

  specifyGroup = (name: string, group: string) => {
    cy.get(`div[class="accordion__item"]:contains("${group} Products")>div[class="AccordionItemHeading AccordionItemHeadingColor"]`).click();
    cy.get(`div[class="accordion__item"]:contains("${group} Products")`).as('searchableGroup');
    cy.get('@searchableGroup').find(`button[id="${this.elements[name]}"]`).click();
  };

  openDialog = (name: string, group?:string) => {
    switch (name) {
      case 'Add Product':
        cy.get(`span[id="${this.elements[name]}"]`).click();
        this.currentDialog = new SearchProductWidget();
        break;
      case 'Add Account':
        if (group) {
          this.specifyGroup(name, group);
          this.currentDialog = new SearchAccountWidget();
        } else {
          throw new Error('No group was defined');
        }
        break;
      default:
        throw new Error(`Unsupported dialog. Name: ${name}`);
    }
  };

  cancelProductMoveProcess = () => {
    cy.get('button#wizardCancel').click();
  };

  isAlreadyAdded = () => {
    cy.get('body').then(($body) => {
      if ($body.find('div.AccountInfoTest').length || $body.find('div.ProductItemMove').length) {
        this.cancelProductMoveProcess();
      }
    });
  };

  addProducts = (query: string, table?: Object) => {
    cy.normalWait();
    this.isAlreadyAdded();
    cy.normalWait();
    this.openDialog('Add Product');
    new SearchProductWidget().searchAndAdd(query, table);
  };
}

export default ChangeOwnershipWidget;
