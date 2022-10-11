Feature: Restore password
    In order to have the option to restore password in the platform
    As registered user with a restore password request created
    I want restore my password

    Scenario: A valid recover request code and password
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