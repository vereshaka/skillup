Feature: Product Move

  @focus
  Scenario: Simple success flow: Order Validation
    Given As hfhs-user2 with permission 'hfhs-user'
    And open 'Product Move' widget from 'HFHS Cockpit'
    And add products founded by 'KDNR:100883236'
      | Product       | Subscription      |
      | A1 Kombi      | 43/9740/10935673  |
    And specify 'A306248904,00001' account founded by 'KDNR:102338966' for PRI group
    When Order validation step is open
    Then The following source account should be selected
      | Product  | Subscription      | AccountNumber | AccountType | LockedOrders |
      | A1 Kombi | 43/9740/10935673 | A358765465    | PRI         |              |
    And Effective date is 'now'
    And Target account should be
      | AccountNumber    | IBAN                 | LockedOrders |
      | A306248904,00001 | AT443622900000025676 |              |
