Feature: Create Store
    In order to have stores in the platform
    As a authenticated user
    I want to create my store

    Scenario: A invalid domain
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
        When I send an authenticated POST request to "/store/create" with body:
        """
        {
            "domain": "",
            "name": "Tienda de Acero",
            "whatsapp": "51999113934",
            "type": "Embutidos y fresas",
            "country_id": "7728c85e-ac59-4954-8e70-0311942bca12",
            "currency_id": "0d204bc1-ae8f-4c40-a523-0db4dc3a59bd"
        }
        """
        Then the response status code should be 400
        And the response should have an error message
    
    Scenario: A invalid whatsapp
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
        When I send an authenticated POST request to "/store/create" with body:
        """
        {
            "domain": "teststore",
            "name": "Tienda de Test",
            "whatsapp": "",
            "type": "Embutidos y fresas",
            "country_id": "7728c85e-ac59-4954-8e70-0311942bca12",
            "currency_id": "0d204bc1-ae8f-4c40-a523-0db4dc3a59bd"
        }
        """
        Then the response status code should be 400
        And the response should have an error message

    Scenario: A empty request
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
        When I send an authenticated POST request to "/store/create" with body:
        """
        {}
        """
        Then the response status code should be 400
        And the response should have an error message
    
    Scenario: An unauthenticated request
        Given I send a POST request to "/store/create" with body:
        """
        {
            "domain": "testdomain",
            "name": "Tienda de Acero",
            "whatsapp": "51999113934",
            "type": "Embutidos y fresas",
            "country_id": "7728c85e-ac59-4954-8e70-0311942bca12",
            "currency_id": "0d204bc1-ae8f-4c40-a523-0db4dc3a59bd"
        }
        """
        And the response status code should be 401
        And the response should have an error message

    Scenario: A valid non existing store
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
        When I send an authenticated POST request to "/store/create" with body:
        """
        {
            "domain": "newdomain",
            "name": "Tienda de Acero",
            "whatsapp": "51999113934",
            "type": "Embutidos y fresas",
            "country_id": "7728c85e-ac59-4954-8e70-0311942bca12",
            "currency_id": "0d204bc1-ae8f-4c40-a523-0db4dc3a59bd"
        }
        """
        Then the response status code should be 201
        And the response should be empty

    Scenario: A user with store created
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
        When I send an authenticated POST request to "/store/create" with body:
        """
        {
            "domain": "newdomain2",
            "name": "Tienda Nueva",
            "whatsapp": "51967587667",
            "type": "Pantalones y Joggers",
            "country_id": "7728c85e-ac59-4954-8e70-0311942bca12",
            "currency_id": "0d204bc1-ae8f-4c40-a523-0db4dc3a59bd"
        }
        """
        Then the response status code should be 400
        And the response should have an error message