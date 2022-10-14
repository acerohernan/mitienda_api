Feature: Update store information
    In order to have the option to update the store information in the platform
    As a authenticated user
    I want to update the store information

    Scenario: An authenticated user with store created
        Given I get an access token "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiYzc0YjA2NjctZjM1NS00YjM2LWI5ODctYjI4YmNmNmJiYWMzIiwic2Vzc2lvbiI6ImQ3ZDFmNDQ3LTdjMjEtNGRlNy05N2UwLWFiODg2NmQzNmIwNyIsImlhdCI6MTY2NTcxMTk0OX0.9FWZy6nFonpcb0gkpnFIUA1aJUnNp276SM3HxvDMCqo"
        Then I send an authenticated POST request to "/store/create" with body:
        """
        {
            "domain": "tiendaparaeditar",
            "name": "Tienda Para Editar",
            "whatsapp": "51967587667",
            "type": "Pantalones y Joggers",
            "country_id": "7728c85e-ac59-4954-8e70-0311942bca12",
            "currency_id": "0d204bc1-ae8f-4c40-a523-0db4dc3a59bd"
        }
        """
        Then I send an authenticated PUT request to "/store/information" with body:
        """
        {
            "name": "Tienda Buena",
            "whatsapp": "51999113934",
            "type": "Supermercado y Bebidas",
            "currency_id": "abce942a-d189-4f98-a8c2-ecca1c8c9aa1"
        } 
        """
        Then the response status code should be 200
        And the response should be empty
    
    Scenario: An authenticated user without store created
        Given I get an access token "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiOTU5NTEyMzAtNjgyYi00ZDQzLWFiN2YtZDIyMGZhNWYxMjVmIiwic2Vzc2lvbiI6IjAxMzM5M2QzLTQ0MTktNDNkMS05MTIxLTAwODhkMTBhMDVmMCIsImlhdCI6MTY2NTcxNDM4MX0.Q7diY98XhXtm2gGxbcYWvDmxzgY_Mrbwhvf3v88p4tI"
        Then I send an authenticated PUT request to "/store/information" with body:
        """
        {
            "name": "Tienda Buena",
            "whatsapp": "51999113934",
            "type": "Supermercado y Bebidas",
            "currency_id": "abce942a-d189-4f98-a8c2-ecca1c8c9aa1"
        } 
        """
        Then the response status code should be 404
        And the response should have an error message

    Scenario: An authenticated user with store created but an invalid request
        Given I get an access token "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiN2IxYmM2Y2QtMDkxMi00ZTIyLTgyY2YtM2JmM2JlMjVmOWEyIiwic2Vzc2lvbiI6IjAyYzk1NTdiLTUxYjAtNDA3ZC1hYTZlLTAyYjM0ODU1NmE3OSIsImlhdCI6MTY2NTcxNDUzM30.johi7aaeU1ZVdIYuDULVDXTrXDPjE6bVUBPt80fNSIs"
        Then I send an authenticated POST request to "/store/create" with body:
        """
        {
            "domain": "nuevatienda1",
            "name": "Tienda Para Editar",
            "whatsapp": "51967587667",
            "type": "Shorts",
            "country_id": "7728c85e-ac59-4954-8e70-0311942bca12",
            "currency_id": "0d204bc1-ae8f-4c40-a523-0db4dc3a59bd"
        }
        """
        And I send an authenticated PUT request to "/store/information" with body:
        """
        {
            "name": "asd",
            "whatsapp": "asdasdsad",
            "type": "aeaaaa",
            "currency_id": "bad_currency"
        } 
        """
        And the response status code should be 400
        And the response should have an error message