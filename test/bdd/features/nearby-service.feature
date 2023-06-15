Feature: Nearby Service Station
    The user can find the nearby service stations

    Scenario: Find the nearest station
        Given I am a user and allow the app to use my location
        When I want to find the nearest service station
        Then I can see the nearest service station on my lauch screen