Feature: Product Move

  @focus
  Scenario: Simple success flow: Order Validation
    Given As hfhs-user2 with permission 'hfhs-user'
    And open 'Product Move' widget from 'HFHS Cockpit'
    And add products founded by 'KDNR:100883236'
      | Product       | Subscription      |
      | Mombi_Desiree | 43/9740/201554877 |
      | Bombi_Desiree | 43/9740/201554878 |
    And specify 'A604916027,00002' account founded by 'KDNR:103777119' for 'PRI' group
    When Order validation step is open
    Then The following source account should be selected
      | Product       | Subscription      | AccountNumber | AccountType | LockedOrders |
      | Mombi_Desiree | 43/9740/201554877 | A548334966    | PRI         |              |
      | Bombi_Desiree | 43/9740/201554878 | A548334966    | PRI         |              |
    And Effective date is 'now'
    And Target account should be
      | AccountNumber    | IBAN              | LockedOrders |
      | A604916027,00002 | AT165345465467458 |              |

  @focus
  Scenario: Adding products into filled group
    Given I open GUCCI Portal as hfhs-user3
    And open 'Product Move' widget from 'HFHS Cockpit'
    And add products founded by 'KDNR:100668958'
      | Product                            | Subscription  |
      | Alte ISDN Produkte, ohne Breitband | 43/2234/78103 |
    And I specify '200004066276' account founded by 'KDNR:100100100' for 'NORM' group
    When I add another product founded by 'KDNR:100100100'
      | Product          | Subscription  |
      | A1 Festnetz ISDN | 43/3452/71145 |
    Then The following products should be selected
      | Product                            | Subscription  | AccountNumber | AccountType | LockedOrders |
      | Alte ISDN Produkte, ohne Breitband | 43/2234/78103 | 200000232320  | NORM        |              |
      | A1 Festnetz ISDN                   | 43/3452/71145 | 200004066276  | NORM        |              |
    And Target account should not be selected
    And 'Add Account' button should be active
