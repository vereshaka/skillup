Feature: Multiple search
  Scenario: Search by name
    Given As anonymous user I open GUCCI Portal
    When I have try to login as user2 with correct credential
    And switch to HFHS Cockpit
    Then I open 'Product Move' Widget from toolbar
    And I open 'Search Product' Widget from toolbar
    And I try to search by 'billa' query
    And I should see item list
