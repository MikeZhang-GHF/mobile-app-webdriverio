@smoke
Feature: Signup with Superpass Card
  As a user with a Superpass card
  I want to signup for the app
  So that I can access the features

  Scenario: Signup successfully with Superpass card
    Given I open the app
    When I click the signup button
    And I click the "I Have A Card" button
    And I type the username, card number, and pin
    And I click the continue button
    And I type my phone number
    And I click the continue button
    And I wait a few seconds for the OTP
    And I type in the OTP
    And I click the continue button
    And I type my password and confirmation password
    And I click the continue button
    And I wait a few seconds for the signup process
    And I click the continue button
    Then the homescreen shows
