Feature: Create User
    In order to have users in the platform
    As a anon user
    I want to create my user account

    Scenario: A valid non existing user
        Given I send a POST request to "/user/auth/signup" with body:
        """
        {
            "email": "test@gmail.com",
            "password": "passwordtest",
            "phone": "999113934"
        }
        """
        Then the response status code should be 201
        And the response should be empty