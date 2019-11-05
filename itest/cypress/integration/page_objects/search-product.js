// internal usage
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
  'Select Account': 'selectAccount_searchButton',
  Confirm: 'wizardConfirm',
};

// business methods
export const clearSearch = () => {
  cy.get(`input[id="${elements['Search input']}"]`).clear();
};

export const search = (query) => {
  clearSearch();
  cy.get(`input[id="${elements['Search input']}"]`).type(query);
  cy.get(`button[id="${elements['Search run']}"]`).click();
  cy.wait(wait.mediumWait);
};

// page checks
export const isSearchElementExists = (index, searchItem) => {
  cy.get(`select[id="id_of_select"]>option:eq(${Number(index) - 1})`).should('have.text', searchItem);
};

export const isHistoryExists = (table) => {
  let { length } = table.hashes();
  length = Number(length);
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < length; i++) {
    cy.get(`select[id="${elements.History}"]>option:eq(${i})`).should('have.text', table.hashes()[i].Search);
  }
};

export const checkField = (field, status, state) => {
  const idElement = elements[field];
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

export const openHelp = () => {
  cy.get(`button#${elements.Help}`).click();
};

export const isHelpOpened = () => {
  cy.get(`div.${elements['Help Dialog']}`).should('exist');
  cy.get(`button.${elements.Close}`).should('exist');
};

export const isErrorExists = (error) => {
  if (error === '') {
    cy.get('div[class="StatusMessage Error ProductItem"]>h3:contains(You have incorrect)').should('not.exist');
  } else {
    cy.get('div[class="StatusMessage Error ProductItem"]>h3').should('have.text', error);
  }
};
