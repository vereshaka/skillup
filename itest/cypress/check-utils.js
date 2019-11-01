export const wait = {
  shortWait: 200,
  mediumWait: 500,
  normalWait: 1000,
  longWait: 3000,
};
export const elements = {
  'Search input': 'searchForm_searchInput',
  'Search run': 'searchForm_searchButton',
  Help: 'searchForm_helpButton',
  History: 'id_of_select',
  'Product State Filter': 'searchForm_isActiveCheckbox',
  Close: 'HelperPageClose',
  'Help Dialog': 'HelperPageWrapper',
  'Product Move': 'openPM',
};

export const checkButtonExistence = (buttonName) => {
  cy.get(`button[id=${elements[buttonName]}]`);
};
