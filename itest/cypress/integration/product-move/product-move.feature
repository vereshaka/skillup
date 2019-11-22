Feature: Product Move

  @focus
  Scenario: Simple success flow: Order Validation
    Given As user2 with permission 'hfhs-user'
    And open 'Product Move' widget from 'HFHS Cockpit'
    And add all products founded by 'KDNR:100883236'
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

  @focus
  Scenario: Adding products into filled group
    Given I open GUCCI Portal as user3
    And open 'Product Move' widget from 'HFHS Cockpit'
    And add all products founded by 'KDNR:100668958'
    And specify '' account founded by 'KDNR:100100100' for NORM group
    Then NORM product group should have 2 accounts
    And no target account selected
    And selected account button will be available