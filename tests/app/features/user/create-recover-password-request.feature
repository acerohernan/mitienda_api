Feature: Create a recover password request
    In order to restore the password in the platform
    As a registered user
    I want to create a request to restore my password
    
    Scenario: A registered email
        Given I send a POST request to "/user/auth/signup" with body:
        """
        {
            "email": "test@test.com",
            "password": "Password1",
            "phone": "999113934"
        }
        """
        Then I send a POST request to "/user/auth/forgot-password" with body:
        """
        {
            "email": "test@test.com"
        }
        """
        And the response status code should be 201
        And the response should have the property "code"