Feature: Login Form

  Background:
    Given As anonymous user I open GUCCI Portal

  Scenario: Wrong user credential
    When I have try to login as user1 with wrong credential
    Then I should receive 'Invalid username or password.' message on login form

  Scenario: Correct user credential without HFHS rights
    When I have try to login as user1 with correct credential
    Then I should see 'GUCCI Welcome' Cockpit
    And 'HFHS Cockpit' is not available

  Scenario: Correct user credential with HFHS rights
    When I have try to login as user2 with correct credential
    Then I should see 'GUCCI Welcome' Cockpit
    And 'HFHS Cockpit' is available