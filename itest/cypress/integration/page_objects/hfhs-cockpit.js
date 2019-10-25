const elements = {
  'Product Move': 'openPM',
};


export const openWidget = (widgetName) => {
  cy.get(`button[id=${elements[widgetName]}]`)
    .click();
};
