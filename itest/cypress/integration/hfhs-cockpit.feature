Feature: HFHS Cockpit check

  Scenario: Login with admin rights
    Given user3 exists in GUCCI keycloak with the following groups:
      | Group |
      | hfhs-superuser|
    And As anonymous user I open GUCCI Portal
    When I have try to login as user3 with correct credential
    And switch to HFHS Cockpit
    Then I should see active 'Product Move' button
    And business transaction widget is displayed
    And transaction list mode group is presented

  Scenario: Login with user rights
    Given user2 exists in GUCCI keycloak with the following groups:
      | Group |
      | hfhs-user|
    And As anonymous user I open GUCCI Portal
    When I have try to login as user2 with correct credential
    And switch to HFHS Cockpit
    Then I should see active 'Product Move' button
    And business transaction widget is displayed
    And transaction list mode group is not presented

  Scenario: Create simple order
    Given user2 exists in GUCCI keycloak with the following groups:
      | Group |
      | hfhs-user|
    And As anonymous user I open GUCCI Portal
    When I have try to login as user2 with correct credential
    And switch to HFHS Cockpit
    And I open 'Product Move' Widget from toolbar
