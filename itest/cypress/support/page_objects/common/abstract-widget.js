// @flow
class AbstractWidget {
  currentDialog: AbstractWidget;

  elements: Object;

  constructor() {
    this.initElements();
  }

  getName = (): string => {
    throw new Error('Implement me: getName(Widget)');
  };

  initElements() {
    throw new Error(`Implement me: ${this.getName()}.initElements`);
  }

  checkField = (field: string, status: string, state: string) => {
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

  openDialog = (name: string, group?:string) => {
    if (group) {
      throw new Error(`Implement me: openDialog(${name},${group})`);
    } else {
      throw new Error(`Implement me: openDialog(${name})`);
    }
  };

  getCurrentDialog = () => this.currentDialog;
}

export default AbstractWidget;
