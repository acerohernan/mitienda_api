Feature: Get Store Information
    In order to have the information of an store in the platform
    As a authenticated user with store created
    I want to get my store information

    Scenario: An authenticated user with store created
        Given I send a POST request to "/user/auth/signup" with body:
        """
        {
            "email": "test@gmail.com",
            "password": "Password1",
            "phone": "51999113934"
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
        When I send an authenticated GET request to "/store/information"
        And the response status code should be 200
        And the response should have the property "store"
