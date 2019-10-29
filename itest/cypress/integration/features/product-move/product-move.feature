Feature: Product Move

  @focus
  Scenario: Simple success flow: Order Validation
    Given As anonymous user I open GUCCI Portal
    When I have try to login as user2 with correct credential
    And open 'Product Move' widget from 'HFHS Cockpit'
    And add all products founded by 'KDNR:100883236'
    And specify 'A604916027,00002' account founded by 'KDNR:103777119' for PRI group
    When Order validation step is open
    Then The following source account should be selected
      | Product       | Subscription      | AccountNumber | AccountType | LockedOrders |
      | Mombi_Desiree | 43/9740/201554877 | A548334966    | PRI         |              |
      | Bombi_Desiree | 43/9740/201554878 | A548334966    | PRI         |              |
    And Effective date is '28/10/2019'
    And Target account should be
      | AccountNumber    | IBAN              | LockedOrders |
      | A604916027,00002 | AT165345465467458 |  |
