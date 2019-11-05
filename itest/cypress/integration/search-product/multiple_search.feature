Feature: Multiple search
  Scenario: Search by name
    Given As anonymous user I open GUCCI Portal
    When I have try to login as user2 with correct credential
    And switch to HFHS Cockpit
    And I open 'Product Move' Widget from toolbar
    And open 'Add Product' dialog
    And I try to search by 'billa' query
    Then I should see item and product lists
