Feature: Multiple search
  Scenario: Search by name
    Given As anonymous user I open GUCCI Portal
    When I have try to login as user2 with correct credential
    And user2 have open HFHS Cockpit
    Then I open 'product_move' Widget from toolbar
    And I open 'search_product' Widget from toolbar
    And I try to search by 'billa' query

