Feature: Nearby Service Station
    The user can find the nearby service stations

    Scenario: Find the nearest station
        Given I am a user
        When I want to find the nearby service stations
        Then I can see the nearby service stations