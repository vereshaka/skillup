Feature: Search Product Widget: Elements Check

  Scenario: First position
    Given As user2 with permission 'hfhs-user'
    And open 'Product Move' widget from 'HFHS Cockpit'
    And open 'Add Product' dialog
    When I search 'KDNR:1234'
    Then 1 element should be 'KDNR:1234'


  Scenario: Check size of history
    Given As user2 with permission 'hfhs-user'
    And open 'Product Move' widget from 'HFHS Cockpit'
    And open 'Add Product' dialog
    And search 'KDNR:12341'
    And search 'KDNR:12342'
    And search 'KDNR:12343'
    And search 'KDNR:12344'
    And search 'KDNR:12345'
    When I search 'KDNR:12346'
    Then History should be
      | Search     |
      | KDNR:12346 |
      | KDNR:12345 |
      | KDNR:12344 |
      | KDNR:12343 |
      | KDNR:12342 |


  Scenario: Check Elements
    Given As user2 with permission 'hfhs-user'
    And open 'Product Move' widget from 'HFHS Cockpit'
    And open 'Add Product' dialog
    Then 'Search input' should be active
    And 'Search run' should be disabled
    And 'Help' should be active
    And 'History' should be active
    And 'Product State Filter' should be disabled and checked


  Scenario: Check Help Button
    Given As user2 with permission 'hfhs-user'
    And open 'Product Move' widget from 'HFHS Cockpit'
    And open 'Add Product' dialog
    And Click on Help Button
    Then Help Page and Close Button should be exist
