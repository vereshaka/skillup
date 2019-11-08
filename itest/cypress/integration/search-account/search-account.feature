Feature: Search Account
  @focus
  Scenario: Account Search
    Given
    And open 'Product Move' widget from 'HFHS Cockpit'
    And add all products founded by 'KDNR:100883236'
    And open 'Add Account' dialog with 'PRI' group
    And accounts founded by 'KDNR:103777119' are displayed
    And I select 'A604916027,00002' account
    When Order validation step is open
    Then Target account should be
      | AccountNumber    | IBAN              | LockedOrders |
      | A604916027,00002 | AT165345465467458 |              |