Feature: Create Store
    In order to have stores in the platform
    As a authenticated user
    I want to create my store

    Scenario: A invalid domain
        Given I get an access token "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNGI2NzY2YzgtOThiNC00ZWUwLWJmZWUtYzZhYWIwM2ZhN2U0Iiwic2Vzc2lvbiI6ImQ1ZDQ5YThhLWM4YzUtNGNkOS1iNGQ1LTBiNjNkNTI5ZDIwNSIsImlhdCI6MTY2NTY4OTk1Mn0.er-klDF0EDyD6IyDSjsLZwrzcFYxBQ7E8XzzwLB7x94"
        Then I send an authenticated POST request to "/store/create" with body:
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
        And the response status code should be 400
        And the response should have an error message
    
    Scenario: A invalid whatsapp
        Given I get an access token "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNGI2NzY2YzgtOThiNC00ZWUwLWJmZWUtYzZhYWIwM2ZhN2U0Iiwic2Vzc2lvbiI6ImQ1ZDQ5YThhLWM4YzUtNGNkOS1iNGQ1LTBiNjNkNTI5ZDIwNSIsImlhdCI6MTY2NTY4OTk1Mn0.er-klDF0EDyD6IyDSjsLZwrzcFYxBQ7E8XzzwLB7x94"
        And I send an authenticated POST request to "/store/create" with body:
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
        And the response status code should be 400
        And the response should have an error message

    Scenario: A empty request
        Given I get an access token "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNGI2NzY2YzgtOThiNC00ZWUwLWJmZWUtYzZhYWIwM2ZhN2U0Iiwic2Vzc2lvbiI6ImQ1ZDQ5YThhLWM4YzUtNGNkOS1iNGQ1LTBiNjNkNTI5ZDIwNSIsImlhdCI6MTY2NTY4OTk1Mn0.er-klDF0EDyD6IyDSjsLZwrzcFYxBQ7E8XzzwLB7x94"
        Then I send an authenticated POST request to "/store/create" with body:
        """
        {}
        """
        And the response status code should be 400
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
        Then the response status code should be 401
        And the response should have an error message

    Scenario: A valid non existing store
        Given I get an access token "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNGI2NzY2YzgtOThiNC00ZWUwLWJmZWUtYzZhYWIwM2ZhN2U0Iiwic2Vzc2lvbiI6ImQ1ZDQ5YThhLWM4YzUtNGNkOS1iNGQ1LTBiNjNkNTI5ZDIwNSIsImlhdCI6MTY2NTY4OTk1Mn0.er-klDF0EDyD6IyDSjsLZwrzcFYxBQ7E8XzzwLB7x94"
        When I send an authenticated POST request to "/store/create" with body:
        """
        {
            "domain": "tiendadeacero",
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
        Given I get an access token "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiMDdjNDA4NGUtZWU2Ny00YTk2LWEzOGUtN2NkNTg3Yzk0YzNmIiwic2Vzc2lvbiI6ImJlNjNkMGY5LWI5YzMtNGNiZi05MjUwLTBmY2NiYzY5NWY5YyIsImlhdCI6MTY2NTcxMTE4NX0.S54vaGCIwkFao0lAZmc4maica5muNXPdKvGJzVBM6g8"
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
        Then the response status code should be 201
        And I send an authenticated POST request to "/store/create" with body:
        """
        {
            "domain": "otrodominio",
            "name": "Tienda Diferente a la de arriba",
            "whatsapp": "51967587667",
            "type": "Pantalones y Joggers",
            "country_id": "7728c85e-ac59-4954-8e70-0311942bca12",
            "currency_id": "0d204bc1-ae8f-4c40-a523-0db4dc3a59bd"
        }
        """
        And the response status code should be 400
        And the response should have an error message 