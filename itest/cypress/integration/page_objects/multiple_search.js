module.exports = {
  checkItemListExistence() {
    cy
      .get('a[name="productCountButton"]')
      .contains('...');
    cy
      .get('div#searchResult')
      .should('have.length', '1')
      .find('div.ScrollableListWrapper')
      .should('have.length', '1')
      .find('div[class="ResultItem CustomerItem"]')
      .find('div[class="ResultItem CustomerItem"]')
      .find('div[class="CustomerItemSelection"]');
    cy
      .get('a[name="productCountButton"]')
      .contains('9')
      .click();
    // TODO: mikhailb: Should be removed when CCF-851 will be done
    cy.wait(25000);
    cy
      .get('select#id_of_select')
      .find('option[value="0"]')
      .contains('billa && KDNR:103777118');
    cy
      .get('a[name="productCountButton"]')
      .click();
    cy
      .get('button[name="process-button"]')
      .click();
  },
};
