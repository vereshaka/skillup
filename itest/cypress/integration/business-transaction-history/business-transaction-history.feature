Feature: Business Transaction History

  @focus
  Scenario: Check latest transaction
    Given I open GUCCI Portal as user3
    And switch to HFHS Cockpit
    And business transaction history widget is displayed
    And transaction list mode group is presented
    And I select 'all transactions' that were 'taken place' in the last month
    When I select latest business transaction
    Then latest business transaction's info is displayed in new tab

  @focus
  Scenario: Check latest successfully finished transaction
    Given I open GUCCI Portal as user3
    And switch to HFHS Cockpit
    And business transaction history widget is displayed
    And transaction list mode group is presented
    And I select 'all transactions' that were 'done' in the last month
    When I select latest business transaction
    Then latest business transaction's info is displayed in new tab

  @focus
  Scenario: Check latest transaction finished with error
    Given I open GUCCI Portal as user3
    And switch to HFHS Cockpit
    And business transaction history widget is displayed
    And transaction list mode group is presented
    And I select 'all transactions' that were 'done with error' in the last month
    When I select latest business transaction
    Then latest business transaction's info is displayed in new tab