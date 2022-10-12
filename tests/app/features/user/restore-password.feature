Feature: Restore password
    In order to have the option to restore password in the platform
    As registered user with a restore password request created
    I want restore my password

    Scenario: A valid recover request code and a valid password
        Given I send a POST request to "/user/auth/signup" with body:
        """
        {
            "email": "test@gmail.com",
            "password": "Password1",
            "phone": "999113934"
        }
        """
        Then I send a POST request to "/user/auth/forgot-password" with body:
        """
        {
            "email": "test@gmail.com",
            "request_uuid": "76e4db61-72fd-4441-bd5d-730b4886fc19"
        }
        """
        And I send a POST request to "/user/auth/restore-password" with body:
        """
        {
            "code": "76e4db61-72fd-4441-bd5d-730b4886fc19",
            "password": "Password2",
            "re_password": "Password2"
        }
        """
        And the response status code should be 200
        And the response should be empty
        And I send a POST request to "/user/auth/login" with body:
        """
        {
            "email": "test@gmail.com",
            "password": "Password2"
        }
        """
        And the response status code should be 200
        And the response should have the property "accessToken"
        And the response should have the property "refreshToken"
    
    Scenario: A invalid recover request code and valid password
        Given I send a POST request to "/user/auth/restore-password" with body:
        """
        {
            "code": "16f90d8b-b35e-45aa-bb04-2165d8a4d0a4",
            "password": "Password2",
            "re_password": "Password2"
        }
        """
        And the response status code should be 404
        And the response should have an error message
    
    Scenario: A valid recover request code and invalid password
        Given I send a POST request to "/user/auth/signup" with body:
        """
        {
            "email": "test@gmail.com",
            "password": "Password1",
            "phone": "999113934"
        }
        """
        Then I send a POST request to "/user/auth/forgot-password" with body:
        """
        {
            "email": "test@gmail.com",
            "request_uuid": "da0cc904-2be8-4c7f-b407-50fee37527d3"
        }
        """
        Then I send a POST request to "/user/auth/restore-password" with body:
        """
        {
            "code": "da0cc904-2be8-4c7f-b407-50fee37527d3",
            "password": "p",
            "re_password": "p"
        }
        """
        And the response status code should be 400
        And the response should have an error message

    Scenario: A empty request
        Given I send a POST request to "/user/auth/restore-password" with body:
        """
        {}
        """
        And the response status code should be 400
        And the response should have an error message