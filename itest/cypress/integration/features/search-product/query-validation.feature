Feature: Search Product Widget: Query Validation

  @focus
  Scenario Outline: Query Errors check
    Given As user2 with permission 'hfhs-user'
    And open 'Product Move' widget from 'HFHS Cockpit'
    And open 'Search Product' widget
    When I try to search by '<query>' query
    Then '<msg>' should be displayed

    Examples:
      | query           | msg                                                                                           |
      | KDNR:1234       | You have incorrect value 1234 in prefix KDNR: Customer Number can be number of 9 digits       |
      | KDNR:1234567890 | You have incorrect value 1234567890 in prefix KDNR: Customer Number can be number of 9 digits |
      | KDNR:123456789 |                                                                                               |

