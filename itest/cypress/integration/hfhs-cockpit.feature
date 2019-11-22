Feature: HFHS Cockpit check

  Scenario: Create simple order
    Given user2 exists in GUCCI keycloak with the following groups:
      | Group |
      | hfhs-user|
    Given I open GUCCI Portal as user2
    When switch to HFHS Cockpit
    And I open 'Product Move' Widget from toolbar
