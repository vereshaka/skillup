module.exports = {
  elements: {
    query_input: 'searchForm_searchInput',
    search_button: 'searchForm_searchButton',
    help_button: 'searchForm_helpButton',
    select: 'id_of_select',
    checkbox: 'searchForm_isActiveCheckbox',
    close_button: 'HelperPageClose',
    helper_page: 'HelperPageWrapper',
  },
  getElementIdByName(elementName) {
    return module.exports.elements[elementName];
  },
  searchElement(searchItem) {
    cy.get('input[id="searchForm_searchInput"]').type(searchItem);
    cy.get('button[id="searchForm_searchButton"]').click();
    cy.get('input[id="searchForm_searchInput"]').clear();
  },
  checkSearchElement(index, searchItem) {
    // eslint-disable-next-line no-param-reassign
    index = Number(index) - 1;
    cy.get(`select[id="id_of_select"]>option:eq(${index})`).should('have.text', searchItem);
  },
  checkHistory(table) {
    let { length } = table.hashes();
    length = Number(length);
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < length; i++) {
      cy.get(`select[id="id_of_select"]>option:eq(${i})`).should('have.text', table.hashes()[i].Search);
    }
  },
  checkField(field, status, state) {
    if (status === 'active') {
      cy.get(`[id="${module.exports.getElementIdByName(field)}"]`).should('not.be.disabled');
    } if (status === 'disabled') {
      cy.get(`[id="${module.exports.getElementIdByName(field)}"]`).should('be.disabled');
    } if (state === 'checked') {
      cy.get(`[id="${module.exports.getElementIdByName(field)}"]`).should('be.checked');
    } if (state === 'unchecked') {
      cy.get(`[id="${module.exports.getElementIdByName(field)}"]`).should('not.be.checked');
    }
  },
  buttonClick(buttonName) {
    cy.get(`[id="${module.exports.getElementIdByName(buttonName)}"]`).click();
  },
  checkHelpOpened(wrapperName, buttonName) {
    cy.get(`div.${module.exports.getElementIdByName(wrapperName)}`).should('exist');
    cy.get(`button.${module.exports.getElementIdByName(buttonName)}`).should('exist');
  },
};
