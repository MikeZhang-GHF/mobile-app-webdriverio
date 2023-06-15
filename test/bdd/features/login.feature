Feature: Login
  As a user with a Superpass card
  I want to login to the app
  So that I can access my account and features

  Background:
    Given I have successfully signed up and signed out

  Scenario: Login with Superpass card
    Given I am on the launch screen
    When I click the login button
    And the card number I signed up with is displayed
    When I type in my password
    And I click the continue button
    Then I should see the Home screen
