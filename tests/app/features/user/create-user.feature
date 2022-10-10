Feature: Create User
    In order to have users in the platform
    As a anon user
    I want to create my user account

    Scenario: A valid non existing user
        Given I send a POST request to "/user/auth/signup" with body:
        """
        {
            "email": "test@gmail.com",
            "password": "password",
            "phone": "999113934"
        }
        """
        Then the response status code should be 201
        And the response should be empty
    
    Scenario: A registered user email
        Given I send a POST request to "/user/auth/signup" with body:
        """
        {
            "email": "test@gmail.com",
            "password": "password",
            "phone": "999113934"
        }
        """
        Then I send a POST request to "/user/auth/signup" with body:
        """
        {
            "email": "test@gmail.com",
            "password": "nueva_password",
            "phone": "953712921"
        }
        """
        And the response status code should be 400
        And the response should have an error message
    
    Scenario: A invalid password
        Given I send a POST request to "/user/auth/signup" with body:
        """
        {
            "email": "demo@test.com",
            "password": "p",
            "phone": "999113934"
        }
        """
        And the response status code should be 400
        And the response should have an error message