Feature: Get Store Information
    In order to have the information of an store in the platform
    As a authenticated user with store created
    I want to get my store information

    Scenario: An unauthenticated user
        Given I send a GET request to "/store/information"
        Then the response status code should be 401
        And the response should have an error message

    Scenario: An authenticated user without store created
        Given I get an access token "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiYjI5NDliYzEtMzJlNC00OTkxLTkzMmUtNzVlODQyMmZkNGIwIiwic2Vzc2lvbiI6ImM2MWEwYTNkLTVhYjAtNGYwYi04MWVlLWI4ZWJhMDc1MTdjMiIsImlhdCI6MTY2NTY5MDU5MX0.RJLf_q7fx9xVzrDXpRLkg6izkqaAPva2IsLTatLUPS8"
        Then I send an authenticated GET request to "/store/information"
        And the response status code should be 404
        And the response should have an error message

    Scenario: An authenticated user with store created
        Given I get an access token "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiYjI5NDliYzEtMzJlNC00OTkxLTkzMmUtNzVlODQyMmZkNGIwIiwic2Vzc2lvbiI6ImM2MWEwYTNkLTVhYjAtNGYwYi04MWVlLWI4ZWJhMDc1MTdjMiIsImlhdCI6MTY2NTY5MDU5MX0.RJLf_q7fx9xVzrDXpRLkg6izkqaAPva2IsLTatLUPS8"
        Then I send an authenticated POST request to "/store/create" with body:
        """
        {
            "domain": "testunique",
            "name": "Tienda Unica",
            "whatsapp": "51999113934",
            "type": "Embutidos y fresas",
            "country_id": "7728c85e-ac59-4954-8e70-0311942bca12",
            "currency_id": "0d204bc1-ae8f-4c40-a523-0db4dc3a59bd"
        }
        """
        And the response status code should be 201
        And I send an authenticated GET request to "/store/information"
        And the response status code should be 200
        And the response should have the property "store"
    
