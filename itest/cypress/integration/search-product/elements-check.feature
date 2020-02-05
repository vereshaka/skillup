Feature: Search Product Widget: Elements Check

  Background:
    Given As hfhs-user2 with permission 'hfhs-user'
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
      | query             | msg                                                                                           |
      | KDNR:1234         | You have incorrect value 1234 in prefix KDNR: Customer Number can be number of 9 digits       |
      | KDNR:1234567890   | You have incorrect value 1234567890 in prefix KDNR: Customer Number can be number of 9 digits |
      | KDNR:123456789    |                                                                                               |
      | KDNR:10010010     | You have incorrect value 10010010 in prefix KDNR: Customer Number can be number of 9 digits   |
      | KDNR: 10010010a   | You have incorrect value 10010010a in prefix KDNR: Customer Number can be number of 9 digits  |
      # | LOK: a            | Unexpected technical error: TECHNICAL - For input string: "a"; nested exception is java.lang.NumberFormatException: For input string: "a" |
      | ACC: 20000974688a | You have incorrect value 20000974688a in prefix ACC: Account Number can be number of 12 digits. Arrangement Number should conform to the following format AXXXXXXXXX,XXXXX where X is digit|
      | ACC:  2000097468  | You have incorrect value 2000097468 in prefix ACC: Account Number can be number of 12 digits. Arrangement Number should conform to the following format AXXXXXXXXX,XXXXX where X is digit|
      # | SUB: 8443823      | Unexpected technical error: CUSTINV-999 - Unerwarteter technischer Fehler im Inventar. Zusätzliche Information: Entity Subscription with id 8443823 not found|
       |TSUB: TS74144 && TSTYPE | When searching by TSUB are mandatory field/s - TSTYPE|