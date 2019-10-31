// @flow
class AbstractWidget {
  elements: Map<string, string>;

  constructor() {
    this.elements = this.createElements();
  }

  getName = (): string => {
    throw new Error('Implement me: getName');
  };

  createElements = (): Map<string, string> => {
    throw new Error('Implement me: createElements');
  };

  checkField = (field, status, state) => {
    const idElement = this.elements[field];
    switch (status) {
      case 'active':
        cy.get(`[id="${idElement}"]`).should('not.be.disabled');
        break;
      case 'disabled':
        cy.get(`[id="${idElement}"]`).should('be.disabled');
        break;
      default:
        throw new Error(`Unsupported status: ${status}`);
    }
    if (state === 'checked') {
      cy.get(`[id="${idElement}"]`).should('be.checked');
    }
    if (state === 'unchecked') {
      cy.get(`[id="${idElement}"]`).should('not.be.checked');
    }
  };

  openDialog = (name: string) => {
    throw new Error(`Implement me: openDialog(${name}`);
  };
}

export default AbstractWidget;
