Feature: HFHS Cockpit check
  Scenario: Login with admin rights
    Given user3 exists in GUCCI keycloak with the following groups:
      | Group |
      | hfhs-superuser|
    And user3 have open HFHS Cockpit
    Then I should see active 'product_move' button
    And business transaction widget is displayed
    And transaction list mode group is presented

  Scenario: Login with user rights
    Given user2 exists in GUCCI keycloak with the following groups:
      | Group |
      | hfhs-user|
    And  user2 have open HFHS Cockpit
    Then I should see active 'product_move' button
    And business transaction widget is displayed
    And transaction list mode group is not presented

  Scenario: Create simple order
    Given user2 exists in GUCCI keycloak with the following groups:
      | Group |
      | hfhs-user|
    And user2 have open HFHS Cockpit
    And I open 'product_move' Widget from toolbar
