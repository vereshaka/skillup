Feature: Product Move

  @focus
  Scenario: Simple success flow: Order Validation
    Given As hfhs-user2 with permission 'hfhs-user'
    And open 'Product Move' widget from 'HFHS Cockpit'
    And add products founded by 'KDNR:100883236'
      | Product       | Subscription      |
      | Mombi_Desiree | 43/9740/201554877 |
      | Bombi_Desiree | 43/9740/201554878 |
    And specify 'A604916027,00002' account founded by 'KDNR:103777119' for PRI group
    When Order validation step is open
    Then The following source account should be selected
      | Product       | Subscription      | AccountNumber | AccountType | LockedOrders |
      | Mombi_Desiree | 43/9740/201554877 | A548334966    | PRI         |              |
      | Bombi_Desiree | 43/9740/201554878 | A548334966    | PRI         |              |
    And Effective date is 'now'
    And Target account should be
      | AccountNumber    | IBAN              | LockedOrders |
      | A604916027,00002 | AT165345465467458 |              |
