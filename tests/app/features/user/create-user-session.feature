Feature: Create user session
    In order to have authentication in the platform
    As registered user
    I want to create my session

    Scenario: A valid credentials
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
        And the response status code should be 200
        And the response should have the property "accessToken"
        And the response should have the property "refreshToken"

    Scenario: An incorrect credentials
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
            "password": "bad password"
        }
        """
        And the response status code should be 401
        And the response should have an error message
    
    Scenario:  Empty credentials
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
        {}
        """
        And the response status code should be 400
        And the response should have an error message