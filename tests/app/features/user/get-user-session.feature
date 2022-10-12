Feature: Get User Session Information
    In order to get the information of a user's session in the platform
    As a authenticated user
    I want to get my session information

    Scenario: A valid authenticated request
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
        And I send an authenticated GET request to "/user/auth/session"
        And the response status code should be 200
        And the response should have the property "session"
        And the response should have the property "user"
    
    Scenario: A unathenticated request
        Given I send a GET request to "/user/auth/session"
        Then the response status code should be 401
        And the response should have an error message