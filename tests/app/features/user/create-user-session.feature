Feature: Create user session
    In order to have authentication in the platform
    As registered user
    I want to create my session

    Scenario: An incorrect password
        Given I send a POST request to "/user/auth/signup" with body:
        """
        {
            "email": "session1@gmail.com",
            "password": "Password1",
            "phone": "999113934"
        }
        """
        Then I send a POST request to "/user/auth/login" with body:
        """
        {
            "email": "session1@gmail.com",
            "password": "bad_password"
        }
        """
        And the response status code should be 401
        And the response should have an error message

    Scenario: A non registered email
        Given I send a POST request to "/user/auth/login" with body:
        """
        {
            "email": "non-registered@email.com",
            "password": "Password1"
        }
        """
        Then the response status code should be 404
        And the response should have an error message

    Scenario:  Empty credentials
        Given I send a POST request to "/user/auth/login" with body:
        """
        {}
        """
        Then the response status code should be 400
        And the response should have an error message

    Scenario: A valid credentials
        Given I send a POST request to "/user/auth/signup" with body:
        """
        {
            "email": "session2@gmail.com",
            "password": "Password2",
            "phone": "999113934"
        }
        """
        Then I send a POST request to "/user/auth/login" with body:
        """
        {
            "email": "session2@gmail.com",
            "password": "Password2"
        }
        """
        And the response status code should be 200
        And the response should have the property "accessToken"
        And the response should have the property "refreshToken"