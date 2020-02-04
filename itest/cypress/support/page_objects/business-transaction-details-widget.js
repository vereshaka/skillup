import moment from 'moment';
import AbstractWidget from './common/abstract-widget';

class BusinessTransactionDetailsWidget extends AbstractWidget {
  initElements() {
    this.elements = {
      'Product Move item': 'productItem_-',
    };
  }

  getName = (): string => 'Business Transaction Details';

  isInfoDisplayed = (table: Object) => {
    cy.normalWait();
    let { length } = table.hashes();
    length = Number(length);
    for (let i = 0; i < length; i += 1) {
      cy.get('div[class="ProductItemMove BusinessTransactionInfoTitle"]>div>strong>span:eq(0)').contains(table.hashes()[i].TransactionType).should('exist');
      cy.get('div[class="ProductItemMove BusinessTransactionInfoTitle"]>div>span>strong:eq(1)').contains(table.hashes()[i].User).should('exist');
      if (table.hashes()[i].CreationDate === 'today' && table.hashes()[i].EffectiveDate === 'today') {
        const localDate = new Date();
        cy.get('div[class="EffectiveDate"]>strong>span').contains(moment(localDate).format('D/MM/YYYY')).should('exist');
        cy.get('div[class="ProductItemMove BusinessTransactionInfoTitle"]>div>span>strong:eq(2)').contains(moment(localDate).format('D/MM/YYYY')).should('exist');
      }
      cy.get('div[class="HeadingItemsPosition"]>div>span').contains(table.hashes()[i].Count).should('exist');
      cy.get('div[class="HeadingItemsPosition"]>div').contains(table.hashes()[i].TargetAccount).should('exist');
      cy.get(`div#${this.elements['Product Move item']}>div>span:eq(0)`).contains(table.hashes()[i].SourceProductSid).should('exist');
      cy.get(`div#${this.elements['Product Move item']}>div>span:eq(1)`).contains(table.hashes()[i].SourceBillableUser).should('exist');
      cy.get(`div#${this.elements['Product Move item']}>div>span:eq(3)`).contains(table.hashes()[i].SourceAccount).should('exist');
    }
  };

  isTabCaptionDisplayed = (caption: string) => {
    cy
      .get('div[class="tab-dialog-button active"]')
      .find('div.title')
      .should('have.text', caption);
  };
}

export default BusinessTransactionDetailsWidget;
