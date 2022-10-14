Feature: Update store team information
    In order to have the option to update the team information of the store in the platform
    As a authenticated user with a created store
    I want to update my team information

    Scenario: A authenticated user without a created store
        Given I get an access token "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiMmYxZTI4ODUtYWU5Mi00NmRlLWE3NDEtOWFiZjVlYmYwYjg0Iiwic2Vzc2lvbiI6ImY1ZjA3NDNlLTE2MzQtNGZhNC04ZTM5LTE0MDJkNGE4NDg5NiIsImlhdCI6MTY2NTcxODE0MX0.4mT_zITZMrzpyyWsBGpRtOn1wT4NpgOUwD4xXSpkOZE"
        Then I send an authenticated PUT request to "/store/social" with body:
        """
        {
            "facebook": null,
            "instagram": "username",
            "pinterest": "username",
            "twitter": null,
            "linkedin": "username",
            "tiktok": null,
            "youtube": "username"
        }
        """
        And the response status code should be 404
        And the response should have an error message

    Scenario: A authenticated user with a created store
        Given I get an access token "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiMmYxZTI4ODUtYWU5Mi00NmRlLWE3NDEtOWFiZjVlYmYwYjg0Iiwic2Vzc2lvbiI6ImY1ZjA3NDNlLTE2MzQtNGZhNC04ZTM5LTE0MDJkNGE4NDg5NiIsImlhdCI6MTY2NTcxODE0MX0.4mT_zITZMrzpyyWsBGpRtOn1wT4NpgOUwD4xXSpkOZE"
        Then I send an authenticated POST request to "/store/create" with body:
        """
        {
            "domain": "thisisadomain2",
            "name": "New Store",
            "whatsapp": "51967587667",
            "type": "Pantalones y Joggers",
            "country_id": "7728c85e-ac59-4954-8e70-0311942bca12",
            "currency_id": "0d204bc1-ae8f-4c40-a523-0db4dc3a59bd"
        }
        """
        And I send an authenticated PUT request to "/store/social" with body:
        """
        {
            "facebook": null,
            "instagram": "username",
            "pinterest": "username",
            "twitter": null,
            "linkedin": "username",
            "tiktok": null,
            "youtube": "username"
        }
        """
        And the response status code should be 200
        And the response should be empty

    
        