Feature: Multiple search
  Scenario: Search by name
    Given As anonymous user I open GUCCI Portal
    And try to login as user2
    And open 'Product Move' widget from 'HFHS Cockpit'
    And open 'Add Product' dialog
    When I try to search by 'billa' query
    Then I should see item and product lists
