Feature: Search Product Widget: Elements Check

  Background:
    Given As user2 with permission 'hfhs-user'
    And open 'Product Move' widget from 'HFHS Cockpit'

  Scenario: First position
    Given open 'Add Product' dialog
    When I search 'KDNR:1234'
    Then 1 element should be 'KDNR:1234'

  Scenario: Check size of history
    Given open 'Add Product' dialog
    Given search 'KDNR:12341'
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
    When open 'Add Product' dialog
    Then 'Search input' should be active
    And 'Search run' should be disabled
    And 'Help' should be active
    And 'History' should be active
    And 'Product State Filter' should be disabled and checked

  Scenario: Check Help Button
    Given open 'Add Product' dialog
    When Click on Help Button
    Then Help Page and Close Button should be exist

  Scenario Outline: Query Errors check
    Given open 'Add Product' dialog
    When I try to search by '<query>' query
    Then '<msg>' should be displayed

    Examples:
      | query           | msg                                                                                           |
      | KDNR:1234       | You have incorrect value 1234 in prefix KDNR: Customer Number can be number of 9 digits       |
      | KDNR:1234567890 | You have incorrect value 1234567890 in prefix KDNR: Customer Number can be number of 9 digits |
      | KDNR:123456789  |                                                                                               |

