Feature: Verify restore password request code
    In order to verify the code to restore the password in the platform
    As registered user with a restore password request created
    I want to verify my restore password request code

    Scenario: A valid restore password request code
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
        Then I send a GET request to "/user/auth/verify-code/76e4db61-72fd-4441-bd5d-730b4886fc19"
        And the response status code should be 200
        And the response should be empty 
    
    Scenario: A invalid restore password request code
        Given I send a GET request to "/user/auth/verify-code/sfjsedfjiwef"
        Then the response status code should be 400
        And the response should have an error message 
