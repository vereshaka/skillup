Feature: Multiple search
  Scenario: Search by name
    Given As anonymous user I open GUCCI Portal
    When I have try to login as user2 with correct credential
    And open HFHS cockpit
    And open 'Product Move' widget
    And open 'Search Product' widget
    When I try to search by 'billa' query
    Then 'Error' should be displayed
