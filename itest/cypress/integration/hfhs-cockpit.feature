Feature: HFHS Cockpit check

  @focus
  Scenario: Login with admin rights
    Given hfhs-user3 exists in GUCCI keycloak with the following groups:
      | Group          |
      | hfhs-superuser |
    And I open GUCCI Portal as hfhs-user3
    When switch to HFHS Cockpit
    Then I should see active Product Move button
    And business transaction history widget is displayed
    And transaction list mode group is presented

  @focus
  Scenario: Login with user rights
    Given hfhs-user3 exists in GUCCI keycloak with the following groups:
      | Group     |
      | hfhs-user |
    And I open GUCCI Portal as hfhs-user2
    When switch to HFHS Cockpit
    Then I should see active Product Move button
    And business transaction history widget is displayed
    And transaction list mode group is not presented

  @focus
  Scenario: Create simple order
    Given hfhs-user3 exists in GUCCI keycloak with the following groups:
      | Group |
      | hfhs-user|
    Given I open GUCCI Portal as hfhs-user2
    When switch to HFHS Cockpit
    Then I open 'Product Move' Widget from toolbar
