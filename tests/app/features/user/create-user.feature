Feature: Create User
    In order to have users in the platform
    As a anon user
    I want to create my user account

    Scenario: A invalid email
        Given I send a POST request to "/user/auth/signup" with body:
        """
        {
            "email": "asdsadas",
            "password": "Password1",
            "phone": "999113934"
        }
        """
        Then the response status code should be 400
        And the response should have an error message

    Scenario: A invalid password
        Given I send a POST request to "/user/auth/signup" with body:
        """
        {
            "email": "create@test.com",
            "password": "p",
            "phone": "999113934"
        }
        """
        Then the response status code should be 400
        And the response should have an error message

    Scenario: A invalid request
        Given I send a POST request to "/user/auth/signup" with body:
        """
        {
        }
        """
        Then the response status code should be 400
        And the response should have an error message

    Scenario: A valid non existing user
        Given I send a POST request to "/user/auth/signup" with body:
        """
        {
            "email": "create@gmail.com",
            "password": "Password1",
            "phone": "999113934"
        }
        """
        Then the response status code should be 201
        And the response should be empty
    
    Scenario: A registered email
        Given I send a POST request to "/user/auth/signup" with body:
        """
        {
            "email": "create-repeat@gmail.com",
            "password": "Password2",
            "phone": "999113934"
        }
        """
        Then the response status code should be 201
        And I send a POST request to "/user/auth/signup" with body:
        """
        {
            "email": "create-repeat@gmail.com",
            "password": "Password2",
            "phone": "999113934"
        }
        """
        And the response status code should be 400
        And the response should have an error message