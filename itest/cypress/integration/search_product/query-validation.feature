Feature: Search Product Widget: Query Validation

  @focus
  Scenario Outline: Query Errors check
    Given As user2 with permission 'hfhs-user'
    And open 'Product Move' widget from 'HFHS Cockpit'
    And open 'Search Product' widget
    When I try to search by '<query>' query
    Then '<msg>' should be displayed

    Examples:
      | query              | msg   |
      | KDNR:1234          | Error |
      | KDNR:1234567890    | Error |
      | KDNR:12345678      | Error |
      | KDNR:1237890       | Error |
      | KDNR:1234567890457 | Error |
      | KDNR:12340         | Error |

