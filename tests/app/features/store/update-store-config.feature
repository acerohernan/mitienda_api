Feature: Update store team information
    In order to have the option to update the team information of the store in the platform
    As a authenticated user with a created store
    I want to update my team information

    Scenario: A authenticated user without a created store
        Given I get an access token "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiY2MyNDQ4YmEtMDBjYS00YzBlLWJjY2QtNzQ1OTlkNWU0ZDEzIiwic2Vzc2lvbiI6ImZjMTkwZmY4LTFjMjQtNDRkZC1hMzA5LTJkMDkwMDg1NTMzMiIsImlhdCI6MTY2NTcxODYxOH0.TUYEGom17f3I6_ouUO8UKnz_QyPkJ_Gdsrfro2vZneA"
        Then I send an authenticated PUT request to "/store/config" with body:
        """
        {
            "request_dni": false,
            "add_delivery_date": false,
            "add_comment": true,
            "comment": "This is a test comment"
        }
        """
        And the response status code should be 404
        And the response should have an error message

    Scenario: A authenticated user with a created store
        Given I get an access token "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiY2MyNDQ4YmEtMDBjYS00YzBlLWJjY2QtNzQ1OTlkNWU0ZDEzIiwic2Vzc2lvbiI6ImZjMTkwZmY4LTFjMjQtNDRkZC1hMzA5LTJkMDkwMDg1NTMzMiIsImlhdCI6MTY2NTcxODYxOH0.TUYEGom17f3I6_ouUO8UKnz_QyPkJ_Gdsrfro2vZneA"
        Then I send an authenticated POST request to "/store/create" with body:
        """
        {
            "domain": "thisisadomain3",
            "name": "New Store",
            "whatsapp": "51967587667",
            "type": "Pantalones y Joggers",
            "country_id": "7728c85e-ac59-4954-8e70-0311942bca12",
            "currency_id": "0d204bc1-ae8f-4c40-a523-0db4dc3a59bd"
        }
        """
        And I send an authenticated PUT request to "/store/config" with body:
        """
        {
            "request_dni": false,
            "add_delivery_date": false,
            "add_comment": true,
            "comment": "This is a test comment"
        }
        """
        And the response status code should be 200
        And the response should be empty
    
        