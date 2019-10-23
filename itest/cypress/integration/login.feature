Feature: Login Form

  @focus
  Scenario: Wrong user credential
    Given As anonymous user I open GUCCI Portal
    When I have try to login as user1 with wrong credential
    Then I should receive 'Invalid username or password.' message on login form

  @focus
  Scenario: Correct user credential without HFHS rights
    Given As anonymous user I open GUCCI Portal
    When I have try to login as user1 with correct credential
    Then I should see 'GUCCI Welcome' Cockpit
    And 'HFHS Cockpit' is not available

  @focus
  Scenario: Correct user credential with HFHS rights
    Given As anonymous user I open GUCCI Portal
    When I have try to login as user2 with correct credential
    Then I should see 'GUCCI Welcome' Cockpit
    And 'HFHS Cockpit' is available