Feature: Multiple search
  Scenario: Search by name
    Given I open GUCCI Portal as user2
    And open 'Product Move' widget from 'HFHS Cockpit'
    And open 'Add Product' dialog
    When I try to search by 'billa' query
    Then I should see item and product lists
