Feature: Close User Session
    In order to have the option to close a session in the platform
    As a registered user with an active session
    I want to close my session

    Scenario: An authorized request
        Given I send a POST request to "/user/auth/signup" with body:
        """
        {
            "email": "test@gmail.com",
            "password": "Password1",
            "phone": "999113934"
        }
        """
        Then I send a POST request to "/user/auth/login" with body:
        """
        {
            "email": "test@gmail.com",
            "password": "Password1"
        }
        """
        And the response should have the property "accessToken"
        And I send an authenticated POST request to "/user/auth/logout" with body:
        """
        {}
        """
        And the response status code should be 200
        And the response should be empty

    