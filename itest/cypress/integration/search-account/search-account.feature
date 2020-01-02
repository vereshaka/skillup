Feature: Search Account

  @focus
  Scenario: Account Search
    Given I open GUCCI Portal as hfhs-user2
    And open 'Product Move' widget from 'HFHS Cockpit'
    And add all products founded by 'KDNR:100883236'
    And open 'Add Account' dialog with 'PRI' group
    And accounts founded by 'KDNR:102338966' are displayed
      | AccountNumber    | IBAN                 |
      | A306248904,00001 | AT443622900000025676 |
      | A358369716,00001 | AT443622900000025676 |
    And I select 'A358369716,00001' account
    When Order validation step is open
    Then Target account should be
      | AccountNumber    | IBAN                 | LockedOrders |
      | A358369716,00001 | AT443622900000025676 |              |
